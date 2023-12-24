import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { fillObject } from "@project/util/util-core";
import { UserRdo } from "../authentication/rdo/user.rdo";
import { RabbitRouting, RequestWithTokenPayload } from "@project/shared/app-types";
import { JwtAuthGuard } from "../authentication/guards/jwt-auth.guard";
import { NotifyUserService } from "../notify-user/notify-user.service";
import { RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { UserBalanceService } from "../user-balance/user-balance.service";
import { UserBalanceRdo } from "./rdo/user-balance.rdo";
import { UpdateUserDto } from "@project/shared/shared-dto";
import { UsersQueryDto } from '@project/shared/shared-query';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly userBalanceService: UserBalanceService,
    private readonly notifyUserService: NotifyUserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('update')
  public async update(@Req() { user: payload }: RequestWithTokenPayload, @Body() dto: UpdateUserDto) {
    const newUser = await this.userService.update(payload.sub, dto);
    return fillObject(UserRdo, newUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Show list users'
  })
  @Get('')
  public async showList(@Query() query: UsersQueryDto) {
    const existPost = await this.userService.getUsers(query);
    return fillObject(UserRdo, existPost);
  }


  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new friends has been successfully created.'
  })
  @Post('friend/:id')
  public async addFriends(@Req() { user: payload }: RequestWithTokenPayload, @Param('id') id: string) {
    const newUser = await this.userService.addFriend(payload.sub, id);

    const notifyUser = {
      authorId: payload.sub,
      userId: id,
      createdAt: new Date,
      authorName: payload.userName
    }

    await this.notifyUserService.createNotification(notifyUser)
    return fillObject(UserRdo, newUser);

  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new friends has been successfully created.'
  })
  @Get('friends')
  public async showFriends(@Req() { user: payload }: RequestWithTokenPayload) {
    const list = await this.userService.showFriend(payload.sub);
    return fillObject(UserRdo, list);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new friends has been successfully created.'
  })
  @Post('subscribe/:trainerId')
  public async subscribeTrainer(@Req() { user: payload }: RequestWithTokenPayload, @Param('trainerId') trainerId: string) {
    const existTrainer = await this.userService.findById(trainerId);

    const subscribe = {
      userEmail: payload.email,
      trainerId: trainerId,
      trainerName: existTrainer.userName
    }

    await this.notifyUserService.registerSubscriber(subscribe)
    return subscribe
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The new friends has been successfully created.'
  })
  @Delete('subscribe/:trainerId')
  public async unsubscribeTrainer(@Req() { user: payload }: RequestWithTokenPayload, @Param('trainerId') trainerId: string) {

    await this.notifyUserService.deleteSubscriber(payload.email, trainerId)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The new friends has been successfully created.'
  })
  @Get('balance')
  public async showBalance(@Req() { user: payload }: RequestWithTokenPayload) {
    const balance = await this.userBalanceService.showBalanceById(payload.sub);

    return fillObject(UserBalanceRdo, balance);
  }

  @RabbitRPC({
    exchange: 'fitfriends.uploader',
    routingKey: RabbitRouting.TrainersCertificate,
    queue: 'fitfriends.uploader.certificate',
  })
  public async trainerCertificate({trainerId, fileId}) {
    console.log(trainerId)
    await this.userService.changeTrainerCetrificate(trainerId, fileId)

  }
}

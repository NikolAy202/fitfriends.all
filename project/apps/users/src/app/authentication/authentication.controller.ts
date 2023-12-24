import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoidValidationPipe } from '@project/shared/shared-pipes'
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { RabbitRouting, RequestWithTokenPayload, RequestWithUser } from '@project/shared/app-types';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { CreateUserDto } from '@project/shared/shared-dto'


@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @Post('check/email')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Check email'
  })
  public async checkEmail(@Body() body) {
    return this.authService.checkEmail(body.email);
  }

  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() { user }: RequestWithUser) {
    console.log(user)
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    console.log(existUser)
    return fillObject(UserRdo, existUser);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @RabbitRPC({
    exchange: 'fitfriends.uploader',
    routingKey: RabbitRouting.UserAvatars,
    queue: 'fitfriends.uploader.avatar',
  })
  public async userAvatars({userId, fileId}) {
    const userUpd = await this.authService.changeAvatar(userId, fileId)
    return fillObject(UserRdo, userUpd);
  }

  @RabbitRPC({
    exchange: 'fitfriends.uploader',
    routingKey: RabbitRouting.UserBackgroundImg,
    queue: 'fitfriends.uploader.BackgroundImg'
  })
  public async userBackgroundImg({userId, fileId}) {
    const userUpd = await this.authService.changeBackgroundImg(userId, fileId)
    return fillObject(UserRdo, userUpd);
  }
}

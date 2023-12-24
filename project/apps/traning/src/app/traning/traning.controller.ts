import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { TraningService } from './traning.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { TraningRdo } from './rdo/traning.rdo';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { TraningQueryDto } from './query/traning.query.dto';
import { NotifyUserService } from '../notify-user/notify-user.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared/app-types';
import { CreateTraningDto, UpdateTraningDto } from '@project/shared/shared-dto';

@ApiTags('traning')
@Controller('traning')
export class TraningController {
  constructor(
    private readonly traningService: TraningService,
    private readonly notifyUserService: NotifyUserService

  ) {}


  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new traning has been successfully created.'
  })
  @Post('create')
  public async create(@Body() dto: CreateTraningDto) {
    const newTraning = await this.traningService.create(dto);
    await this.notifyUserService.newTraining(newTraning);
    return fillObject(TraningRdo, newTraning);
  }

  @Post('update/:id')
  @ApiResponse({
    type: TraningRdo,
    status: HttpStatus.OK,
    description: 'User edit'
  })
  public async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateTraningDto) {
    const existTrainig = await this.traningService.update(id, dto);
      return fillObject(TraningRdo, existTrainig);

  }

  @Get(':id')
  @ApiResponse({
    type: TraningRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existTrainig = await this.traningService.show(id);
    return fillObject(TraningRdo, existTrainig);
  }

  @Get('show/list')
  @ApiResponse({
    type: TraningRdo,
    status: HttpStatus.OK,
    description: 'Show catalog training'
  })
  public async showCatalog(@Query() query: TraningQueryDto) {
    const existTrainig = await this.traningService.showCatalog(query);
    return fillObject(TraningRdo, existTrainig);
  }

  @Get('trainer/list/:trainerId')
  @ApiResponse({
    type: TraningRdo,
    status: HttpStatus.OK,
    description: 'Show list training'
  })
  public async showTrainerIdList(@Param('trainerId', MongoidValidationPipe) trainerId: string, @Query() query: TraningQueryDto) {
    const existTrainig = await this.traningService.showList(trainerId, query);
    return fillObject(TraningRdo, existTrainig);
  }

  @RabbitRPC({
    exchange: 'fitfriends.uploader',
    routingKey: RabbitRouting.TrainingImg,
    queue: 'fitfriends.training.image',
  })
  public async trainingImg({trainingId, fileId}) {
    const postUpd = await this.traningService.changeImg(trainingId, fileId)
    return fillObject(TraningRdo, postUpd);
  }

  @RabbitRPC({
    exchange: 'fitfriends.uploader',
    routingKey: RabbitRouting.TrainingVideo,
    queue: 'fitfriends.training.video'
  })
  public async trainingVideo({trainingId, fileId}) {
    const postUpd = await this.traningService.changeVideo(trainingId, fileId)
    return fillObject(TraningRdo, postUpd);
  }
}

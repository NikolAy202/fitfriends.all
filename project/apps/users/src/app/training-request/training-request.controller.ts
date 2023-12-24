import {  Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post  } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { TrainingRequestService } from './training-request.service';
import { TrainingRequestRdo } from './rdo/training-request.rdo';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { NotifyUserService } from '../notify-user/notify-user.service';
import { UserService } from '../user/user.service';
import { CreateRequestDto } from '@project/shared/shared-dto';


@ApiTags('training-request')
@Controller('request')
export class TrainingRequestController {
  constructor(
    private readonly requestService: TrainingRequestService,
    private readonly notifyUserService: NotifyUserService,
    private readonly userService: UserService

  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create request'
  })
  @Post('create')
  public async create(@Body() dto: CreateRequestDto) {
    const newTrainingRequests = await this.requestService.create(dto);
    const author = await this.userService.findById(dto.authorId)
    const requsetForNotify = {
      authorId: newTrainingRequests.authorId,
      userId: newTrainingRequests.userId,
      status: newTrainingRequests.status,
      type: newTrainingRequests.type,
      createdAt: newTrainingRequests.createdAt,
      authorName: author.userName
    }

    await this.notifyUserService.createNotification(requsetForNotify)
    return fillObject(TrainingRequestRdo, newTrainingRequests);
  }

  @ApiResponse({
    type: TrainingRequestRdo,
    status: HttpStatus.OK,
    description: 'Update status'
  })
  @Patch('update/:id')
  public async updateStatus(@Param('id', MongoidValidationPipe) id: string, @Body() body) {
    console.log(body)
    const updRequest = await this.requestService.updateStatus(id, body.status);
    const requsetForNotify =  {
      _id: updRequest._id,
      authorId: updRequest.userId,
      userId: updRequest.authorId,
      status: updRequest.status,
      type: updRequest.type,
      createdAt: updRequest.createdAt
    };

    const author = await this.userService.findById(updRequest.userId)
    await this.notifyUserService.createNotification({...requsetForNotify, authorName: author.userName})
    return fillObject(TrainingRequestRdo, updRequest);
  }

  @ApiResponse({
    type: TrainingRequestRdo,
    status: HttpStatus.OK,
    description: 'Update status'
  })
  @Get('show')
  public async getRequest(@Body() body) {
    const showRequest = await this.requestService.getRequest(body.initiatorId, body.coachId);
    return fillObject(TrainingRequestRdo, showRequest);
  }

  @ApiResponse({
    type: TrainingRequestRdo,
    status: HttpStatus.OK,
    description: 'Update status'
  })
  @Get('show/:id')
  public async getRequestById(@Param('id', MongoidValidationPipe) id: string){
    const showRequest = await this.requestService.getRequestById(id);
    return fillObject(TrainingRequestRdo, showRequest);
  }


  @ApiResponse({
    type: TrainingRequestRdo,
    status: HttpStatus.OK,
    description: 'Delete request'
  })
  @Delete('delete/:id')
  public async delete(@Param('id', MongoidValidationPipe) id: string) {
   return await this.requestService.delete(id);
  }
}

import { Controller, Delete, Get, Param } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting, TrainingRequestWithName } from '@project/shared/app-types';
import { UserNotificationService } from './user-notification.service';
import { fillObject } from '@project/util/util-core';
import { NotificationRdo } from './rdo/notificarion.rdo';

@Controller('notify')
export class UserNotificationController {
  constructor(
    private readonly userNotificationService: UserNotificationService,
  ) {}

  @RabbitSubscribe({
    exchange: 'fitfriends.notify',
    routingKey: RabbitRouting.CreateRequest,
    queue: 'fitfriends.training',
  })
  public async create(request: TrainingRequestWithName) {
    this.userNotificationService.createNotifycation(request);
  }

  @Get('/:id')
  public async show(@Param('id') id: string) {

    const orders = await this.userNotificationService.show(id);

    return fillObject(NotificationRdo, orders);
  }

  @Get('list/:userId')
  public async showNotifications(@Param('userId') userId: string) {
    console.log(userId)

    const notify = await this.userNotificationService.showList(userId);

    return fillObject(NotificationRdo, notify);
  }

  @Delete('/:id')
  public async deleteNotification(@Param('id') id: string) {
    console.log(id)
    await this.userNotificationService.deleteOne(id);
  }

}

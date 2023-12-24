import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';
import { UserNotificationModel, UserNotificationSchema } from './user-notification.model';
import { UserNotificationController } from './user-notification.controller';
import { UserNotificationService } from './user-notification.service';
import { UserNotificationRepository } from './user-notification.repository';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserNotificationModel.name, schema: UserNotificationSchema },
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
  ],
  controllers: [UserNotificationController],
  providers: [
    UserNotificationService,
    UserNotificationRepository,
    UserNotificationController,
  ],
})
export class UserNotificationModule {}

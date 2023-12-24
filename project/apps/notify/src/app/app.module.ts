import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigNotifyModule } from '@project/config/config-notify';
import { getMongooseOptions } from '@project/util/util-core';
import { TrainerSubscribersModule } from './trainer-subscribers/trainer-subscribers.module';
import { UserNotificationModule } from './user-notification/user-notification.module';

@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
    TrainerSubscribersModule,
    UserNotificationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

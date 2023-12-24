import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TrainerSubscribersModel,
  TrainerSubscribersSchema,
} from './trainer-subscribers.model';
import { TrainerSubscribersRepository } from './trainer-subscribers.repository';
import { TrainerSubscribersService } from './trainer-subscribers.service';
import { TrainerSubscribersController } from './trainer-subscribers.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';
import { MailModule } from '../mail/mail.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrainerSubscribersModel.name, schema: TrainerSubscribersSchema },
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule,
  ],
  controllers: [TrainerSubscribersController],
  providers: [
    TrainerSubscribersController,
    TrainerSubscribersService,
    TrainerSubscribersRepository,
  ],
})
export class TrainerSubscribersModule {}

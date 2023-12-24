import { Module } from '@nestjs/common';
import { BalanceService } from './user-balance.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';


@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    )
  ],
  providers: [ BalanceService ],
  exports: [ BalanceService],
})
export class UserBalanceModule {}

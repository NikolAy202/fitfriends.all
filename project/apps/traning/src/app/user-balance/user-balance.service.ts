import { Inject, Injectable } from "@nestjs/common";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { trainingConfig } from "@project/config/config-traning";
import { ConfigType } from "@nestjs/config";
import { Order, RabbitRouting } from "@project/shared/app-types";

@Injectable()
export class BalanceService {

  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(trainingConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof trainingConfig>,
  ) {}

  public async createBalance(order: Order) {
    return this.rabbitClient.publish<Order>(
      'fitfriends.users',
      RabbitRouting.CreateBalance,
      order
    )
  }
}

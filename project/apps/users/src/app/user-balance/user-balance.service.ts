import { Injectable } from "@nestjs/common";
import { UserBalanceRepository } from "./user-balanse.repository";
import { Order, RabbitRouting } from "@project/shared/app-types";
import { UserBalanceEntity } from "./user-balanse.entity";
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";

@Injectable()
export class UserBalanceService {
  constructor(
    private readonly userBalanceRepository: UserBalanceRepository,
  ) {}


  @RabbitSubscribe({
    exchange: 'fitfriends.users',
    routingKey: RabbitRouting.CreateBalance,
    queue: 'fitfriends.balance',
  })
  public async create(order: Order) {

    const userBalanceEntity = new UserBalanceEntity(order);
    await this.userBalanceRepository.create(userBalanceEntity);
  }

  public async showBalanceById(userId: string) {
    const balance =  await this.userBalanceRepository.findByUserId(userId);
    console.log(balance)
    return balance
  }
}

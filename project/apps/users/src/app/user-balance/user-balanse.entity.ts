import { Order, UserBalance } from "@project/shared/app-types";

export class UserBalanceEntity implements UserBalance {
  public _id?: string;
  public userId: string;
  public trainingId: string;
  public trainingCount: number;

  constructor(orderEntity: Order) {
    this.fillEntity(orderEntity);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(userEntity: Order) {
    this._id = userEntity._id;
    this.userId = userEntity.userId;
    this.trainingId = userEntity.trainingId;
    this.trainingCount = userEntity.trainingCount;
  }
}

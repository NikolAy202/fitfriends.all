import { Order, PaymentType } from "@project/shared/app-types";

export class OrderEntity implements Order {
  public _id?: string;
  public userId: string;
  public trainerId: string;
  public orderType: string;
  public trainingId: string;
  public trainingCount: number;
  public totalPrice: number;
  public price: number;
  public paymentType: PaymentType;


  constructor(orderEntity: Order) {
    this.fillEntity(orderEntity);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(userEntity: Order) {
    this._id = userEntity._id;
    this.userId = userEntity.userId;
    this.trainerId = userEntity.trainerId;
    this.orderType = userEntity.orderType;
    this.trainingId = userEntity.trainingId;
    this.trainingCount = userEntity.trainingCount;
    this.totalPrice = userEntity.totalPrice;
    this.price = userEntity.price;
    this.paymentType = userEntity.paymentType;

  }
}


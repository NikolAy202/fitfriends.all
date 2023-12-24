import { OrderModel } from "./order.model";
import { OrderEntity } from "./order.enyity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "@project/shared/app-types";
import { Model } from "mongoose";


@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(OrderModel.name) private readonly orderModel: Model<OrderModel>)
     {
  }

  public async create(item: OrderEntity): Promise<Order> {

    const newOrder = new this.orderModel(item);
    return newOrder.save();
  }

  public async destroy(id: string): Promise<void> {
    this.orderModel.deleteOne({id});
  }

  public async findByTrainerId(trainerId: string): Promise<Order[] | null> {
    return this.orderModel
      .find({trainerId: trainerId})
      .exec();
  }

  public async findByUserId(userId: string): Promise<Order[] | null> {
    return this.orderModel
      .find({userId: userId})
      .exec();
  }


}

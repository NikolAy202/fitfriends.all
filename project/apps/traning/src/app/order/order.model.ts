import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Order, PaymentType } from "@project/shared/app-types";
import { Document} from 'mongoose';

@Schema({
  collection: 'order',
  timestamps: true,
})
export class OrderModel extends Document implements Order {

  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public trainerId: string;

  @Prop({
    required: true,
    default: 'Абонемент',
  })
  public orderType: string;

  @Prop({
    required: true})
  public trainingId: string;

  @Prop({
    required: true})
  public trainingCount: number;

  @Prop({
    required: true
  })
  public totalPrice: number;

  @Prop({
    required: true
  })
  public price: number;

  @Prop({
    required: true,
    type: String,
    enum: PaymentType
  })
  public paymentType: PaymentType;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);

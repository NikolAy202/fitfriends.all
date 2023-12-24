import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserBalance } from "@project/shared/app-types";
import { Document} from 'mongoose';

@Schema({
  collection: 'user-balance',
  timestamps: true,
})
export class UserBalanceModel extends Document implements UserBalance {

  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true})
  public trainingId: string;

  @Prop({
    required: true})
  public trainingCount: number;

}

export const UserBalanceSchema = SchemaFactory.createForClass(UserBalanceModel);

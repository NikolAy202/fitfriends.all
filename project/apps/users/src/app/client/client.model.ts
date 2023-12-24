import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TimeTraining, User } from "@project/shared/app-types";
import { Document } from 'mongoose';

@Schema({
  collection: 'clients',
  timestamps: true,
})
export class ClientModel extends Document implements User {

@Prop({
  required: true,
})
public userId: string;

@Prop({
  required: true,
  type: String,
  enum: TimeTraining,
  default: TimeTraining.Time30
})
public timeTraining: TimeTraining;

@Prop({
  required: true,
})
public caloriesBurnedTraining: number;

@Prop({
  required: true,
})
public trainingReadiness: boolean;

@Prop({
  required: true,
})
public caloriesBurnedDay: number;

}

export const ClientSchema = SchemaFactory.createForClass(ClientModel);

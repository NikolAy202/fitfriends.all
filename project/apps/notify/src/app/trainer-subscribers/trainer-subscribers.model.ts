import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscription } from '@project/shared/app-types';

const SUBSCRIBERS_COLLECTION_NAME = 'trainier-subscribers';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class TrainerSubscribersModel extends Document implements  Subscription {
  @Prop()
  public userEmail: string;

  @Prop()
  public trainerId: string;

  @Prop()
  public trainerName: string;

}

export const TrainerSubscribersSchema = SchemaFactory.createForClass(TrainerSubscribersModel);

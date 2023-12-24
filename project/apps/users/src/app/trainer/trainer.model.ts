import { Document} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Trainer } from '@project/shared/app-types';

@Schema({
  collection: 'trainers',
  timestamps: true,
})
export class TrainerModel extends Document implements Trainer {

  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public merits: string;

  @Prop({
    required: true,
  })
  public personalTraining: boolean;

  @Prop({
    required: true,
  })
  public certificates: string[];
}

export const TrainerSchema = SchemaFactory.createForClass(TrainerModel);

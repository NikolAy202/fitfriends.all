import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Traning, TrainingLevel, TimeTraining, UserGender, TypeTraining } from '@project/shared/app-types';

@Schema({
  collection: 'traning',
  timestamps: true,
})
export class TraningModel extends Document implements Traning {
  @Prop({
    required: true,
  })
  public title: string;

  @Prop()
  public image?: string;

  @Prop({
    required: true,
    type: String,
    enum: TrainingLevel
  })
  public trainingLevel: TrainingLevel;

  @Prop({
    required: true,
    type: String,
    enum: TypeTraining
  })
  public typeTraining: TypeTraining;

  @Prop({
    required: true,
    type: String,
    enum: TimeTraining
  })
  public timeTraining: TimeTraining;

  @Prop({
    required: true,
  })
  public price: number;

  @Prop({
    required: true,
  })
  public caloriesBurnedTraining: number;

  @Prop({
    required: true,
  })
  public description: string;

  @Prop({
    required: true,
    type: String
  })
  public gender: UserGender;

  @Prop()
  public video?: string;

  @Prop({
    required: true,
    default: 0
  })
  public rating: number;

  @Prop({
    required: true,
  })
  public trainer: string;

  @Prop({
    required: true,
  })
  public specialOffer: boolean;


}

export const TraningSchema = SchemaFactory.createForClass(TraningModel);

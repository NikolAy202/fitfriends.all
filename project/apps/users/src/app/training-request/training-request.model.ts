import { Document} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RequestStatus, TrainingRequest, RequestType } from '@project/shared/app-types';

@Schema({
  collection: 'training-request',
  timestamps: true,
})
export class TrainingRequestModel extends Document implements TrainingRequest {

  @Prop({
    required: true,
  })
  public authorId: string;

  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
    type: String,
    enum: RequestStatus
  })
  public status: RequestStatus;

  @Prop({
    required: true,
    type: String,
    enum: RequestType
  })
  public type: RequestType;

  @Prop({
  })
  public createdAt: Date;

  @Prop({
  })
  public updatedAt: Date;


}

export const TrainingRequestSchema = SchemaFactory.createForClass(TrainingRequestModel);

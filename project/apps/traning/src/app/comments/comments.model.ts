import { Document, now} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment } from '@project/shared/app-types';

@Schema({
  collection: 'comments',
  timestamps: true,
})
export class CommentModel extends Document implements Comment  {

  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public traningId: string;

  @Prop({
    required: true,
  })
  public ratingTraining: number;

  @Prop({
    required: true})
  public text: string;

  @Prop({default: now})
  public createdAt: Date;

}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);

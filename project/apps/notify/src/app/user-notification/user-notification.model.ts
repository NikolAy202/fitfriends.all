import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Notification } from '@project/shared/app-types';


@Schema({
  collection: 'notification',
  timestamps: true,
})
export class UserNotificationModel extends Document implements  Notification {
  @Prop()
  public userId: string;

  @Prop()
  public authorId: string;

  @Prop()
  public text: string;

  @Prop()
  public createdAt: Date;

}

export const UserNotificationSchema = SchemaFactory.createForClass(UserNotificationModel);

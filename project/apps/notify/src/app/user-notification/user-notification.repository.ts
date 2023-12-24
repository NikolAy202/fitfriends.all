import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserNotificationModel } from './user-notification.model';
import { UserNotificationEntity } from './user-notification.entity';
import { Notification } from '@project/shared/app-types';

@Injectable()
export class UserNotificationRepository implements CRUDRepository<UserNotificationEntity, string, Notification> {
  constructor(
    @InjectModel(UserNotificationModel.name) private readonly userNotificationModel: Model<UserNotificationModel>
  ) {}

  public async create(item: UserNotificationEntity): Promise<Notification> {
    const newEmailSubscriber = new this.userNotificationModel(item);
    return newEmailSubscriber.save();
  }

  public async destroy(id: string): Promise<void> {
    await this.userNotificationModel
      .deleteOne({ _id: id.toString() });
  }

  public async findById(id: string): Promise<Notification | null> {
    return this.userNotificationModel
      .findOne({ _id: id })
      .exec();
  }

  public async findByUserId(userId: string): Promise<Notification[] | null> {
    return await this.userNotificationModel
      .find({ userId: userId}, {}, {limit: 5})
      .exec();
  }

  public async update(id: string, item: UserNotificationEntity): Promise<Notification> {
    return this.userNotificationModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }
}

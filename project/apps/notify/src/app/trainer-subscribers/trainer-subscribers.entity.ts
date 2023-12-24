import { Entity } from '@project/util/util-types';
import { Subscription } from '@project/shared/app-types';

export class TrainerSubscribersEntity implements Entity<TrainerSubscribersEntity>, Subscription {
  public _id: string;
  public userEmail: string;
  public trainerId: string;
  public trainerName: string;

  constructor(emailSubscriber: Subscription) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity: Subscription) {
    this.userEmail = entity.userEmail;
    this.trainerId = entity.trainerId;
    this.trainerName = entity.trainerName;
    this._id = entity._id
  }

  public toObject(): TrainerSubscribersEntity {
    return { ...this };
  }
}

import { Injectable } from '@nestjs/common';
import { UserNotificationRepository } from './user-notification.repository';
import { UserNotificationEntity } from './user-notification.entity';
import { TrainingRequestWithName } from '@project/shared/app-types';

@Injectable()
export class UserNotificationService {
  constructor(
    private readonly userNotificationRepository: UserNotificationRepository
  ) {}

  public async createNotifycation(request: TrainingRequestWithName) {

    return this.userNotificationRepository
      .create(new UserNotificationEntity(request));
  }


  public async show(id: string) {

    return this.userNotificationRepository.findById(id)
  }

  public async showList(userId: string) {

    return await this.userNotificationRepository.findByUserId(userId)
  }

  public async deleteOne(id: string) {

    return await this.userNotificationRepository.destroy(id)
  }

}

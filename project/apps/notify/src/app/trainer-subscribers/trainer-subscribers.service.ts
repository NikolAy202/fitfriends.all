import { TrainerSubscribersEntity } from './trainer-subscribers.entity';
import { TrainerSubscribersRepository } from './trainer-subscribers.repository';
import { Injectable } from '@nestjs/common';
import { Subscription } from '@project/shared/app-types';


@Injectable()
export class TrainerSubscribersService {
  constructor(
    private readonly trainerSubscribersRepository: TrainerSubscribersRepository,
  ) {}

  public async createSubscription(subscriber: Subscription) {


    const existsSubscriber = await this.trainerSubscribersRepository.findByEmailAndId(subscriber.trainerId, subscriber.userEmail);

    if (existsSubscriber) {
      return existsSubscriber;
    }

    return this.trainerSubscribersRepository
      .create(new TrainerSubscribersEntity(subscriber));
  }

  public async findSubscribe(trainerId: string) {
    return await this.trainerSubscribersRepository.findByTrainerId(trainerId)
  }

  public async delete(userEmail:string, trainerId: string) {
    await this.trainerSubscribersRepository.findByEmailAndIdAndDelete(trainerId, userEmail)
  }


}

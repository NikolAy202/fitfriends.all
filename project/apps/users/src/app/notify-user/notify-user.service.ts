import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-users';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting, TrainingRequestWithName } from '@project/shared/app-types';
import { CreateSubscriberDto } from '@project/shared/shared-dto';

@Injectable()
export class NotifyUserService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async createNotification(trainingRequest: TrainingRequestWithName) {
    console.log(trainingRequest)
    return this.rabbitClient.publish<TrainingRequestWithName>(
      'fitfriends.notify',
      RabbitRouting.CreateRequest,
      { ...trainingRequest }
    )
  }


  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      'fitfriends.notify',
      RabbitRouting.AddSubscriber,
      { ...dto }
    );
  }

  public async deleteSubscriber(userEmail: string, trainerId: string) {
    return this.rabbitClient.publish(
      'fitfriends.notify',
      RabbitRouting.DeleteSubscriber,
      {userEmail, trainerId}
    );
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { trainingConfig } from '@project/config/config-traning';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting, Traning, TrainingRequest } from '@project/shared/app-types';

@Injectable()
export class NotifyUserService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(trainingConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof trainingConfig>,
  ) {}

  public async trainingRequest(trainingRequest: TrainingRequest) {
    return this.rabbitClient.publish<TrainingRequest>(
      'fitfriends.notify',
      RabbitRouting.CreateRequest,
      { ...trainingRequest }
    )
  }

  public async newTraining(training: Traning) {
    return this.rabbitClient.publish<Traning>(
      'fitfriends.notify',
      RabbitRouting.NewTraining,
      training
    )
  }

}

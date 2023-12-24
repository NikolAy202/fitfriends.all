import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { uploaderConfig } from '@project/config/config-uploader';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@project/shared/app-types';

@Injectable()
export class UploadUsersService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(uploaderConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof uploaderConfig>,
  ) {}

  public async userAvatars(userId:string, fileId: string) {
    return this.rabbitClient.request<string>(
      {exchange: 'fitfriends.uploader',
      routingKey: RabbitRouting.UserAvatars,
      payload: {userId, fileId}}
    );
  }

  public async trainerCertificate(trainerId:string, fileId: string) {
    return this.rabbitClient.request<string>(
      {exchange: 'fitfriends.uploader',
      routingKey: RabbitRouting.TrainersCertificate,
      payload: {trainerId, fileId}}
    );
  }


  public async userBackgroundImg(userId:string, fileId: string) {
    return this.rabbitClient.request<string>(
      {exchange: 'fitfriends.uploader',
      routingKey: RabbitRouting.UserBackgroundImg,
      payload: {userId, fileId}}
    );
  }
}

import { TrainerSubscribersService } from './trainer-subscribers.service';
import { Controller} from '@nestjs/common';
import { RabbitRouting, Traning } from '@project/shared/app-types';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CreateTrainerSubscribersDto } from './dto/trainer-subscribers.dto';
import { MailService } from '../mail/mail.service';


@Controller()
export class TrainerSubscribersController {
  constructor(
    private readonly trainerSubscribersService: TrainerSubscribersService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'fitfriends.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'fitfriends.notify',
  })
  public async create(subscriber: CreateTrainerSubscribersDto) {
    this.trainerSubscribersService.createSubscription(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'fitfriends.notify',
    routingKey: RabbitRouting.DeleteSubscriber,
    queue: 'fitfriends.notify.delete',
  })
  public async delete(subscreibe) {
    this.trainerSubscribersService.delete(subscreibe.userEmail, subscreibe.trainerId);
  }

  @RabbitSubscribe({
    exchange: 'fitfriends.notify',
    routingKey: RabbitRouting.NewTraining,
    queue: 'fitfriends.newTraining',
  })
  public async mailing(training: Traning) {
    const trainerId = training.trainer;
    const subscriber = await this.trainerSubscribersService.findSubscribe(trainerId);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }
}

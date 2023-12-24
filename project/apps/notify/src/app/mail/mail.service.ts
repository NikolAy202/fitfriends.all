import { Subscription } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { NEW_TRAINING } from './mail.constant';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscribers: Subscription[]) {
    const usersEmails = subscribers.map((el) =>{ return el.userEmail})
    if (subscribers[0]) {
      return await this.mailerService.sendMail({
        to: usersEmails,
        subject: NEW_TRAINING,
        template: './new-training',
        context: {
          trainer: `${subscribers[0].trainerName}`,
        }
      })
    }
    return null
  }

}

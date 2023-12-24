import { Notification, RequestType, TrainingRequestWithName } from '@project/shared/app-types';

export class UserNotificationEntity implements  Notification {
  public _id: string;
  public userId: string;
  public text: string;
  public authorId: string;

  constructor(item: TrainingRequestWithName) {
    this.fillEntity(item);
  }

  public fillEntity(entity: TrainingRequestWithName) {
    this.userId = entity.userId;
    this.text = this.getText(entity.authorName, entity.type);
    this.authorId = entity.authorId;

  }

  public getText(authorName, type): string {
    if (!type) {
      return `Пользователь ${authorName} добавил Вас в друзья`
    }
  return type ===  RequestType.Together?
  `Пользователь ${authorName} пригласи Вас на совместную тренировку` :
  `Пользователь ${authorName} запросил персональную тренировку`
  }

  public toObject(): UserNotificationEntity {
    return { ...this };
  }
}

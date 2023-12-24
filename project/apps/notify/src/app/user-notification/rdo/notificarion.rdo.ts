import { Expose } from "class-transformer";

export class NotificationRdo {

  @Expose()
  public userId: string;

  @Expose()
  public authorId: string;

  @Expose()
  public text: string;

  @Expose()
  public createdAt: Date;

}

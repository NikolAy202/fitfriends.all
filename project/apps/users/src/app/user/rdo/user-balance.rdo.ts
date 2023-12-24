import { Expose } from 'class-transformer';

export class UserBalanceRdo {

  @Expose()
  public trainingId: string;


  @Expose()
  public trainingCount: string;

  @Expose()
  public userId: string;
}

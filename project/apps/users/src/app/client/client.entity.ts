import { TimeTraining, User } from '@project/shared/app-types'

export class ClientEntity implements User {
    public _id: string;
    public userId: string;
    public timeTraining: TimeTraining;
    public caloriesBurnedTraining: number;
    public caloriesBurnedDay: number;
    public trainingReadiness: boolean

    constructor(userEntity: User) {
      this.fillEntity(userEntity);
    }

    public toObject() {
      return {...this};
    }

    public fillEntity(userEntity: User) {
      this._id = userEntity._id;
      this.userId = userEntity.userId;
      this.timeTraining = userEntity.timeTraining;
      this.caloriesBurnedTraining = userEntity.caloriesBurnedTraining;
      this.caloriesBurnedDay = userEntity.caloriesBurnedDay;
      this.trainingReadiness = userEntity.trainingReadiness;
    }
}

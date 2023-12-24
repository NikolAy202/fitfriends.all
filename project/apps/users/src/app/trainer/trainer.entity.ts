import { Trainer } from "@project/shared/app-types";

export class TrainerEntity implements Trainer {
public certificates: string[];
public merits: string;
public personalTraining: boolean
public _id: string;
public userId: string;

constructor(userEntity: Trainer) {
  this.fillEntity(userEntity);
}

public toObject() {
  return {...this};
}

public fillEntity(userEntity: Trainer) {
  this._id = userEntity._id;
  this.userId = userEntity.userId;
  this.certificates =userEntity.certificates;
  this.merits = userEntity.merits;
  this.personalTraining = userEntity.personalTraining;
}
}

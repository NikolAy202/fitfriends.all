import { TimeTraining, TrainingLevel, Traning, TypeTraining, UserGender } from '@project/shared/app-types'

export class TraningEntity implements Traning {
  public _id: string;
  public title: string;
  public trainingLevel: TrainingLevel;
  public typeTraining: TypeTraining;
  public timeTraining: TimeTraining;
  public price: number;
  public caloriesBurnedTraining: number;
  public description: string;
  public gender: UserGender;
  public rating: number;
  public trainer: string;
  public specialOffer: boolean


  constructor(traning: Traning) {
    this.fillEntity(traning);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(training: Traning) {
    this.title = training.title;
    this.trainingLevel = training.trainingLevel;
    this.typeTraining = training.typeTraining;
    this.timeTraining = training.timeTraining;
    this.price = training.price;
    this.caloriesBurnedTraining = training.caloriesBurnedTraining;
    this.description = training.description;
    this.gender = training.gender;
    this.rating = training.rating;
    this.trainer = training.trainer;
    this.specialOffer = training.specialOffer;

  }
}

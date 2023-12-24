import { TimeTraining } from "./time-training.enum";
import { TrainingLevel } from "./training-level.enum";
import { TypeTraining } from "./type-training.enum";
import { UserGender } from "./user-gender.enum";

export interface Traning {
  title: string;
  image?: string;
  trainingLevel: TrainingLevel,
  typeTraining: TypeTraining,
  timeTraining: TimeTraining,
  price: number;
  caloriesBurnedTraining: number,
  description: string;
  gender: UserGender;
  video?: string;
  rating: number;
  trainer: string;
  specialOffer: boolean
}

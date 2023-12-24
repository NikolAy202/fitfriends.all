import { TimeTraining } from './time-training.enum.js';
import { TrainingLevel } from './training-level.enum';
import { TypeTraining } from './type-training.enum';
import { UserGender } from './user-gender.enum';
import {UserRole} from './user-role.enum';
import { Location } from './location.enum'

export interface BaseUser {
  _id?: string;
  email: string;
  userName: string;
  gender: UserGender;
  dateBirth: Date;
  avatar?: string;
  passwordHash: string;
  role: UserRole;
  description?: string;
  location: Location;
  image?: string;
  friends?: string[]
  trainingLevel: TrainingLevel,
  typeTraining: TypeTraining[],
}

export interface User  {
  _id?: string;
  userId: string;
  timeTraining: TimeTraining,
  caloriesBurnedTraining: number,
  caloriesBurnedDay: number,
  trainingReadiness: boolean
}

export interface Trainer  {
  _id?: string;
  userId: string;
  certificates?: string[],
  merits: string,
  personalTraining: boolean
}


export type SharedUser = User | Trainer

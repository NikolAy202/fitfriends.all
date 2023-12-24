import { TrainingLevel, TimeTraining, TypeTraining } from './questionnaire';
import { UserGender, UserRole } from './user';
import {Location} from './location.enum';

export type Training = {
  id: string;
  title?: string;
  image?: string;
  trainingLevel?: TrainingLevel;
  typeTraining?: TypeTraining;
  timeTraining?: TimeTraining;
  price?: number;
  caloriesBurnedTraining?: number;
  description?: string;
  gender?: UserGender;
  video?: string;
  videoTraningPath?: string;
  fileVideoTraning?: File;
  fileImageTraning?: File;
  rating?: number;
  trainer?: string;
  trainerName?: string;
  trainerAvataPath?: string;
  specialOffer?: boolean;
  createdAt?: Date;
}

export type NewTraining = {
  title: string;
  image?: string;
  trainingLevel: TrainingLevel;
  typeTraining: TypeTraining;
  timeTraining: TimeTraining;
  price: number;
  caloriesBurnedTraining: number;
  description: string;
  gender: UserGender;
  video?: string;
  videoTraningPath?: string;
  rating?: number;
  specialOffer?: boolean;
}

export type Query = {
  limit?: number;
  price?: number[];
  caloriesReset?: number[];
  rating?: number[];
  timeTraining?: TimeTraining[];
  typeTraining?: TypeTraining[];
  page?: number;
  sortDate?: string;
  sortCount?: string;
  sortPrice?: string;
  userRole?: UserRole;
  location?: Location[];
  trainingLevel?: TrainingLevel;
  isDone?: string;
}

export enum TypeRequest
 {
  Personal = 'персональная тренировка',
  Together = 'совместная тренировка'
}

export type TrainingRequest = {
  userId: string;
  status: StatusRequest;
  type: TypeRequest;
}

export enum StatusRequest
 {
  Pending = 'на рассмотрении',
  Rejected = 'отклонён',
  Accepted = 'принят',
}

export type Comment = {
  id: string;
  userId: string;
  userName: string;
  avatarPath: string;
  trainingId: string;
  ratingTraining: number;
  text: string;
}

export type NewComment = {
  userId: string;
  trainingId: string;
  ratingTraining: number;
  text: string;
}

export type TotalTrainInfo = {
  totalTrainings: number;
  maxPrice: number;
}

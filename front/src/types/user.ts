import { TrainingLevel, TimeTraining, TypeTraining } from './questionnaire';
import { Location } from './location.enum';
import { StatusRequest } from './training';

export type User = {
  id: string;
  sub?: string;
  email: string;
  userName: string;
  role: UserRole;
  accessToken: string;
}

export type FullUser = {
  id: string;
  avatarPath?: string;
  userName: string;
  email: string;
  avatar?: string;
  gender: UserGender;
  dateBirth: string;
  role: UserRole;
  description: string;
  location: Location;
  trainingLevel: TrainingLevel;
  typeTraining: TypeTraining[];
  certificate: string[];
  certificatesPath: CertificateType[];
  merits: string;
  personalTraining: boolean;
  timeTraining: TimeTraining;
  caloriesBurnedDay: number;
  caloriesBurnedTraining: number;
  trainingReadiness: boolean;
  isSubscribe?: boolean;
  isFriend?: boolean;
  image?: string;
}

export type Friend = {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  avatarPath: string;
  email: string;
  gender: UserGender;
  dateBirth: string;
  role: UserRole;
  description: string;
  location: Location;
  requestPersonal: boolean;
  requestTogether: boolean;
  requestStatus: StatusRequest;
  requestId?: string;
  typeTraining: TypeTraining[];
  trainingReadiness: boolean;
};

export type UpdateUser = {
  userName?: string;
  gender?: UserGender;
  description?: string;
  location?: Location;
  image?: string;
  trainingLevel?: TrainingLevel;
  typeTraining?: TypeTraining[];
  certificates?: string;
  merits?: string;
  personalTraining?: boolean;
  timeTraining?: TimeTraining;
  caloriesBurnedDay?: number;
  caloriesBurnedTraining?: number;
  trainingReadiness?: boolean;
}

export type BaseUser = {
  _id?: string;
  email: string;
  userName: string;
  gender: UserGender;
  dateBirth: string;
  avatar: string;
  role: UserRole;
  description: string;
  location: Location;
  password: string;
}


export type FileType = {
  avatarImg?: File;
  certificateFile?: File;
  certificateId?: string;
  fileVideoTraning?: File;
  fileImageTraning?: File;
  fileImageUser?: File;
}

export type CertificateType = {
  certificateId: string;
  certificatePath: string;
}

export enum UserGender {
  Male = 'male',
  Female = 'female',
  NoMatter = 'no matter',
}

export enum UserGenderTxt {
  Male = 'Мужской',
  Female = 'Женский',
  NoMatter = 'Неважно',
}

export const USER_GENDER_LIST = [UserGender.Male, UserGender.Female, UserGender.NoMatter];

export enum UserRole {
  Trainer = 'trainer',
  User = 'user',
}

export enum UserRoleTxt {
  Trainer = 'Я хочу тренировать',
  User = 'Я хочу тренироваться',
}


export const USER_ROLE_ARR = [UserRoleTxt.Trainer, UserRoleTxt.User];
export const USER_ROLE_ARR_TYPE = [UserRole.Trainer, UserRole.User];

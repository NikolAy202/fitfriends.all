import { BaseUser, UpdateUser } from '../../types/user';
import { QuestionnaireCoach, QuestionnaireUser } from '../../types/questionnaire';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UpdateUserDto } from '../../dto/user/update-user.dto';


export const adaptCoachToServer =
  (user: BaseUser & QuestionnaireCoach): CreateUserDto => ({
    userName: user.userName,
    email: user.email,
    password: user.password,
    gender: user.gender,
    dateBirth: user.dateBirth.toString(),
    role: user.role,
    location: user.location,
    trainingLevel: user.trainingLevel,
    typeTraining: user.typeTraining,
    merits: user.merits,
    personalTraining: user.personalTraining
  });

export const adaptUserToServer =
  (user: BaseUser & QuestionnaireUser): CreateUserDto => ({
    userName: user.userName,
    email: user.email,
    password: user.password,
    gender: user.gender,
    dateBirth: user.dateBirth.toString(),
    role: user.role,
    location: user.location,
    trainingLevel: user.trainingLevel,
    timeTraining: user.timeTraining,
    typeTraining: user.typeTraining,
    caloriesBurnedDay: user.caloriesReset,
    caloriesBurnedTraining: user.caloriesSpend,
    trainingReadiness: user.trainingReadiness
  });

export const adaptUserEditToServer =
  (user: UpdateUser): UpdateUserDto => ({
    userName: user.userName,
    gender: user.gender,
    location: user.location,
    trainingLevel: user.trainingLevel,
    timeTraining: user.timeTraining,
    typeTraining: user.typeTraining,
    caloriesBurnedDay: user.caloriesBurnedDay,
    caloriesBurnedTraining: user.caloriesBurnedTraining,
    trainingReadiness: user.trainingReadiness,
    personalTraining: user.personalTraining,
    description: user.description,
  });


export const adaptAvatarToServer =
  (file: File) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return formData;
  };


export const adaptCertificateToServer =
  (file: File, certificateId?: string) => {
    const formData = new FormData();
    formData.append('certificate', file, file.name);
    if(certificateId) {
      formData.append('certificateId', certificateId);
    }
    return formData;
  };


export const adaptBackgroundImgToServer =
  (file: File) => {
    const formData = new FormData();
    formData.set('background', file);
    return formData;
  };


export const adaptVideoToServer =
  (file: File) => {
    const formData = new FormData();
    formData.append('video', file, file.name);
    return formData;
  };

export const adaptImageToServer =
  (file: File) => {
    const formData = new FormData();
    formData.append('image', file, file.name);
    return formData;
  };

import UserWithTokenDto from '../../dto/user/user-with-token.dto';
import { FullUser, User } from '../../types/user';


export const adaptLoginToClient =
  (user: UserWithTokenDto): User => ({
    id: user.id,
    userName: user.userName,
    email: user.email,
    role: user.role,
    accessToken: user.token,
  });

export const adaptUserToClient =
  (user: FullUser): FullUser => ({
    id: user.id,
    userName: user.userName,
    email: user.email,
    avatar: user.avatar,
    avatarPath: user.avatarPath,
    gender: user.gender,
    dateBirth: user.dateBirth,
    role: user.role,
    description: user.description,
    location: user.location,
    trainingLevel: user.trainingLevel,
    typeTraining: user.typeTraining,
    certificate: user.certificate,
    certificatesPath: user.certificatesPath,
    merits: user.merits,
    personalTraining: user.personalTraining,
    timeTraining: user.timeTraining,
    caloriesBurnedDay: user.caloriesBurnedDay,
    caloriesBurnedTraining: user.caloriesBurnedTraining,
    trainingReadiness: user.trainingReadiness,
    isFriend: user.isFriend,
    isSubscribe: user.isSubscribe,
    image: user.image
  });

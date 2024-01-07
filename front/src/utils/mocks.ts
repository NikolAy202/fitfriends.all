import {lorem, datatype, name, internet, image, random} from 'faker';
import { FullUser, UserRole, UserGender, User, Friend, BaseUser } from '../types/user';
import { Comment, StatusRequest, Training } from '../types/training';
import { TrainingLevel, TimeTraining, TypeTraining } from '../types/questionnaire';
import { Location } from '../types/location.enum';
import { Notify, NotifyMessage } from '../types/notify';
import { Order, PaymentType } from '../types/order';


export const makeFakeUser = (): User => ({
  id: datatype.uuid(),
  userName: name.firstName(),
  email: internet.email(),
  role: random.arrayElement(Object.values(UserRole))
} as User);

export const makeFakeUserGeneral = (): BaseUser => ({
  userName: name.firstName(),
  email: internet.email(),
  role: random.arrayElement(Object.values(UserRole)),
  gender: random.arrayElement(Object.values(UserGender)),
  dateBirth: '1990-01-01T00:00:00.000Z',
  description: lorem.words(10),
  location:  random.arrayElement(Object.values(Location)),
  password: internet.password()
} as BaseUser);


export const makeFakeUserFullInfo = (): FullUser => ({
  id: datatype.uuid(),
  userName: name.firstName(),
  email: internet.email(),
  avatar: datatype.uuid(),
  avatarPath: image.avatar(),
  gender: random.arrayElement(Object.values(UserGender)),
  dateBirth: '1990-01-01T00:00:00.000Z',
  role: random.arrayElement(Object.values(UserRole)),
  description: lorem.words(10),
  location: random.arrayElement(Object.values(Location)),
  trainingLevel: random.arrayElement(Object.values(TrainingLevel)),
  typeTraining: random.arrayElements(Object.values(TypeTraining), 3),
  certificate: [],
  certificatesPath: [{certificateId: datatype.uuid(), certificatePath: image.avatar()}],
  merits: lorem.words(10),
  personalTraining: datatype.boolean(),
  timeTraining: random.arrayElement(Object.values(TimeTraining)),
  caloriesBurnedTraining: datatype.number({ min: 1000, max: 5000}),
  caloriesBurnedDay: datatype.number({ min: 1000, max: 5000}),
  trainingReadiness: datatype.boolean(),
  friends: datatype.boolean(),
  isSubscribe: datatype.boolean(),

} as FullUser);


export const makeFakeComment = (): Comment => ({
  text: lorem.words(55),
  trainingId: datatype.uuid(),
  id: datatype.uuid(),
  ratingTraining: datatype.number({ min: 1, max: 5}),
  userId: datatype.uuid(),
  userName: name.firstName(),
  avatarPath: image.avatar(),
} as Comment);

export const makeFakeTraining = (): Training => ({
  id: datatype.uuid(),
  title: name.title(),
  image: datatype.uuid(),
  trainingLevel: random.arrayElement(Object.values(TrainingLevel)),
  typeTraining: random.arrayElement(Object.values(TypeTraining)),
  timeTraining: random.arrayElement(Object.values(TimeTraining)),
  price: datatype.number(),
  caloriesBurnedTraining: datatype.number({ min: 1000, max: 5000}),
  description: lorem.words(50),
  gender:random.arrayElement(Object.values(UserGender)),
  videoTraning: datatype.uuid(),
  videoTraningPath:  image.avatar(),
  rating: datatype.number({ min: 1, max: 5}),
  trainer: datatype.uuid(),
  trainerName: name.title(),
  trainerAvataPath:  image.avatar(),
  specialOffer: datatype.boolean(),
  createdAt: datatype.datetime()
} as Training);

export const makeFakeFriend = (): Friend => ({
  id: datatype.uuid(),
  userId: datatype.uuid(),
  userName: name.firstName(),
  email: internet.email(),
  avatar: datatype.uuid(),
  avatarPath: image.avatar(),
  gender: random.arrayElement(Object.values(UserGender)),
  dateBirth: '1990-01-01T00:00:00.000Z',
  role: random.arrayElement(Object.values(UserRole)),
  description: lorem.words(10),
  location: random.arrayElement(Object.values(Location)),
  typeTraining: random.arrayElements(Object.values(TypeTraining), 3),
  requestPersonal: datatype.boolean(),
  requestTogether: datatype.boolean(),
  requestStatus: random.arrayElement(Object.values(StatusRequest)),
  requestId: datatype.uuid(),
  trainingReadiness: datatype.boolean(),

} as Friend);

export const makeFakeNotify = (): Notify => ({
  id: datatype.uuid(),
  userId: datatype.uuid(),
  initiatorId: datatype.uuid(),
  initiatorName: datatype.uuid(),
  text: random.arrayElement(Object.values(NotifyMessage)),
  dateNotify: datatype.datetime()

} as Notify);


export const makeFakeOrder = (): Order =>{
  const price = datatype.number();
  const count = datatype.number();
  const trainingRestCount = datatype.number({min: 0, max: count});
  return ({
    id: datatype.uuid(),
    userId: datatype.uuid(),
    trainerId: datatype.uuid(),
    trainingId: datatype.uuid(),
    orderType: datatype.uuid(),
    trainingCount: count,
    totalPrice: trainingRestCount * price,
    price: price,
    paymentType: random.arrayElement(Object.values(PaymentType)),
    trainingDoneCount: count - trainingRestCount,
    trainingRestCount: trainingRestCount,
    isDone: trainingRestCount === 0,
    rating: datatype.number({ min: 1, max: 5}),
    training: makeFakeTraining(),
    image: datatype.uuid(),
  } as Order);
};

export const makeFakeUserCoach = (): FullUser => ({
  id: datatype.uuid(),
  userName: name.firstName(),
  email: internet.email(),
  avatar: datatype.uuid(),
  avatarPath: image.avatar(),
  gender: random.arrayElement(Object.values(UserGender)),
  dateBirth: '1990-01-01T00:00:00.000Z',
  role: 'trainer',
  description: lorem.words(10),
  location: random.arrayElement(Object.values(Location)),
  trainingLevel: random.arrayElement(Object.values(TrainingLevel)),
  typeTraining: random.arrayElements(Object.values(TypeTraining), 3),
  certificate: [],
  certificatesPath: [{certificateId: datatype.uuid(), certificatePath: image.avatar()}],
  merits: lorem.words(10),
  trainingReadiness: datatype.boolean(),
  timeTraining: random.arrayElement(Object.values(TimeTraining)),
  caloriesBurnedDay: datatype.number({ min: 1000, max: 5000}),
  caloriesBurnedTraining: 0,
  personalTraining: false,
  friends: datatype.boolean(),
  isSubscribe: datatype.boolean(),

} as FullUser);

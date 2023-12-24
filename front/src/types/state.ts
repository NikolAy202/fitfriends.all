import {store} from '../store/index';
import {AuthorizationStatus, FormRegistration} from '../const';
import {User, FullUser, BaseUser, Friend} from './user';
import { Comment, TotalTrainInfo, Training } from './training';
import { Order } from './order';
import { Notify } from './notify';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  authInfo: User | null;
  hasErrorLogin: boolean;
  userData: BaseUser | null;
  userFullInfo: FullUser;
  formRegistrType: FormRegistration;
  existsEmail: boolean;
  isUserLoading: boolean;
  isUserCatalogLoading: boolean;
  isAuthInfoLoading: boolean;
  hasErrorPostCertificate: boolean;
  users: FullUser[];
  userOther: FullUser | null;
  isUserOtherLoading: boolean;
  countUsers: number;
};

export type TrainingData = {
  trainings: Training[];
  countAllTrainings: TotalTrainInfo;
  isLoadingCountAllTrainings: boolean;
  userTrainings: Training[];
  isTrainingsDataLoading: boolean;
  hasError: boolean;
  isTrainingLoading: boolean;
  training: Training | null;
  hasErrorPost: boolean;
  coachTrainings: Training[];
  isCoachTrainingsLoading: boolean;
  isLoadingPostTraining: boolean;
};

export type CommentData = {
  comments: Comment[];
  isCommentsDataLoading: boolean;
  hasError: boolean;
  hasErrorPostComment: boolean;
};

export type FriendData = {
  friends: Friend[];
  countFiends: number;
  isCountDataLoading: boolean;
  isFriendsDataLoading: boolean;
  hasError: boolean;
  hasErrorPost: boolean;
  isFriendLoadDelete: boolean;
  isFriendLoadPost: boolean;
};

export type NotifyData = {
  notifications: Notify[];
  hasErrorDeleteNotify: boolean;
  isNotifyLoad: boolean;
  isNotifyLoadDelete: boolean;
};


export type OrderData = {
  orders: Order[];
  isOrdersDataLoading: boolean;
  countOrders: number;
  isOrdersUserDataLoading: boolean;
  hasError: boolean;
  isPostLoading: boolean;
  hasErrorReduce: boolean;
  hasErrorPost: boolean;
  order: Order | null;
  isOrderDataLoading: boolean;
};

export type RequestData = {
  hasErrorPost: boolean;
  hasErrorDelete: boolean;
  isLoadPost: boolean;
  isLoadDelete: boolean;
};

export type SubscribeData = {
  hasErrorPost: boolean;
  hasErrorDelete: boolean;
  isSubscrLoadPost: boolean;
  isSubscrLoadDelete: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import {AxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AuthData} from '../types/auth-data';
import {APIRoute, AppRoute, HttpCode, MAX_CALORIES_VALUE} from '../const';
import {saveToken, dropToken} from '../services/token';
import {redirectToRoute} from './action';
import { BaseUser, FileType, Friend, FullUser, UpdateUser, User, UserRole } from '../types/user';
import { QuestionnaireCoach, QuestionnaireUser } from '../types/questionnaire';
import { adaptAvatarToServer, adaptBackgroundImgToServer, adaptCertificateToServer, adaptCoachToServer, adaptImageToServer, adaptUserEditToServer, adaptUserToServer, adaptVideoToServer } from '../utils/adapters/adaptersToServer';
import { setUserFullInfo, setAuthInfo } from './user-process/user-process';
import { NewTraining, Training, Query, StatusRequest, Comment, NewComment, TrainingRequest, TotalTrainInfo, } from '../types/training';
import { adaptUserToClient } from '../utils/adapters/adaptersToClient';
import { NewOrder, Order } from '../types/order';
import { Notify } from '../types/notify';

export const Action = {
  CHEK_USER: 'user/checkAuthAction',
  CHEK_EMAIL: 'user/checkEmail',
  LOGIN_USER: 'user/login',
  REGISTER_COACH: 'coach/register',
  REGISTER_USER: 'user/register',
  UPD_CERTIFICATE: 'coach/updateCertificate',
  POST_CERTIFICATE: 'coach/postCertificate',
  DELETE_CERTIFICATE: 'coach/deleteCertificate',
  EDIT_USER: 'user/edit',
  FETCH_USER: 'user/fetchUser',
  FETCH_USER_OTHER: 'user/fetchUserOther',
  FETCH_USER_CATALOG: 'user/fetchUserCatalog',
  FETCH_COUNT_USERS: 'user/fetchCountUsers',
  FETCH_COACH_TRAININGS: 'training/fetchCoachTrainings',
  FETCH_COACH_OTHER_TRAININGS: 'training/fetchCoachOtherTrainings',
  FETCH_COACH_TRAINING:  'training/fetchCoachTraining',
  POST_TRAINING:  'training/postTraining',
  EDIT_TRAINING:  'training/editTraining',
  FETCH_COACH_FRIENDS:  'coach/fetchCoachFriends',
  FETCH_COUNT_USER_FRIENDS:  'friends/fetchCountFriends',
  FETCH_USER_FRIENDS:  'user/fetchUserFriends',
  DELETE_USER_FRIEND:  'user/deleteFriend',
  DELETE_COACH_FRIEND:  'coach/deleteCoachFriend',
  POST_FRIEND:  'user/postFriend',
  FETCH_COACH_ORDERS:  'coach/fetchCoachOrders',
  POST_ORDER:  'user/postOrder',
  FETCH_COUNT_ORDERS:  'order/fetchCountOrders',
  FETCH_USER_ORDER:  'user/fetchUserOrder',
  ACCEPT_REQUEST:  'coach/acceptRequest',
  REJECT_REQUEST:  'coach/deleteRequest',
  FETCH_USER_TRAININGS: 'training/fetchUserTrainings',
  FETCH_CATALOG_TRAININGS: 'training/fetchCatalogTrainings',
  FETCH_COUNT_TRAININGS: 'training/fetchCountTrainings',
  FETCH_COMMENTS: 'comment/fetchComments',
  POST_COMMENT:  'comment/postComment',
  FETCH_USER_ORDERS:  'user/fetchUserOrders',
  REDUCE_ORDER:  'user/reduceOrder',
  CREATE_REQUEST:  'coach/createRequest',
  CREATE_SUBSCRIBE:  'user/createSubscribe',
  DELETE_SUBSCRIBE:  'user/deleteSubscribe',
  FETCH_NOTIFY: 'notify/fetchNotify',
  DELETE_NOTIFY:  'notify/deleteNotify',
};

export const registerCoach = createAsyncThunk<void, BaseUser & QuestionnaireCoach & FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
 }>(
   Action.REGISTER_COACH,
   async (newCoach: BaseUser & QuestionnaireCoach & FileType, { dispatch, extra: api }) => {
     // eslint-disable-next-line no-console
     console.log(newCoach);
     const { data } = await api.post<{ id: string }>(APIRoute.Register, adaptCoachToServer(newCoach));
     // eslint-disable-next-line no-console
     console.log(data);

     const {data: {accessToken}} = await api.post<User>(APIRoute.Login, {email: newCoach.email, password: newCoach.password});
     // eslint-disable-next-line no-console
     console.log(data);
     saveToken(accessToken);
     if (data && newCoach.avatarImg?.name && newCoach.certificateFile?.name) {
       // eslint-disable-next-line no-console
       console.log(newCoach.avatarImg);
       const postAvatarApiRoute = `${APIRoute.Files}/avatar`;
       await api.post(postAvatarApiRoute, adaptAvatarToServer(newCoach.avatarImg));

       const postCertificateApiRoute = `${APIRoute.Files}/trainer/certificate`;
       await api.post(postCertificateApiRoute, adaptCertificateToServer(newCoach.certificateFile));
     }
     dispatch(redirectToRoute(AppRoute.Intro));
   });

export const registerUser = createAsyncThunk<void, BaseUser & QuestionnaireUser & FileType, {
dispatch: AppDispatch;
state: State;
extra: AxiosInstance;
}>(
  Action.REGISTER_USER,
  async (newUser: BaseUser & QuestionnaireUser & FileType, { dispatch, extra: api }) => {
    // eslint-disable-next-line no-console
    console.log(newUser);
    const { data } = await api.post<{ id: string }>(APIRoute.Register, adaptUserToServer(newUser));

    const {data: {accessToken}} = await api.post<User>(APIRoute.Login, {email: newUser.email, password: newUser.password});
    saveToken(accessToken);
    if (data && newUser.avatarImg?.name) {
      const postAvatarApiRoute = `${APIRoute.Files}/avatar`;
      // eslint-disable-next-line no-console
      console.log(newUser.avatarImg);
      await api.post(postAvatarApiRoute, adaptAvatarToServer(newUser.avatarImg));
    }
    dispatch(redirectToRoute(AppRoute.Main));
  });

export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.CHEK_USER,
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<User>(APIRoute.CheckUser);
      // eslint-disable-next-line no-console
      console.log('checkAuthAction', data);
      dispatch(setAuthInfo({authInfo: data}));

      return data;

    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.UNAUTHORIZED) {
        dropToken();
      }

      return Promise.reject(error);
    }
  },
);


export const loginUser = createAsyncThunk<FullUser | null, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.LOGIN_USER,
  async ({login: email, password}, {dispatch, extra: api}) => {
    // eslint-disable-next-line no-console
    console.log(email, password);
    const auth = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(auth.data.accessToken);

    const {data} = await api.get<FullUser>(APIRoute.CheckUser);
    dispatch(setAuthInfo({authInfo: {id: data.id, userName: data.userName, role: data.role, email: data.email , accessToken: auth.data.accessToken}}));
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch(setUserFullInfo({userFullInfo: data}));
    if(data.role === UserRole.Trainer)
    {
      dispatch(redirectToRoute(AppRoute.AccountCoach));
    }
    else
    {
      // eslint-disable-next-line no-console
      console.log('loginUser', data.role);
      dispatch(redirectToRoute(AppRoute.Main));
    }
    return adaptUserToClient(data);
  },
);


export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const checkEmail = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.CHEK_EMAIL,
  async ({login: email}, {dispatch, extra: api}) => {
    const {data} = await api.post<string>(APIRoute.CheckEmail, {email});
    if(data) {
      return data;
    }
    return 'false';
  },
);

export const editUser = createAsyncThunk<FullUser, UpdateUser & FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
 }>(
   Action.EDIT_USER,
   async (updUser: UpdateUser & FileType, { dispatch, extra: api }) => {
     // eslint-disable-next-line no-console
     console.log(updUser);
     const { data } = await api.post<FullUser>(`${APIRoute.Users}/update`, adaptUserEditToServer(updUser));
     if (data && updUser.avatarImg?.name) {
       const postAvatarApiRoute = `${APIRoute.Files}/avatar`;
       await api.post(postAvatarApiRoute, adaptAvatarToServer(updUser.avatarImg));
     }
     if (data && updUser.fileImageUser?.name) {
       const postAvatarApiRoute = `${APIRoute.Files}/user/background`;
       await api.post(postAvatarApiRoute, adaptBackgroundImgToServer(updUser.fileImageUser));
     }
     dispatch(fetchUser());
     return adaptUserToClient(data);
   });


export const fetchUser = createAsyncThunk<FullUser, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.FETCH_USER,
    async (id, {dispatch, extra: api}) => {

      try {
        const {data} = await api.get<FullUser>(APIRoute.CheckUser);
        // eslint-disable-next-line no-console
        console.log(data);
        return adaptUserToClient(data);
      } catch (error) {

        return Promise.reject(error);
      }
    });

export const fetchUserOther = createAsyncThunk<FullUser, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    Action.FETCH_USER_OTHER,
    async (id, { dispatch, extra: api }) => {
      const { data } = await api.get<FullUser>(`${APIRoute.Users}/${id}`);
      // eslint-disable-next-line no-console
      console.log(data);
      const user = adaptUserToClient(data);
      // eslint-disable-next-line no-console
      console.log(user);
      return user;
    });

export const fetchCountUsers = createAsyncThunk<number, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.FETCH_COUNT_USERS,
    async (_arg, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<number>(`${APIRoute.Users}/get/count`);
        return data;

      } catch (error) {

        return Promise.reject(error);
      }
    });

export const fetchUserCatalog = createAsyncThunk<FullUser[], Query | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.FETCH_USER_CATALOG,
    async (query, {dispatch, extra: api}) => {
      try {
        const limit = query && query.limit ? `limit=${query.limit}&` : '';
        const page = query && query.page ? `page=${query.page}&` : '';
        const userRoleQuery = query && query.userRole ? `userRole=${query.userRole}&` : '';
        const locationQuery = query && query.location ? `location=${query.location.join(',')}&` : '';
        const levelTrainingQuery = query && query.trainingLevel ? `levelTraining=${query.trainingLevel}&` : '';
        const trainingTypeQuery = query && query.typeTraining ? `trainingType=${query.typeTraining.join(',').trim()}` : '';
        const {data} = await api.get<FullUser[]>(`${APIRoute.Users}?${limit}${page}${userRoleQuery}${levelTrainingQuery}${locationQuery}${trainingTypeQuery}`);
        // eslint-disable-next-line no-console
        console.log(data);
        return data;

      } catch (error) {

        return Promise.reject(error);
      }
    });

export const fetchCoachTrainings = createAsyncThunk<Training[], Query | undefined, {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance; }>(
        Action.FETCH_COACH_TRAININGS,
        async (query, {dispatch, extra: api}) => {
          try {
            const limit = query && query.limit ? `limit=${query.limit}&` : '';
            const page = query && query.page ? `page=${query.page}&` : '';
            const priceQuery = query && query.price ? `price=${query.price[0]},${query.price[1]}` : '';
            const caloriesQuery = query && query.caloriesReset ? `&caloriesReset=${query.caloriesReset[0]},${query.caloriesReset[1]}` : '';
            const trainingTimeQuery = query && query.timeTraining ? `&trainingTime=${query.timeTraining.join(',').trim()}` : '';
            const rating = query && query.rating ? `&rating=${query.rating[0]},${query.rating[1]}` : '';

            const {data} = await api.get<Training[]>(`${APIRoute.CoachTraining}/show/list?${limit}${page}${priceQuery}${caloriesQuery}${trainingTimeQuery}${rating}`);
            return data;
          } catch (error) {
            return Promise.reject(error);
          }
        });

export const fetchCoachOtherTrainings = createAsyncThunk<Training[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.FETCH_COACH_OTHER_TRAININGS,
    async (id, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<Training[]>(`${APIRoute.Training}/${id}?sortDate=desc`);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const fetchCoachTraining = createAsyncThunk<Training, string, {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance; }>(
        Action.FETCH_COACH_TRAINING,
        async (id, {dispatch, extra: api}) => {
          try {
            const {data} = await api.get<Training>(`${APIRoute.CoachTraining}/${id}`);
            return data;
          } catch (error) {
            return Promise.reject(error);
          }
        });

export const postTraining = createAsyncThunk<Training, NewTraining & FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    Action.POST_TRAINING,
    async (newtraining: NewTraining & FileType, { dispatch, extra: api }) => {
      // eslint-disable-next-line no-console
      console.log('postTraining', newtraining);
      const { data } = await api.post<Training>(`${APIRoute.Coach}/`, newtraining);
      if (data && newtraining.fileVideoTraning?.name) {
        const postCertificateApiRoute = `${APIRoute.Files}/video/training/${data.id}`;
        await api.post(postCertificateApiRoute, adaptVideoToServer(newtraining.fileVideoTraning));
      }
      if (data && newtraining.fileImageTraning?.name) {
        const postImageApiRoute = `${APIRoute.Files}/image/training/${data.id}`;
        await api.post(postImageApiRoute, adaptImageToServer(newtraining.fileImageTraning));
      }
      dispatch(redirectToRoute(`${AppRoute.AccountCoach}/trainings`));

      return data;
    });

export const editTraining = createAsyncThunk<Training, Training, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    Action.EDIT_TRAINING,
    async (training, { dispatch, extra: api }) => {

      if (training.fileVideoTraning?.name) {
        const postVideoApiRoute = `${APIRoute.Files}/video/training/${training.id}`;
        await api.post(postVideoApiRoute, adaptVideoToServer(training.fileVideoTraning));
      }

      const { data } = await api.post<Training>(`${APIRoute.CoachTraining}/edit/${training.id}`, training);
      return data;
    });

export const updateCertificate = createAsyncThunk<void, FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    Action.UPD_CERTIFICATE,
    async ({certificateId, certificateFile }, { dispatch, extra: api }) => {
      if (certificateFile) {
        const postCertificateApiRoute = `${APIRoute.Files}/coach/certificate/update`;
        await api.post(postCertificateApiRoute, adaptCertificateToServer(certificateFile, certificateId));
      }

    });


export const fetchCoachFriends = createAsyncThunk<Friend[], Query | undefined, {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance; }>(
        Action.FETCH_COACH_FRIENDS,
        async (query, {dispatch, extra: api}) => {
          try {
            const limit = query && query.limit ? `limit=${query.limit}&` : '';
            const page = query && query.page ? `page=${query.page}&` : '';
            const {data} = await api.get<Friend[]>(`${APIRoute.Coach}/friends/?${limit}${page}`);
            return data;
          } catch (error) {
            return Promise.reject(error);
          }
        });

export const fetchCountFriends = createAsyncThunk<number, UserRole, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.FETCH_COUNT_USER_FRIENDS,
    async (role, {dispatch, extra: api}) => {
      try {
        if (role === UserRole.User) {
          const {data} = await api.get<FullUser[]>(`${APIRoute.User}/friends`);
          return data.length;
        }
        const {data} = await api.get<FullUser[]>(`${APIRoute.Coach}/friends`);
        return data.length;

      } catch (error) {
        return Promise.reject(error);
      }
    });

export const deleteFriend = createAsyncThunk<Friend, string, {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance; }>(
          Action.DELETE_USER_FRIEND,
          async (id, {dispatch, extra: api}) => {
            try {
              const {data} = await api.post<Friend>(`${APIRoute.Coach}/friends/delete/${id}`);
              return data;
            } catch (error) {
              return Promise.reject(error);
            }
          });

export const deleteCoachFriend = createAsyncThunk<Friend, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.DELETE_COACH_FRIEND,
    async (id, {dispatch, extra: api}) => {
      try {
        const {data} = await api.post<Friend>(`${APIRoute.Coach}/friends/delete/${id}`);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const postFriend = createAsyncThunk<Friend, FullUser['id'], {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance; }>(
          Action.POST_FRIEND,
          async (id, {dispatch, extra: api}) => {
            try {
              const {data} = await api.post<Friend>(`${APIRoute.Users}/friend/${id}`);
              return data;
            } catch (error) {
              return Promise.reject(error);
            }
          });

export const fetchCountOrders = createAsyncThunk<number, UserRole, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.FETCH_COUNT_ORDERS,
    async (role, {dispatch, extra: api}) => {
      try {
        if (role === UserRole.Trainer) {
          const {data} = await api.get<Order[]>(`${APIRoute.Coach}/orders`);
          return data.length;
        }
        const {data} = await api.get<Order[]>(`${APIRoute.User}/balance`);
        return data.length;
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const fetchCoachOrders = createAsyncThunk<Order[], string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.FETCH_COACH_ORDERS,
    async (sortData, {dispatch, extra: api}) => {
      try {
        const sort = sortData ? sortData : ' ';
        // eslint-disable-next-line no-console
        console.log(sort);
        const {data} = await api.get<Order[]>(`${APIRoute.Coach}/orders?${sort}`);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const postOrder = createAsyncThunk<Order, NewOrder, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.POST_ORDER,
    async (newOrder, {dispatch, extra: api}) => {
      const {trainingId, trainingCount, paymentType} = newOrder;
      try {
        const {data} = await api.post<Order>(`${APIRoute.User}/order/${trainingId}`, {trainingCount, paymentType});
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const createRequest = createAsyncThunk<void, TrainingRequest, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.CREATE_REQUEST,
    async (trainingRequest, {dispatch, extra: api}) => {
      try {
        await api.post(`${APIRoute.User}/request`,trainingRequest);
        dispatch(fetchCoachFriends());
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const acceptRequest = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.ACCEPT_REQUEST,
    async (requestId, {dispatch, extra: api}) => {
      try {
        await api.post(`${APIRoute.Users}/request/update/${requestId}`,
          {
            'statusRequest': StatusRequest.Accepted
          });
        dispatch(fetchCoachFriends());
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const deleteRequest = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.REJECT_REQUEST,
    async (requestId, {dispatch, extra: api}) => {
      try {
        await api.post(`${APIRoute.Users}/request/update/${requestId}`,
          {
            'statusRequest': StatusRequest.Rejected
          });
        dispatch(fetchCoachFriends());
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const fetchUserFriends = createAsyncThunk<Friend[], Query | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.FETCH_USER_FRIENDS,
    async (query, {dispatch, extra: api}) => {
      try {
        // const limit = query && query.limit ? `limit=${query.limit}&` : '';
        // const page = query && query.page ? `page=${query.page}&` : '';
        const {data} = await api.get<Friend[]>(`${APIRoute.User}/friends`);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const postCertificate = createAsyncThunk<void, FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    Action.POST_CERTIFICATE,
    async (newCertificate: FileType, { dispatch, extra: api }) => {
      // eslint-disable-next-line no-console
      console.log(newCertificate.certificateFile);
      if (newCertificate.certificateFile) {
        // eslint-disable-next-line no-console
        console.log('newCertificate');
        const postCertificateApiRoute = `${APIRoute.Files}/trainer/certificate`;
        await api.post(postCertificateApiRoute, adaptCertificateToServer(newCertificate.certificateFile));
        dispatch(fetchUser());
        dispatch(redirectToRoute(AppRoute.AccountCoach));
      }

    });

export const deleteCertificate = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    Action.DELETE_CERTIFICATE,
    async (certificateId, { dispatch, extra: api }) => {
      await api.delete(`${APIRoute.Coach}/certificate/delete/${certificateId}`);
      dispatch(fetchUser());
      dispatch(redirectToRoute(AppRoute.AccountCoach));
    });

export const fetchComments = createAsyncThunk<Comment[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.FETCH_COMMENTS,
    async (id, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<Comment[]>(`${APIRoute.Training}/comments/${id}`);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const postComment = createAsyncThunk<Comment, NewComment, {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance; }>(
          Action.POST_COMMENT,
          async (newComment, {dispatch, extra: api}) => {
            try {
              const {text, ratingTraining, userId, trainingId } = newComment;
              const {data} = await api.post<Comment>(`${APIRoute.User}/comments/${trainingId}`, {text, ratingTraining, userId});
              return data;
            } catch (error) {
              return Promise.reject(error);
            }
          });

export const fetchUserTrainings = createAsyncThunk<Training[], FullUser, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.FETCH_USER_TRAININGS,
    async (userFullInfo, {dispatch, extra: api}) => {
      try {
        // const userFullInfo = useAppSelector(getUserFullInfo);
        // eslint-disable-next-line no-console
        console.log('fetchUserTrainings', userFullInfo);
        const {typeTraining, timeTraining, caloriesBurnedTraining } = userFullInfo;
        const caloriesQuery = `&caloriesReset=${caloriesBurnedTraining},${MAX_CALORIES_VALUE}`;
        const trainingTimeQuery = `&trainingTime=${timeTraining.trim()}`;
        const trainingTypeQuery = `&trainingType=${typeTraining.join(',')}`;
        const {data} = await api.get<Training[]>(`${APIRoute.Training}/catalog?${caloriesQuery}${trainingTimeQuery}${trainingTypeQuery}`);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const fetchCountTrainings = createAsyncThunk<TotalTrainInfo, UserRole, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.FETCH_COUNT_TRAININGS,
    async (role, {dispatch, extra: api}) => {
      try {
        if (role === UserRole.User) {
          const {data} = await api.get<TotalTrainInfo>(`${APIRoute.Training}/count`);
          return data;
        }
        const {data} = await api.get<TotalTrainInfo>(`${APIRoute.Training}/count`);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const fetchCatalogTrainings = createAsyncThunk<Training[], Query | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.FETCH_CATALOG_TRAININGS,
    async (query, {dispatch, extra: api}) => {
      try {
        // eslint-disable-next-line no-console
        console.log('fetchCatalogTrainings');
        const price = query && query.price ? `price=${query.price[0]},${query.price[1]}` : '';
        const caloriesLoss = query && query.caloriesReset ? `&caloriesReset=${query.caloriesReset[0]},${query.caloriesReset[1]}` : '';
        //const trainingTimeQuery = query && query.timeTraining ? `&trainingTime=${query.timeTraining.join(',').trim()}` : '';
        const trainingStyle = query && query.typeTraining ? `&trainingType=${query.typeTraining.join(',').trim()}` : '';
        const rating = query && query.rating ? `&rating=${query.rating[0]},${query.rating[1]}` : '';
        const sortPrice = query && query.sortPrice ? `&sortPrice=${query.sortPrice}` : '';
        const {data} = await api.get<Training[]>(
          `${APIRoute.Training}/catalog?${price}${caloriesLoss}${trainingStyle}${rating}${sortPrice}`
        );
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const fetchUserOrders = createAsyncThunk<Order[], Query | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.FETCH_USER_ORDERS,
    async (query, {dispatch, extra: api}) => {
      try {
        //const isDone = query && query.isDone ? `isDone=${query.isDone}` : '';
        const {data} = await api.get<Order[]>(`${APIRoute.User}/balance`);

        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const reduceOrder = createAsyncThunk<Order, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.REDUCE_ORDER,
    async (id, {dispatch, extra: api}) => {
      try {
        const {data} = await api.post<Order>(`${APIRoute.Users}/orders/reduce/${id}`);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const fetchUserOrder = createAsyncThunk<Order, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.FETCH_USER_ORDER,
    async (id, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<Order>(`${APIRoute.User}/balance`);
        // eslint-disable-next-line no-console
        console.log('data');
        // eslint-disable-next-line no-console
        console.log(data);
        return data;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('da1ta');
        return Promise.reject(error);
      }
    });

export const createSubscribe = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.CREATE_SUBSCRIBE,
    async (coachId, {dispatch, extra: api}) => {
      try {
        await api.post(`${APIRoute.User}/subscribe/${coachId}` );
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const deleteSubscribe = createAsyncThunk<void, string, {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance; }>(
        Action.DELETE_SUBSCRIBE,
        async (coachId, {dispatch, extra: api}) => {
          try {
            await api.delete(`${APIRoute.User}/subscribe/${coachId}`,);
          } catch (error) {
            return Promise.reject(error);
          }
        });

export const fetchNotify = createAsyncThunk<Notify[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.FETCH_NOTIFY,
    async (_arg, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<Notify[]>(`${APIRoute.Users}/notify/list`);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    });

export const deleteNotify = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    Action.DELETE_NOTIFY,
    async (id, {dispatch, extra: api}) => {
      try {
        await api.delete(`${APIRoute.Users}/notify/delete/${id}`);

      } catch (error) {
        return Promise.reject(error);
      }
    });

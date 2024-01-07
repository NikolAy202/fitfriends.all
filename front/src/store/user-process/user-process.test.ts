import {userProcess} from './user-process';
import {UserProcess} from '../../types/state';
import {AuthorizationStatus, FormRegistration} from '../../const';
import {checkAuthAction, loginUser, fetchUser, fetchUserCatalog} from '../api-actions';
import {makeFakeUser, makeFakeUserFullInfo} from '../../utils/mocks';
import { UserRole, UserGender } from '../../types/user';
import { Location } from '../../types/location.enum';
import { TrainingLevel, TimeTraining } from '../../types/questionnaire';

const fullUser = { id: '', userName: '', email: '', gender: UserGender.NoMatter, dateBirth: '', role: UserRole.Trainer,
  description: '', location: Location.Pionerskaya, trainingLevel: TrainingLevel.Beginner,
  typeTraining: [], merits: '', personalTraining: false, timeTraining: TimeTraining.Time30,
  caloriesBurnedDay: 0, caloriesBurnedTraining: 0, trainingReadiness: false, certificate: [], certificatesPath: []};


describe('Reducer: user', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      authInfo: null,
      hasErrorLogin: false,
      userData: null,
      userFullInfo: fullUser,
      isUserLoading: false,
      isUserCatalogLoading: false,
      isAuthInfoLoading: false,
      formRegistrType: FormRegistration.General,
      existsEmail: false,
      hasErrorPostCertificate: false,
      users: [],
      userOther: null,
      isUserOtherLoading: false,
      countUsers: 0
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        authInfo: null,
        hasErrorLogin: false,
        userData: null,
        userFullInfo: fullUser,
        isUserLoading: false,
        isUserCatalogLoading: false,
        isAuthInfoLoading: false,
        formRegistrType: FormRegistration.General,
        existsEmail: false,
        hasErrorPostCertificate: false,
        users: [],
        userOther: null,
        isUserOtherLoading: false,
        countUsers: 0
      });
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      const fakeUser = makeFakeUser();
      expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type, payload: fakeUser}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUser, hasErrorLogin: false,
          userData: null, userFullInfo: fullUser, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, authInfo: null, hasErrorLogin: false,
          userData: null, userFullInfo: fullUser, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: loginUser.fulfilled.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, authInfo: null, hasErrorLogin: false,
          userData: null, userFullInfo: fullUser, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, { type: loginUser.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, authInfo: null, hasErrorLogin: true,
          userData: null, userFullInfo: fullUser, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
  });


  describe('fetchUser test', () => {
    it('should get userFullInfo if fetchUser fulfilled', () => {
      const fakeUser = makeFakeUserFullInfo();
      expect(userProcess.reducer(state, { type: fetchUser.fulfilled.type, payload: fakeUser }))
        .toEqual({authorizationStatus: AuthorizationStatus.Unknown, authInfo: null, hasErrorLogin: false,
          userData: null, userFullInfo: fakeUser, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
    it('should userFullInfo is null if fetchUser rejected', () => {
      expect(userProcess.reducer(state, { type: fetchUser.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.Unknown, authInfo: null, hasErrorLogin: false,
          userData: null, userFullInfo: fullUser, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
  });


  describe('fetchUserCatalog test', () => {
    it('fetchUserCatalog fulfilled test', () => {
      const fakeUsers = Array.from({length: 5}, () => makeFakeUserFullInfo());
      expect(userProcess.reducer(state, { type: fetchUserCatalog.fulfilled, payload: fakeUsers}))
        .toEqual({authorizationStatus: AuthorizationStatus.Unknown, authInfo: null, hasErrorLogin: false,
          userData: null, userFullInfo: fullUser, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: fakeUsers, userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
    it('fetchOffersAction rejected test', () => {
      expect(userProcess.reducer(state, { type: fetchUserCatalog.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.Unknown, authInfo: null, hasErrorLogin: false,
          userData: null, userFullInfo: fullUser, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
  });

});


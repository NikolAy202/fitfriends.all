import UserRegistrationForm from '../../components/registration-form/registration-form';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getUserGeneralInfo } from '../../store/user-process/selectors';
import { setUserGeneralInfo } from '../../store/user-process/user-process';
import { BaseUser, UserRole } from '../../types/user';
import QuestionnaireCoachForm from '../questionnaire-coach-form/questionnaire-coach-form';
import QuestionnaireUserForm from '../questionnaire-user-form/questionnaire-user-form';
import { useState } from 'react';

function RegistrationPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const userDataCurrent = useAppSelector(getUserGeneralInfo);

  const [avatarImg, setAvatar] = useState<File>();
  const handleFormSubmit = (userData: BaseUser, file: File) => {
    dispatch(setUserGeneralInfo({userData}));
    setAvatar(file);
  };


  return (
    <div className="wrapper">
      <main>
        <div className="background-logo">
          <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
            <use xlinkHref="#logo-big"></use>
          </svg>
          <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
            <use xlinkHref="#icon-logotype"></use>
          </svg>
        </div>
        <div className="popup-form popup-form--sign-up">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Регистрация</h1>
              </div>
              <div className="popup-form__form">
                {!userDataCurrent?.email && (<UserRegistrationForm onSubmit={handleFormSubmit} />)}
                {(userDataCurrent?.email && userDataCurrent?.role === UserRole.Trainer) &&
                  (<QuestionnaireCoachForm userData={userDataCurrent} avatarImg={avatarImg}/>) }
                {(userDataCurrent?.email && userDataCurrent?.role === UserRole.User) &&
                    (<QuestionnaireUserForm userData={userDataCurrent} avatarImg={avatarImg}/>)}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}

export default RegistrationPage;

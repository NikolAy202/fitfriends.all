import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../../components/history-route/history-route';
import QuestionnaireUserForm from './questionnaire-user-form';
import {makeFakeUserFullInfo, makeFakeUserGeneral} from '../../utils/mocks';
import { AuthorizationStatus, FormRegistration } from '../../const';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUserFull = makeFakeUserFullInfo();
const fakeUserGeneral = makeFakeUserGeneral();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserFull, hasErrorLogin: false,
    userData: fakeUserGeneral, userFullInfo: fakeUserFull, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
    hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0},
});


describe('Component: QuestionnaireUserForm', () => {
  it('should render "QuestionnaireUserForm"', async () => {
    const history = createMemoryHistory();
    const file = new File([new ArrayBuffer(1)], 'file.jpg');
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <QuestionnaireUserForm
              userData={fakeUserGeneral}
              avatarImg={file}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Опросник/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('caloriesReset'), '1250');

    expect(screen.getByDisplayValue(/1250/i)).toBeInTheDocument();
  });
});

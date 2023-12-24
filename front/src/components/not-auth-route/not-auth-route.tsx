import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { UserRole } from '../../types/user';


type NotAuthRouteProps = {
  restrictedFor: AuthorizationStatus;
  userRole?: UserRole;
  children: JSX.Element;
}

const NotAuthRoute = ({ children, restrictedFor, userRole}: NotAuthRouteProps): JSX.Element => {
  // eslint-disable-next-line no-console
  console.log('NotAuthRoute', restrictedFor, userRole);
  if (AuthorizationStatus.Auth === restrictedFor && userRole === UserRole.Trainer)
  {
    return <Navigate to={AppRoute.AccountCoach} />;
  }
  if (AuthorizationStatus.Auth === restrictedFor && userRole === UserRole.User)
  {
    // eslint-disable-next-line no-console
    console.log('Navigate', restrictedFor, userRole);
    return <Navigate to={AppRoute.Main} />;

  }
  return children;
};

export default NotAuthRoute;

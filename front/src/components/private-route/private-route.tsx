import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
  verifyRole: boolean;
}


const PrivateRoute = ({ children, restrictedFor, redirectTo, verifyRole}: PrivateRouteProps): JSX.Element =>
  /*console.log( 'PrivateRoute', restrictedFor , verifyRole, children);*/
  AuthorizationStatus.NoAuth !== restrictedFor && verifyRole
    ? children
    : <Navigate to={redirectTo} />;

export default PrivateRoute;

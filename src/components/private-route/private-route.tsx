import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../utils/const';

type PrivateRouteProps = {
  isLoginPage?: boolean;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {isLoginPage, children} = props;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (isLoginPage) {
    return (
      authorizationStatus === AuthorizationStatus.Auth
        ? <Navigate to={AppRoute.Main}/>
        : children
    );
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;

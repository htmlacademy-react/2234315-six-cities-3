import { Link, useLocation, useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../utils/const';
import { getAuthorizationStatus, getUserData } from '../../store/user-process/user-process.selectors';
import { getFavoriteOffers } from '../../store/app-process/app-process.selectors';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const isLoginPage = currentPath === AppRoute.Login as string;

  const handleSignOut = () => {
    dispatch(logoutAction());

    if (currentPath === AppRoute.Favorites as string) {
      navigate(AppRoute.Main);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {!isLoginPage &&
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div
                          className="header__avatar-wrapper user__avatar-wrapper"
                          style={{ backgroundImage: userData?.avatarUrl ? `url(${userData.avatarUrl})` : 'url(/img/avatar.svg)' }}
                        />
                        <span className="header__user-name user__name">{userData && userData.email}</span>
                        <span className="header__favorite-count">{favoriteOffers.length}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link
                        className="header__nav-link"
                        to='#'
                        onClick={(evt) => {
                          evt.preventDefault();
                          handleSignOut();
                        }}
                      >
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
}

export default memo(Header);

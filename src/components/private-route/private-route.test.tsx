import { MemoryHistory, createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../utils/const';
import { withHistory, withStore } from '../../utils/mock-component';
import PrivateRoute from './private-route';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  it('should redirect to login when user is not authorized and route is private', () => {
    const privateRouteText = 'Private content';
    const loginRouteText = 'Login page';

    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{loginRouteText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute>
            <span>{privateRouteText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    const { withStoreComponent } = withStore(
      preparedComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null
        }
      })
    );

    mockHistory.push(AppRoute.Favorites);
    render(withStoreComponent);

    expect(screen.getByText(loginRouteText)).toBeInTheDocument();
    expect(screen.queryByText(privateRouteText)).not.toBeInTheDocument();
  });

  it('should render private content when user is authorized and route is private', () => {
    const privateRouteText = 'Private content';

    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute>
            <span>{privateRouteText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    const { withStoreComponent } = withStore(
      preparedComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null
        }
      })
    );

    mockHistory.push(AppRoute.Favorites);
    render(withStoreComponent);

    expect(screen.getByText(privateRouteText)).toBeInTheDocument();
  });

  it('should redirect to main page when user is authorized and on login page', () => {
    const loginRouteText = 'Login page';
    const mainRouteText = 'Main page';

    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Main} element={<span>{mainRouteText}</span>} />
        <Route path={AppRoute.Login} element={
          <PrivateRoute isLoginPage>
            <span>{loginRouteText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    const { withStoreComponent } = withStore(
      preparedComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null
        }
      })
    );

    mockHistory.push(AppRoute.Login);
    render(withStoreComponent);

    expect(screen.getByText(mainRouteText)).toBeInTheDocument();
    expect(screen.queryByText(loginRouteText)).not.toBeInTheDocument();
  });

  it('should render login page when user is not authorized and on login page', () => {
    const loginRouteText = 'Login page';

    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={
          <PrivateRoute isLoginPage>
            <span>{loginRouteText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    const { withStoreComponent } = withStore(
      preparedComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null
        }
      })
    );

    mockHistory.push(AppRoute.Login);
    render(withStoreComponent);

    expect(screen.getByText(loginRouteText)).toBeInTheDocument();
  });
});

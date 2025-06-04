import { render, screen } from '@testing-library/react';
import Header from './header';
import { withHistory, withStore } from '../../utils/mock-component';
import { AppRoute, AuthorizationStatus } from '../../utils/const';
import { makeFakeOffer, makeFakeStore, makeFakeUserData } from '../../utils/mocks';
import { State } from '../../types/state';
import { createMemoryHistory } from 'history';

describe('Component: Header', () => {
  const mockUserData = makeFakeUserData();
  const initialState: Partial<State> = makeFakeStore();
  const store: Partial<State> = {
    ...initialState,
    APP: {
      ...initialState.APP!,
      favoriteOffers: [makeFakeOffer(), makeFakeOffer()]
    },
    USER: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
    },
  };

  it('should render logo correctly', () => {
    const { withStoreComponent } = withStore(<Header />, store);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toHaveClass('header__logo');
    expect(screen.getByRole('link', { name: /6 cities logo/i })).toHaveAttribute('href', AppRoute.Main);
  });

  it('should render sign in link when user is not authorized', () => {
    const { withStoreComponent } = withStore(<Header />, {
      ...initialState,
      USER: {
        ...initialState.USER!,
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign in/i })).toHaveAttribute('href', AppRoute.Login);
  });

  it('should render user info and sign out when user is authorized', () => {
    const newStore = {
      ...store,
      APP: {
        ...store.APP!,
        favoriteOffers: [makeFakeOffer(), makeFakeOffer()]
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: mockUserData,
      },
    };
    const { withStoreComponent } = withStore(<Header />, newStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockUserData.email)).toBeInTheDocument();
    expect(screen.getByText(newStore.APP.favoriteOffers.length.toString())).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should not render nav on login page', () => {
    const mockHistory = createMemoryHistory();
    mockHistory.push(AppRoute.Login);

    const { withStoreComponent } = withStore(<Header />, {
      ...initialState,
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
    });

    const preparedComponent = withHistory(withStoreComponent, mockHistory);
    render(preparedComponent);

    expect(screen.queryByTestId('header-nav')).not.toBeInTheDocument();
  });
});

import App from './app';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, CITIES } from '../../utils/const';
import { makeFakeDetailedOffer, makeFakeOffer, makeFakeStore, makeFakeUserData } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Home" when user navigates to "/"', () => {
    const offer = makeFakeOffer();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        APP: {
          city: offer.city,
          offers: [offer],
          favoriteOffers: [],
          isOffersLoading: false,
        }
      })
    );

    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /paris/i })).toBeInTheDocument();
    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
  });

  it('should render "Login" when user navigates to "/login" and is not authorized', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        }
      })
    );

    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByRole('heading', { level: 1, name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toHaveAttribute('type', 'email');
    expect(screen.getByPlaceholderText(/password/i)).toHaveAttribute('type', 'password');
  });

  it('should redirect to "/" when authorized user navigates to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: makeFakeUserData(),
        }
      })
    );

    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /paris/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1, name: /Sign in/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Sign in/i })).not.toBeInTheDocument();
  });

  it('should render "Favorites" when authorized user navigates to "/favorites"', () => {
    const favoriteOffer = makeFakeOffer();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        APP: {
          city: CITIES[1],
          offers: [],
          favoriteOffers: [{ ...favoriteOffer, isFavorite: true }],
          isOffersLoading: false,
        },
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: makeFakeUserData(),
        }
      })
    );

    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByRole('heading', { level: 1, name: /Saved listing/i })).toBeInTheDocument();
    expect(screen.getByText(favoriteOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${favoriteOffer.price}`)).toBeInTheDocument();
  });

  it('should redirect to "/login" when unauthorized user navigates to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        }
      })
    );

    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByRole('heading', { level: 1, name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toHaveAttribute('type', 'email');
    expect(screen.getByPlaceholderText(/password/i)).toHaveAttribute('type', 'password');
    expect(screen.queryByRole('heading', { level: 1, name: /Saved listing/i })).not.toBeInTheDocument();
  });

  it('should render "Offer" when user navigates to "/offer/:id"', () => {
    const offer = makeFakeDetailedOffer();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        CURRENT_OFFER: {
          currentOffer: offer,
          nearbyOffers: [],
          comments: [],
          isCurrentOfferLoading: false,
          isCurrentOfferNotFound: false,
        }
      })
    );

    mockHistory.push(`${AppRoute.Offer}/${offer.id}`);

    render(withStoreComponent);

    expect(screen.getByRole('heading', { level: 1, name: offer.title })).toBeInTheDocument();
    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /What's inside/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Meet the host/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Other places in the neighbourhood/i })).toBeInTheDocument();
  });

  it('should render "NotFound" when user navigates to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    mockHistory.push('/non-existent-route');

    render(withStoreComponent);

    expect(screen.getByRole('heading', { level: 1, name: /404/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /We are sorry, Page not found!/i })).toBeInTheDocument();
    expect(screen.getByText(/Back To Homepage/i)).toBeInTheDocument();
  });
});

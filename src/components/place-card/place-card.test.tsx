import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppRoute, AuthorizationStatus } from '../../utils/const';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import type { Offer } from '../../types/offer';
import { State } from '../../types/state';
import { withHistory, withStore } from '../../utils/mock-component';
import PlaceCard from './place-card';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

vi.mock('../../store/api-actions', () => ({
  toggleFavoriteOfferAction: vi.fn(({ id, isFavorite }: { id: number; isFavorite: boolean }) => ({
    type: 'TOGGLE_FAVORITE',
    payload: { id, isFavorite },
  })),
}));

vi.mock('../../store/user-process/user-process.selectors', () => ({
  getAuthorizationStatus: vi.fn(() => AuthorizationStatus.NoAuth),
}));

vi.mock('../../store/actions', () => ({
  redirectToRoute: vi.fn(() => ({
    type: 'REDIRECT',
    payload: AppRoute.Login,
  })),
}));

describe('Component: PlaceCard', () => {
  const fakeOffer = makeFakeOffer();
  const initialState = makeFakeStore();
  const store: Partial<State> = {
    ...initialState,
    USER: {
      ...initialState.USER,
      authorizationStatus: AuthorizationStatus.NoAuth,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { withStoreComponent } = withStore(
      <PlaceCard cardInfo={fakeOffer} />,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('place-card')).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${fakeOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
  });

  it('displays premium mark when offer is premium', () => {
    const premiumOffer: Offer = { ...fakeOffer, isPremium: true };
    const { withStoreComponent } = withStore(
      <PlaceCard cardInfo={premiumOffer} />,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('does not display premium mark for regular offer', () => {
    const regularOffer: Offer = { ...fakeOffer, isPremium: false };
    const { withStoreComponent } = withStore(
      <PlaceCard cardInfo={regularOffer} />,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('shows active bookmark button when offer is favorite', () => {
    const favoriteOffer: Offer = { ...fakeOffer, isFavorite: true };
    const currentStore: Partial<State> = {
      ...initialState,
      USER: {
        ...initialState.USER,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    };

    const { withStoreComponent } = withStore(
      <PlaceCard cardInfo={favoriteOffer} />,
      currentStore
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('bookmark-button')).toHaveClass('place-card__bookmark-button--active');
  });

  it('should dispatch redirectToRoute when unauthorized user clicks bookmark', async () => {
    const { withStoreComponent } = withStore(
      <PlaceCard cardInfo={fakeOffer} />,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.click(screen.getByTestId('bookmark-button'));

    const { redirectToRoute } = await import('../../store/actions');
    expect(redirectToRoute).toHaveBeenCalledTimes(1);
    expect(redirectToRoute).toHaveBeenCalledWith(AppRoute.Login);
  });

  it('should dispatch toggleFavoriteOfferAction when authorized user clicks bookmark', async () => {
    vi.mocked(getAuthorizationStatus).mockReturnValue(AuthorizationStatus.Auth);

    const { withStoreComponent } = withStore(
      <PlaceCard cardInfo={fakeOffer} />,
      {
        ...initialState,
        USER: {
          ...initialState.USER,
          authorizationStatus: AuthorizationStatus.Auth,
        }
      }
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.click(screen.getByTestId('bookmark-button'));

    const { toggleFavoriteOfferAction } = await import('../../store/api-actions');
    expect(toggleFavoriteOfferAction).toHaveBeenCalledWith({
      id: fakeOffer.id,
      isFavorite: !fakeOffer.isFavorite,
    });
  });

  it('calls mouse event handlers when provided', async () => {
    const handleMouseEnter = vi.fn();
    const handleMouseLeave = vi.fn();

    const { withStoreComponent } = withStore(
      <PlaceCard
        cardInfo={fakeOffer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const card = screen.getByTestId('place-card');
    await userEvent.hover(card);
    expect(handleMouseEnter).toHaveBeenCalledWith(fakeOffer.id);

    await userEvent.unhover(card);
    expect(handleMouseLeave).toHaveBeenCalled();
  });

  it('renders different image sizes for favorites card type', () => {
    const { withStoreComponent } = withStore(
      <PlaceCard cardInfo={fakeOffer} cardType="favorites"/>,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const image = screen.getByRole('img', { name: fakeOffer.title });
    expect(image).toHaveAttribute('width', '150');
    expect(image).toHaveAttribute('height', '110');
  });

  it('should display correct rating percentage', () => {
    const offerWithRating = { ...fakeOffer, rating: 3 };
    const { withStoreComponent } = withStore(
      <PlaceCard cardInfo={offerWithRating} />,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const ratingElement = screen.getByTestId('rating-stars');
    expect(ratingElement.firstChild).toHaveStyle(
      `width: ${(offerWithRating.rating / 5) * 100}%`
    );
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeDetailedOffer, makeFakeStore } from '../../utils/mocks';
import { AuthorizationStatus, AppRoute } from '../../utils/const';
import OfferDetails from './offer-details';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { State } from '../../types/state';

vi.mock('../../store/api-actions', () => ({
  toggleFavoriteOfferAction: vi.fn(({ id, isFavorite }: { id: number; isFavorite: boolean }) => ({
    type: 'TOGGLE_FAVORITE',
    payload: { id, isFavorite },
  })),
}));

vi.mock('../../store/user-process/user-process.selectors', () => ({
  getAuthorizationStatus: vi.fn(() => AuthorizationStatus.Auth),
}));

vi.mock('../../store/actions', () => ({
  redirectToRoute: vi.fn(() => ({
    type: 'REDIRECT',
    payload: AppRoute.Login,
  })),
}));

describe('Component: OfferDetails', () => {
  const mockOffer = makeFakeDetailedOffer();

  const initialState = makeFakeStore();
  const store: Partial<State> = {
    ...initialState,
    USER: {
      ...initialState.USER,
      authorizationStatus: AuthorizationStatus.Auth,
    },
  };

  const renderOfferDetails = (offer = mockOffer, authStatus = AuthorizationStatus.Auth) => {
    vi.mocked(getAuthorizationStatus).mockReturnValue(authStatus);
    const { withStoreComponent } = withStore(
      <OfferDetails offer={offer} />,
      store
    );
    return withHistory(withStoreComponent);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all offer details correctly', () => {
    render(renderOfferDetails());

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`${mockOffer.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockOffer.bedrooms} Bedroom`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Max ${mockOffer.maxAdults} adult`))).toBeInTheDocument();

    mockOffer.goods.forEach((good) => {
      expect(screen.getByText(good)).toBeInTheDocument();
    });
  });

  it('should show premium mark when offer is premium', () => {
    const premiumOffer = { ...mockOffer, isPremium: true };
    render(renderOfferDetails(premiumOffer));

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not show premium mark when offer is not premium', () => {
    const regularOffer = { ...mockOffer, isPremium: false };
    render(renderOfferDetails(regularOffer));

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render active bookmark button when offer is favorite', () => {
    const favoriteOffer = { ...mockOffer, isFavorite: true };
    render(renderOfferDetails(favoriteOffer));

    expect(screen.getByTestId('bookmark-button')).toHaveClass('offer__bookmark-button--active');
    expect(screen.getByText(/In bookmarks/)).toBeInTheDocument();
  });

  it('should render inactive bookmark button when offer is not favorite', () => {
    const notFavoriteOffer = { ...mockOffer, isFavorite: false };
    render(renderOfferDetails(notFavoriteOffer));

    expect(screen.getByTestId('bookmark-button')).not.toHaveClass('offer__bookmark-button--active');
    expect(screen.getByText(/To bookmarks/)).toBeInTheDocument();
  });

  it('should dispatch toggleFavoriteOfferAction when authorized user clicks bookmark', async () => {
    render(renderOfferDetails());
    await userEvent.click(screen.getByTestId('bookmark-button'));

    const { toggleFavoriteOfferAction } = await import('../../store/api-actions');
    expect(toggleFavoriteOfferAction).toHaveBeenCalledWith({
      id: mockOffer.id,
      isFavorite: !mockOffer.isFavorite,
    });
  });

  it('should dispatch redirectToRoute when unauthorized user clicks bookmark', async () => {
    vi.mocked(getAuthorizationStatus).mockReturnValue(AuthorizationStatus.NoAuth);

    const { withStoreComponent } = withStore(
      <OfferDetails offer={mockOffer} />,
      {
        ...initialState,
        USER: {
          ...initialState.USER,
          authorizationStatus: AuthorizationStatus.NoAuth,
        }
      }
    );
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    await userEvent.click(screen.getByTestId('bookmark-button'));

    const { redirectToRoute } = await import('../../store/actions');
    expect(redirectToRoute).toHaveBeenCalledTimes(1);
    expect(redirectToRoute).toHaveBeenCalledWith(AppRoute.Login);
  });

  it('should display correct rating percentage', () => {
    const offerWithRating = { ...mockOffer, rating: 3 };
    render(renderOfferDetails(offerWithRating));

    const ratingElement = screen.getByTestId('rating-stars');
    expect(ratingElement.firstChild).toHaveStyle(
      `width: ${(offerWithRating.rating / 5) * 100}%`
    );
  });

  it('should pluralize bedrooms and adults when count > 1', () => {
    const pluralOffer = {
      ...mockOffer,
      bedrooms: 2,
      maxAdults: 3,
    };
    render(renderOfferDetails(pluralOffer));

    expect(screen.getByText(/2 Bedrooms/)).toBeInTheDocument();
    expect(screen.getByText(/Max 3 adults/)).toBeInTheDocument();
  });

  it('should not pluralize bedrooms and adults when count = 1', () => {
    const singularOffer = {
      ...mockOffer,
      bedrooms: 1,
      maxAdults: 1,
    };
    render(renderOfferDetails(singularOffer));

    expect(screen.getByText(/1 Bedroom/)).toBeInTheDocument();
    expect(screen.getByText(/Max 1 adult/)).toBeInTheDocument();
  });
});

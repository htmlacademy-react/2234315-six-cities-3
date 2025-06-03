import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useParams } from 'react-router-dom';
import Offer from './offer';
import { AuthorizationStatus, CITIES } from '../../utils/const';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeOffer, makeFakeComment, makeFakeStore, makeFakeDetailedOffer } from '../../utils/mocks';
import { fetchCurrentOfferAction, fetchCommentsAction, fetchNearbyOffersAction } from '../../store/api-actions';
import { City, DetailedOffer, Offers } from '../../types/offer';
import { Reviews } from '../../types/review';
import { getComments, getCurrentOffer, getCurrentOfferLoadingStatus, getCurrentOfferNotFoundStatus, getNearbyOffers } from '../../store/current-offer-process/current-offer-process.selectors';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { PayloadAction } from '@reduxjs/toolkit';

type MockSetActiveCityAction = PayloadAction<City> & {
  type: 'MOCK_SET_ACTIVE_CITY';
};

const mockSetActiveCity = vi.fn((city: City): MockSetActiveCityAction => ({
  type: 'MOCK_SET_ACTIVE_CITY',
  payload: city,
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useParams: vi.fn().mockReturnValue({ id: '1' }),
  };
});

vi.mock('../../components/layout/layout', () => ({
  default: vi.fn(({ children, pageTitle }: { pageTitle: string; children: JSX.Element }) => (
    <div title={pageTitle}>{children}</div>
  )),
}));

vi.mock('../../components/loader/loader', () => ({
  default: vi.fn(() => <div data-testid="loader">Loading...</div>),
}));

vi.mock('../../components/offer-gallery/offer-gallery', () => ({
  default: vi.fn(({ offer }: { offer: DetailedOffer }) => <div data-testid="gallery">{offer.title} gallery</div>),
}));

vi.mock('../../components/offer-details/offer-details', () => ({
  default: vi.fn(({ offer }: { offer: DetailedOffer }) => <div data-testid="details">{offer.title} details</div>),
}));

vi.mock('../../components/offer-host/offer-host', () => ({
  default: vi.fn(({ offer }: { offer: DetailedOffer }) => <div data-testid="host">{offer.host.name} host</div>),
}));

vi.mock('../../components/reviews-list/reviews-list', () => ({
  default: vi.fn(({ reviews }: { reviews: Reviews }) => (
    <div data-testid="reviews">
      {reviews.length} reviews
    </div>
  )),
}));

vi.mock('../../components/reviews-form/reviews-form', () => ({
  default: vi.fn(() => <div data-testid="reviews-form">Reviews Form</div>),
}));

vi.mock('../../components/map/map', () => ({
  default: vi.fn(({ points }: { points: Offers }) => <div data-testid="map">{points.length} points</div>),
}));

vi.mock('../../components/places-list/places-list', () => ({
  default: vi.fn(({ places }: { places: Offers }) => (
    <div data-testid="nearby-places">
      {places.length} nearby places
    </div>
  )),
}));

vi.mock('../../store/api-actions', () => ({
  fetchCurrentOfferAction: vi.fn(() => ({ type: 'offer/fetchCurrentOffer' })),
  fetchCommentsAction: vi.fn(() => ({ type: 'offer/fetchComments' })),
  fetchNearbyOffersAction: vi.fn(() => ({ type: 'offer/fetchNearbyOffers' })),
}));

vi.mock('../../store/user-process/user-process.selectors', () => ({
  getAuthorizationStatus: vi.fn(),
}));

vi.mock('../../store/current-offer-process/current-offer-process.selectors', () => ({
  getCurrentOffer: vi.fn(),
  getComments: vi.fn(),
  getNearbyOffers: vi.fn(),
  getCurrentOfferLoadingStatus: vi.fn(),
  getCurrentOfferNotFoundStatus: vi.fn(),
}));

vi.mock('../../store/app-process/app-process.slice', () => ({
  setActiveCity: (city: City) => mockSetActiveCity(city),
}));

describe('Component: Offer', () => {
  const mockOffer = makeFakeDetailedOffer();
  const mockComments = [makeFakeComment(), makeFakeComment()];
  const mockNearbyOffers = [makeFakeOffer(), makeFakeOffer()];
  const mockStore = makeFakeStore();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useParams).mockReturnValue({ id: '1' });
  });

  const renderOffer = () => {
    const { withStoreComponent } = withStore(<Offer />, mockStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
  };

  it('should render loader when offer is loading', () => {
    vi.mocked(getCurrentOfferLoadingStatus).mockReturnValue(true);
    vi.mocked(getCurrentOffer).mockReturnValue(null);

    renderOffer();

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render not found when offer is not found', () => {
    vi.mocked(getCurrentOfferLoadingStatus).mockReturnValue(false);
    vi.mocked(getCurrentOfferNotFoundStatus).mockReturnValue(true);
    vi.mocked(getCurrentOffer).mockReturnValue(null);

    renderOffer();

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('should render offer details when loaded', () => {
    vi.mocked(getCurrentOfferLoadingStatus).mockReturnValue(false);
    vi.mocked(getCurrentOfferNotFoundStatus).mockReturnValue(false);
    vi.mocked(getCurrentOffer).mockReturnValue(mockOffer);
    vi.mocked(getComments).mockReturnValue(mockComments);
    vi.mocked(getNearbyOffers).mockReturnValue(mockNearbyOffers);
    vi.mocked(getAuthorizationStatus).mockReturnValue(AuthorizationStatus.Auth);

    renderOffer();

    expect(screen.getByTestId('gallery')).toBeInTheDocument();
    expect(screen.getByTestId('details')).toBeInTheDocument();
    expect(screen.getByTestId('host')).toBeInTheDocument();
    expect(screen.getByTestId('reviews')).toBeInTheDocument();
    expect(screen.getByTestId('reviews-form')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('nearby-places')).toBeInTheDocument();
    expect(screen.getByText(`${mockComments.length} reviews`)).toBeInTheDocument();
    expect(screen.getByText(`${mockNearbyOffers.length} nearby places`)).toBeInTheDocument();
  });

  it('should not render reviews form when not authorized', () => {
    vi.mocked(getCurrentOfferLoadingStatus).mockReturnValue(false);
    vi.mocked(getCurrentOfferNotFoundStatus).mockReturnValue(false);
    vi.mocked(getCurrentOffer).mockReturnValue(mockOffer);
    vi.mocked(getAuthorizationStatus).mockReturnValue(AuthorizationStatus.NoAuth);

    renderOffer();

    expect(screen.queryByTestId('reviews-form')).not.toBeInTheDocument();
  });

  it('should dispatch fetch actions on mount', () => {
    vi.mocked(getCurrentOfferLoadingStatus).mockReturnValue(false);
    vi.mocked(getCurrentOfferNotFoundStatus).mockReturnValue(false);
    vi.mocked(getCurrentOffer).mockReturnValue(mockOffer);

    renderOffer();

    expect(fetchCurrentOfferAction).toHaveBeenCalledWith('1');
    expect(fetchCommentsAction).toHaveBeenCalledWith('1');
    expect(fetchNearbyOffersAction).toHaveBeenCalledWith('1');
  });

  it('should set active city when offer is loaded', () => {
    const cityOffer = { ...mockOffer, city: CITIES[0] };
    vi.mocked(getCurrentOfferLoadingStatus).mockReturnValue(false);
    vi.mocked(getCurrentOfferNotFoundStatus).mockReturnValue(false);
    vi.mocked(getCurrentOffer).mockReturnValue(cityOffer);

    renderOffer();

    expect(mockSetActiveCity).toHaveBeenCalledWith(cityOffer.city);
  });
});

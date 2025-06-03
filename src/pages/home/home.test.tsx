import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from './home';
import { AuthorizationStatus, CITIES, SortType } from '../../utils/const';
import { withHistory, withStore } from '../../utils/mock-component';
import { Offers } from '../../types/offer';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { getCity, getOffers, getOffersLoadingStatus } from '../../store/app-process/app-process.selectors';
import { makeFakeOffer } from '../../utils/mocks';

vi.mock('../../components/layout/layout', () => ({
  default: vi.fn(({ children, pageTitle, className }: { pageTitle: string; className: string; children: JSX.Element }) => (
    <div className={className} data-testid="layout" title={pageTitle}>
      {children}
    </div>
  )),
}));

vi.mock('../../components/loader/loader', () => ({
  default: vi.fn(() => <div data-testid="loader">Loading...</div>),
}));

vi.mock('../../components/cities-list/cities-list', () => ({
  default: vi.fn(() => <div data-testid="cities-list">Cities List</div>),
}));

vi.mock('../../components/main-empty/main-empty', () => ({
  default: vi.fn(({ city }) => <div data-testid="main-empty">No places in {city}</div>),
}));

vi.mock('../../components/places-sorting/places-sorting', () => ({
  default: vi.fn(({ onChangeSortType }: { onChangeSortType: (type: SortType) => void }) => (
    <div data-testid="places-sorting">
      <button onClick={() => onChangeSortType(SortType.PriceLowToHigh)}>Sort</button>
    </div>
  )),
}));

vi.mock('../../components/places-list/places-list', () => ({
  default: vi.fn(({ places, onCardHover }: { places: Offers; onCardHover: (id?: string) => void }) => (
    <div data-testid="places-list">
      {places.map((place) => (
        <div
          key={place.id}
          onMouseEnter={() => onCardHover(place.id)}
          onMouseLeave={() => onCardHover(undefined)}
        >
          {place.title}
        </div>
      ))}
    </div>
  )),
}));

vi.mock('../../components/map/map', () => ({
  default: vi.fn(({ points, selectedPointId }: { points: Offers; selectedPointId: string }) => (
    <div data-testid="map">
      {points.length} points, selected: {selectedPointId || 'none'}
    </div>
  )),
}));

vi.mock('../../store/user-process/user-process.selectors', () => ({
  getAuthorizationStatus: vi.fn(),
}));

vi.mock('../../store/app-process/app-process.selectors', () => ({
  getCity: vi.fn(),
  getOffers: vi.fn(),
  getOffersLoadingStatus: vi.fn(),
}));

describe('Component: Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderHome = () => {
    const { withStoreComponent } = withStore(<Home />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
  };

  it('should render loader when authorization status is unknown or offers are loading', () => {
    const mockCity = CITIES[1];
    vi.mocked(getAuthorizationStatus).mockReturnValue(AuthorizationStatus.Unknown);
    vi.mocked(getOffersLoadingStatus).mockReturnValue(true);
    vi.mocked(getOffers).mockReturnValue([makeFakeOffer(),makeFakeOffer()]);
    vi.mocked(getCity).mockReturnValue(mockCity);

    renderHome();

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByTestId('layout')).toHaveClass('page--gray');
    expect(screen.getByTestId('layout')).toHaveClass('page--main');
  });

  it('should render empty state when no offers for current city', () => {
    const mockCity = CITIES[1];
    vi.mocked(getAuthorizationStatus).mockReturnValue(AuthorizationStatus.Auth);
    vi.mocked(getOffersLoadingStatus).mockReturnValue(false);
    vi.mocked(getCity).mockReturnValue(mockCity);
    vi.mocked(getOffers).mockReturnValue([]);

    renderHome();

    expect(screen.getByTestId('main-empty')).toBeInTheDocument();
    expect(screen.getByTestId('main-empty')).toHaveTextContent(`No places in ${mockCity.name}`);
    expect(screen.getByTestId('layout')).toHaveClass('page--gray');
    expect(screen.getByTestId('layout')).toHaveClass('page--main');
  });

  it('should render offers list and map when offers exist', () => {
    const mockCity = CITIES[1];
    const mockOffers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
    mockOffers.forEach((offer) => {
      offer.city.name = mockCity.name;
    });

    vi.mocked(getAuthorizationStatus).mockReturnValue(AuthorizationStatus.Auth);
    vi.mocked(getOffersLoadingStatus).mockReturnValue(false);
    vi.mocked(getCity).mockReturnValue(mockCity);
    vi.mocked(getOffers).mockReturnValue(mockOffers);

    renderHome();

    expect(screen.getByTestId('cities-list')).toBeInTheDocument();
    expect(screen.getByTestId('places-sorting')).toBeInTheDocument();
    expect(screen.getByTestId('places-list')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByText(`${mockOffers.length} places to stay in ${mockCity.name}`)).toBeInTheDocument();
  });

  it('should change sort type when sorting is clicked', async () => {
    const mockCity = CITIES[2];
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    mockOffers.forEach((offer) => {
      offer.city.name = mockCity.name;
    });

    vi.mocked(getAuthorizationStatus).mockReturnValue(AuthorizationStatus.Auth);
    vi.mocked(getOffersLoadingStatus).mockReturnValue(false);
    vi.mocked(getCity).mockReturnValue(mockCity);
    vi.mocked(getOffers).mockReturnValue(mockOffers);

    renderHome();

    const sortButton = screen.getByRole('button', { name: 'Sort' });
    await userEvent.click(sortButton);

    expect(screen.getByTestId('places-list')).toBeInTheDocument();
  });

  it('should highlight offer card on hover', async () => {
    const mockCity = CITIES[3];
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    mockOffers.forEach((offer) => {
      offer.city.name = mockCity.name;
    });

    vi.mocked(getAuthorizationStatus).mockReturnValue(AuthorizationStatus.Auth);
    vi.mocked(getOffersLoadingStatus).mockReturnValue(false);
    vi.mocked(getCity).mockReturnValue(mockCity);
    vi.mocked(getOffers).mockReturnValue(mockOffers);

    renderHome();

    const offerCards = screen.getAllByText(mockOffers[0].title);
    await userEvent.hover(offerCards[0]);

    expect(screen.getByTestId('map')).toHaveTextContent(`selected: ${mockOffers[0].id}`);
  });
});

import { render, screen } from '@testing-library/react';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { Offers } from '../../types/offer';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../utils/const';
import FavoriteLocation from './favorite-location';

describe('Component: FavoriteLocation', () => {
  const mockCity = 'Paris';

  const initialState: Partial<State> = makeFakeStore();
  const store: Partial<State> = {
    ...initialState,
    USER: {
      ...initialState.USER!,
      authorizationStatus: AuthorizationStatus.Auth,
    },
  };

  const mockFavoritePlaces: Offers = [
    { ...makeFakeOffer(), city: { ...makeFakeOffer().city, name: mockCity } },
    { ...makeFakeOffer(), city: { ...makeFakeOffer().city, name: mockCity } },
  ];

  it('should render correctly with city name and favorite places', () => {
    const { withStoreComponent } = withStore(
      <FavoriteLocation city={mockCity} favoritePlaces={mockFavoritePlaces} />,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockCity)).toBeInTheDocument();
    expect(screen.getAllByTestId('place-card')).toHaveLength(mockFavoritePlaces.length);
  });

  it('should pass correct props to PlacesList component', () => {
    const { withStoreComponent } = withStore(
      <FavoriteLocation city={mockCity} favoritePlaces={mockFavoritePlaces} />,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const placesList = screen.getByTestId('places-list');
    expect(placesList).toBeInTheDocument();
    expect(placesList).toHaveClass('favorites__places');

    const placeCards = screen.getAllByTestId('place-card');
    expect(placeCards.length).toBe(mockFavoritePlaces.length);
  });

  it('should apply correct CSS classes to container elements', () => {
    const { withStoreComponent } = withStore(
      <FavoriteLocation city={mockCity} favoritePlaces={mockFavoritePlaces} />,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('favorite-location')).toHaveClass('favorites__locations-items');
    expect(screen.getByTestId('locations-container')).toHaveClass('favorites__locations', 'locations', 'locations--current');
  });
});

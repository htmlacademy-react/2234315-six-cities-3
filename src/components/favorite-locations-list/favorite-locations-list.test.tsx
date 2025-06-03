import { render, screen } from '@testing-library/react';
import FavoriteLocationsList from './favorite-locations-list';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { Offers } from '../../types/offer';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../utils/const';

describe('Component: FavoriteLocationsList', () => {
  const initialState: Partial<State> = makeFakeStore();
  const store: Partial<State> = {
    ...initialState,
    USER: {
      ...initialState.USER!,
      authorizationStatus: AuthorizationStatus.Auth,
    },
  };

  const mockOffers: Offers = [
    { ...makeFakeOffer(), city: { ...makeFakeOffer().city, name: 'Paris' } },
    { ...makeFakeOffer(), city: { ...makeFakeOffer().city, name: 'Paris' } },
    { ...makeFakeOffer(), city: { ...makeFakeOffer().city, name: 'Cologne' } },
    { ...makeFakeOffer(), city: { ...makeFakeOffer().city, name: 'Brussels' } },
    { ...makeFakeOffer(), city: { ...makeFakeOffer().city, name: 'Brussels' } },
  ];

  it('should render correctly with grouped offers by city', () => {
    const { withStoreComponent } = withStore(
      <FavoriteLocationsList offers={mockOffers} />,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();

    const locationItems = screen.getAllByTestId('favorite-location');

    const parisBlock = locationItems.find((el) => el.textContent?.includes('Paris'));
    const parisCards = parisBlock?.querySelectorAll('[data-testid="place-card"]').length || 0;
    expect(parisCards).toBe(2);

    const brusselsBlock = locationItems.find((el) => el.textContent?.includes('Brussels'));
    const brusselsCards = brusselsBlock?.querySelectorAll('[data-testid="place-card"]').length || 0;
    expect(brusselsCards).toBe(2);
  });

  it('should group offers correctly by city', () => {
    const { withStoreComponent } = withStore(
      <FavoriteLocationsList offers={mockOffers} />,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const locationItems = screen.getAllByTestId('favorite-location');
    expect(locationItems).toHaveLength(3);

    const parisBlock = locationItems.find((el) => el.textContent?.includes('Paris'));
    expect(parisBlock?.querySelectorAll('[data-testid="place-card"]')).toHaveLength(2);
  });

  it('should pass correct props to FavoriteLocation components', () => {
    const { withStoreComponent } = withStore(
      <FavoriteLocationsList offers={mockOffers} />,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const cologneBlock = screen.getByText('Cologne').closest('[data-testid="favorite-location"]');
    expect(cologneBlock).toBeInTheDocument();
    expect(cologneBlock?.querySelectorAll('[data-testid="place-card"]')).toHaveLength(1);
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { Offers } from '../../types/offer';
import { withHistory, withStore } from '../../utils/mock-component';
import PlacesList from './places-list';

vi.mock('../place-card/place-card', () => ({
  default: vi.fn((props: { cardInfo: { title: string } }) => (
    <div data-testid="place-card-mock" {...props}>
      Mock PlaceCard: {props.cardInfo.title}
    </div>
  )),
}));

describe('Component: PlacesList', () => {
  const fakeOffers: Offers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
  const initialState = makeFakeStore();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { withStoreComponent } = withStore(
      <PlacesList places={fakeOffers} />,
      initialState
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getAllByTestId('place-card-mock')).toHaveLength(fakeOffers.length);
  });

  it('passes correct cardType to all PlaceCard components', () => {
    const testCardType = 'cities';
    const { withStoreComponent } = withStore(
      <PlacesList places={fakeOffers} cardType={testCardType} />,
      initialState
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const placeCards = screen.getAllByTestId('place-card-mock');
    placeCards.forEach((card) => {
      expect(card).toHaveAttribute('cardType', testCardType);
    });
  });

  it('calls onCardHover when mouse enters and leaves PlaceCard', async () => {
    const handleCardHover = vi.fn();
    const { withStoreComponent } = withStore(
      <PlacesList places={fakeOffers} onCardHover={handleCardHover} />,
      initialState
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const placeCards = screen.getAllByTestId('place-card-mock');
    await userEvent.hover(placeCards[0]);
    expect(handleCardHover).toHaveBeenCalledWith(fakeOffers[0].id);

    await userEvent.unhover(placeCards[0]);
    expect(handleCardHover).toHaveBeenCalledWith(undefined);
  });

  it('passes correct cardInfo to each PlaceCard', () => {
    const { withStoreComponent } = withStore(
      <PlacesList places={fakeOffers} />,
      initialState
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    fakeOffers.forEach((offer) => {
      expect(screen.getByText(`Mock PlaceCard: ${offer.title}`)).toBeInTheDocument();
    });
  });

  it('renders nothing when places array is empty', () => {
    const { withStoreComponent } = withStore(
      <PlacesList places={[]} />,
      initialState
    );
    const preparedComponent = withHistory(withStoreComponent);

    const { container } = render(preparedComponent);

    expect(container).toBeEmptyDOMElement();
  });
});

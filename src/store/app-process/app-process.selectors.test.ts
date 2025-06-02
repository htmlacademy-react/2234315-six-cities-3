import { NameSpace } from '../../utils/const';
import { makeFakeOffer, randomCity } from '../../utils/mocks';
import { getCity, getFavoriteOffers, getOffers, getOffersLoadingStatus } from './app-process.selectors';

describe('AppProcess selectors', () => {
  const mockOffer = makeFakeOffer();
  const mockFavoriteOffer = makeFakeOffer();

  const state = {
    [NameSpace.App]: {
      city: randomCity,
      offers: [mockOffer],
      favoriteOffers: [mockFavoriteOffer],
      isOffersLoading: false,
    }
  };

  it('should return city from state', () => {
    const { city } = state[NameSpace.App];
    const result = getCity(state);

    expect(result).toEqual(city);
  });

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.App];
    const result = getOffers(state);

    expect(result).toEqual(offers);
  });

  it('should return favorite offers from state', () => {
    const { favoriteOffers } = state[NameSpace.App];
    const result = getFavoriteOffers(state);

    expect(result).toEqual(favoriteOffers);
  });

  it('should return offers loading status', () => {
    const { isOffersLoading } = state[NameSpace.App];
    const result = getOffersLoadingStatus(state);

    expect(result).toBe(isOffersLoading);
  });
});

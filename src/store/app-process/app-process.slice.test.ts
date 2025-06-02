import { CITIES } from '../../utils/const';
import { makeFakeOffer } from '../../utils/mocks';
import { fetchFavoriteOffersAction, fetchOffersAction, logoutAction, toggleFavoriteOfferAction } from '../api-actions';
import { appProcess, setActiveCity } from './app-process.slice';

describe('AppProcess Slice', () => {
  const mockOffer = makeFakeOffer();
  const mockFavoriteOffer = { ...mockOffer, isFavorite: true };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      city: CITIES[0],
      offers: [],
      favoriteOffers: [],
      isOffersLoading: false,
    };
    const result = appProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it ('should return default initial state with empty action and undefined state', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {
      city: CITIES[0],
      offers: [],
      favoriteOffers: [],
      isOffersLoading: false,
    };
    const result = appProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set active city with "setActiveCity" action', () => {
    const initialState = {
      city: CITIES[0],
      offers: [],
      favoriteOffers: [],
      isOffersLoading: false,
    };
    const expectedCity = CITIES[1];
    const result = appProcess.reducer(initialState, setActiveCity(expectedCity));

    expect(result.city).toEqual(expectedCity);
  });

  it('should set "isOffersLoading" to "true" with "fetchOffersAction.pending"', () => {
    const initialState = {
      city: CITIES[0],
      offers: [],
      favoriteOffers: [],
      isOffersLoading: false,
    };
    const result = appProcess.reducer(initialState, fetchOffersAction.pending);

    expect(result.isOffersLoading).toBe(true);
  });

  it('should set offers and "isOffersLoading" to "false" with "fetchOffersAction.fulfilled"', () => {
    const initialState = {
      city: CITIES[0],
      offers: [],
      favoriteOffers: [],
      isOffersLoading: true,
    };
    const mockOffers = [mockOffer];
    const result = appProcess.reducer(
      initialState,
      fetchOffersAction.fulfilled(mockOffers, '', undefined)
    );

    expect(result.offers).toEqual(mockOffers);
    expect(result.isOffersLoading).toBe(false);
  });

  it('should set "isOffersLoading" to "false" with "fetchOffersAction.rejected"', () => {
    const initialState = {
      city: CITIES[0],
      offers: [],
      favoriteOffers: [],
      isOffersLoading: true,
    };
    const result = appProcess.reducer(
      initialState,
      fetchOffersAction.rejected(null, '', undefined)
    );

    expect(result.isOffersLoading).toBe(false);
  });

  it('should set favorite offers and update offers with "fetchFavoriteOffersAction.fulfilled"', () => {
    const initialState = {
      city: CITIES[0],
      offers: [{ ...mockOffer, isFavorite: false }],
      favoriteOffers: [],
      isOffersLoading: false,
    };
    const mockFavorites = [mockFavoriteOffer];

    const result = appProcess.reducer(
      initialState,
      fetchFavoriteOffersAction.fulfilled(mockFavorites, '', undefined)
    );

    expect(result.favoriteOffers).toEqual(mockFavorites);
    expect(result.offers[0].isFavorite).toBe(true);
  });

  it('should update offer and favorite offers with "toggleFavoriteOfferAction.fulfilled" (add to favorite)', () => {
    const initialState = {
      city: CITIES[0],
      offers: [{ ...mockOffer, isFavorite: false }],
      favoriteOffers: [],
      isOffersLoading: false,
    };

    const result = appProcess.reducer(
      initialState,
      toggleFavoriteOfferAction.fulfilled(mockFavoriteOffer, '', { id: mockFavoriteOffer.id, isFavorite: true })
    );

    expect(result.offers[0].isFavorite).toBe(true);
    expect(result.favoriteOffers).toEqual([mockFavoriteOffer]);
  });

  it('should update offer and favorite offers with "toggleFavoriteOfferAction.fulfilled" (remove from favorite)', () => {
    const initialState = {
      city: CITIES[0],
      offers: [{ ...mockFavoriteOffer, isFavorite: true }],
      favoriteOffers: [mockFavoriteOffer],
      isOffersLoading: false,
    };

    const result = appProcess.reducer(
      initialState,
      toggleFavoriteOfferAction.fulfilled({ ...mockOffer, isFavorite: false }, '', { id: mockOffer.id, isFavorite: false })
    );

    expect(result.offers[0].isFavorite).toBe(false);
    expect(result.favoriteOffers).toEqual([]);
  });

  it('should clear favorite offers and reset offers favorite status with "logoutAction.fulfilled"', () => {
    const initialState = {
      city: CITIES[0],
      offers: [{ ...mockFavoriteOffer, isFavorite: true }],
      favoriteOffers: [mockFavoriteOffer],
      isOffersLoading: false,
    };

    const result = appProcess.reducer(
      initialState,
      logoutAction.fulfilled
    );

    expect(result.favoriteOffers).toEqual([]);
    expect(result.offers[0].isFavorite).toBe(false);
  });
});

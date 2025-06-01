import { City, Offers } from '../../types/offer';
import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';

export const getCity = (state: Pick<State, NameSpace.App>): City => state[NameSpace.App].city;
export const getOffers = (state: Pick<State, NameSpace.App>): Offers => state[NameSpace.App].offers;
export const getFavoriteOffers = (state: Pick<State, NameSpace.App>): Offers => state[NameSpace.App].favoriteOffers;
export const getOffersLoadingStatus = (state: Pick<State, NameSpace.App>): boolean => state[NameSpace.App].isOffersLoading;

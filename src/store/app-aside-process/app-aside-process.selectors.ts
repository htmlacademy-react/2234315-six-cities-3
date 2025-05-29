import { City, Offers } from '../../types/offer';
import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';

export const getCity = (state: Pick<State, NameSpace.AppAside>): City => state[NameSpace.AppAside].city;
export const getOffers = (state: Pick<State, NameSpace.AppAside>): Offers => state[NameSpace.AppAside].offers;
export const getFavoriteOffers = (state: Pick<State, NameSpace.AppAside>): Offers => state[NameSpace.AppAside].favoriteOffers;
export const getOffersLoadingStatus = (state: Pick<State, NameSpace.AppAside>): boolean => state[NameSpace.AppAside].isOffersLoading;

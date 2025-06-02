import {store} from '../store/index';
import { AuthorizationStatus } from '../utils/const';
import { City, DetailedOffer, Offers } from './offer';
import { Reviews } from './review';
import { UserData } from './user-data';

export type AppProcess = {
  city: City;
  offers: Offers;
  isOffersLoading: boolean;
  favoriteOffers: Offers;
};

export type CurrentOfferProcess = {
  currentOffer: DetailedOffer | null;
  nearbyOffers: Offers;
  comments: Reviews;
  isCurrentOfferLoading: boolean;
  isCurrentOfferNotFound: boolean;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { createAction } from '@reduxjs/toolkit';

import { City, DetailedOffer, Offers } from '../types/offer';
import { UserData } from '../types/user-data';
import { Review, Reviews } from '../types/review';
import { AppRoute, AuthorizationStatus } from '../utils/const';

export const setActiveCity = createAction<City>('city/setActiveCity');
export const setOffers = createAction<Offers>('offers/setOffers');
export const setOffersLoadingStatus = createAction<boolean>('offers/setOffersLoadingStatus');

export const setCurrentOffer = createAction<DetailedOffer>('offer/setCurrentOffer');
export const setCurrentOfferLoadingStatus = createAction<boolean>('offer/setCurrentOfferLoadingStatus');
export const setCurrentOfferNotFound = createAction<boolean>('offer/setCurrentOfferNotFound');
export const setNearbyOffers = createAction<Offers>('offer/setNearbyOffers');
export const setNearbyOffersLoadingStatus = createAction<boolean>('offer/setNearbyOffersLoadingStatus');
export const resetCurrentOfferState = createAction('offer/resetCurrentOfferState');

export const setComments = createAction<Reviews>('comments/setComments');
export const setCommentsLoadingStatus = createAction<boolean>('comments/setCommentsLoadingStatus');
export const addComment = createAction<Review>('comments/addComment');


export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setUserData = createAction<UserData | null>('user/setUserData');

import { createAction } from '@reduxjs/toolkit';

import { City, DetailedOffer, Offer, Offers } from '../types/offer';
import { UserData } from '../types/user-data';
import { Review, Reviews } from '../types/review';
import { AppRoute, AuthorizationStatus } from '../utils/const';

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const setActiveCity = createAction<City>('city/setActiveCity');

export const setOffers = createAction<Offers>('offers/setOffers');
export const setOffersLoadingStatus = createAction<boolean>('offers/setOffersLoadingStatus');
export const setCurrentOffer = createAction<DetailedOffer>('offers/setCurrentOffer');
export const setCurrentOfferLoadingStatus = createAction<boolean>('offers/setCurrentOfferLoadingStatus');
export const setCurrentOfferNotFound = createAction<boolean>('offers/setCurrentOfferNotFound');
export const resetCurrentOfferState = createAction('offers/resetCurrentOfferState');
export const setNearbyOffers = createAction<Offers>('offers/setNearbyOffers');
export const setNearbyOffersLoadingStatus = createAction<boolean>('offers/setNearbyOffersLoadingStatus');
export const setFavoriteOffers = createAction<Offers>('offers/setFavoriteOffers');
export const changeFavoriteOffers = createAction<Offer>('offers/changeFavoriteOffers');
export const updateOffersFavoriteFlag = createAction<Offer>('offers/updateOffersFavoriteFlag');

export const setComments = createAction<Reviews>('comments/setComments');
export const setCommentsLoadingStatus = createAction<boolean>('comments/setCommentsLoadingStatus');
export const addComment = createAction<Review>('comments/addComment');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setUserData = createAction<UserData | null>('user/setUserData');

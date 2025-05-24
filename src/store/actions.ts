import { createAction } from '@reduxjs/toolkit';
import { City, Offers } from '../types/offer';
import { AppRoute, AuthorizationStatus } from '../utils/const';
import { UserData } from '../types/user-data';

export const setActiveCity = createAction<City>('city/setActiveCity');

export const loadOffers = createAction<Offers>('offers/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('offers/setOffersDataLoadingStatus');

export const setOffers = createAction<Offers>('offers/setOffers');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserData = createAction<UserData | null>('user/setUserData');

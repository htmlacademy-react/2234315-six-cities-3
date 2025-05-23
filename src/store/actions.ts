import { createAction } from '@reduxjs/toolkit';
import { City, Offers } from '../types/offer';
import { AuthorizationStatus } from '../utils/const';

export const setActiveCity = createAction<City>('city/setActiveCity');

export const loadOffers = createAction<Offers>('offers/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('offers/setOffersDataLoadingStatus');

export const setOffers = createAction<Offers>('offers/setOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

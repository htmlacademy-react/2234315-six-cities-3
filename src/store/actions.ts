import { createAction } from '@reduxjs/toolkit';
import { City, Offers } from '../types/offer';

export const setActiveCity = createAction<City>('offers/setActiveCity');
export const setOffers = createAction<Offers>('offers/setOffers');

import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offer';

export const setActiveCity = createAction<string>('city/setActiveCity');
export const setOffers = createAction<Offers>('offers/setOffers');

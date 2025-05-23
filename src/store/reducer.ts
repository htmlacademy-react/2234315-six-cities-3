import { createReducer } from '@reduxjs/toolkit';

import {
  loadOffers,
  setOffersDataLoadingStatus,
  setOffers,
  setActiveCity,
  requireAuthorization
} from './actions';

import { CITIES, AuthorizationStatus } from '../utils/const';
import { City, Offers } from '../types/offer';

type InitalState = {
  city: City;
  offers: Offers;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
}

const initialState: InitalState = {
  city: CITIES[0],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};

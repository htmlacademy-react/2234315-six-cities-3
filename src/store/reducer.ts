import { createReducer } from '@reduxjs/toolkit';

import {
  loadOffers,
  setOffersDataLoadingStatus,
  setOffers,
  setActiveCity,
  requireAuthorization,
  setUserData
} from './actions';

import { CITIES, AuthorizationStatus } from '../utils/const';
import { City, Offers } from '../types/offer';
import { UserData } from '../types/user-data';

type InitalState = {
  city: City;
  offers: Offers;
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
}

const initialState: InitalState = {
  city: CITIES[0],
  offers: [],
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});

export {reducer};

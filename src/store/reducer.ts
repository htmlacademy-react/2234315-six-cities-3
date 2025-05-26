import { createReducer } from '@reduxjs/toolkit';

import {
  setActiveCity,
  setOffers,
  setOffersLoadingStatus,
  setCurrentOffer,
  setCurrentOfferLoadingStatus,
  setCurrentOfferNotFound,
  resetCurrentOfferState,
  setNearbyOffers,
  setNearbyOffersLoadingStatus,
  setComments,
  setCommentsLoadingStatus,
  addComment,
  requireAuthorization,
  setUserData,
} from './actions';

import { City, DetailedOffer, Offers } from '../types/offer';
import { UserData } from '../types/user-data';
import { Reviews } from '../types/review';
import { CITIES, AuthorizationStatus } from '../utils/const';

type InitalState = {
  city: City;
  offers: Offers;
  isOffersLoading: boolean;
  currentOffer: DetailedOffer | null;
  isCurrentOfferLoading: boolean;
  isCurrentOfferNotFound: boolean;
  nearbyOffers: Offers;
  isNearbyOffersLoading: boolean;
  comments: Reviews;
  isCommentsLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
}

const initialState: InitalState = {
  city: CITIES[0],
  offers: [],
  isOffersLoading: false,
  currentOffer: null,
  isCurrentOfferLoading: false,
  isCurrentOfferNotFound: false,
  nearbyOffers: [],
  isNearbyOffersLoading: false,
  comments: [],
  isCommentsLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setCurrentOfferLoadingStatus, (state, action) => {
      state.isCurrentOfferLoading = action.payload;
    })
    .addCase(setCurrentOfferNotFound, (state, action) => {
      state.isCurrentOfferNotFound = action.payload;
    })
    .addCase(resetCurrentOfferState, (state) => {
      state.currentOffer = null;
      state.nearbyOffers = [];
      state.comments = [];
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setNearbyOffersLoadingStatus, (state, action) => {
      state.isNearbyOffersLoading = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setCommentsLoadingStatus, (state, action) => {
      state.isCommentsLoading = action.payload;
    })
    .addCase(addComment, (state, action) => {
      state.comments = [action.payload, ...state.comments];
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});

export {reducer};

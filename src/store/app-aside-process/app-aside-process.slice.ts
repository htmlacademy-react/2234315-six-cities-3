import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  checkAuthAction,
  fetchFavoriteOffersAction,
  fetchOffersAction,
  logoutAction,
  toggleFavoriteOfferAction
} from '../api-actions';
import { AppAsideProcess } from '../../types/state';
import { City } from '../../types/offer';
import { CITIES, NameSpace } from '../../utils/const';

const initialState: AppAsideProcess = {
  city: CITIES[0],
  offers: [],
  favoriteOffers: [],
  isOffersLoading: false,
};

export const appAsideProcess = createSlice({
  name: NameSpace.AppAside,
  initialState,
  reducers: {
    setActiveCity: (state, action: PayloadAction<City>)=> {
      state.city = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(toggleFavoriteOfferAction.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.favoriteOffers.push(action.payload);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.id);
        }

        state.offers.forEach((item) => {
          if (item.id === action.payload.id) {
            item.isFavorite = action.payload.isFavorite;
          }
        });
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.favoriteOffers = [];
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favoriteOffers = [];
      });
  }
});

export const { setActiveCity } = appAsideProcess.actions;

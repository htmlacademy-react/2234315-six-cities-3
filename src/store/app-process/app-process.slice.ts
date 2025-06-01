import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchFavoriteOffersAction,
  fetchOffersAction,
  logoutAction,
  toggleFavoriteOfferAction
} from '../api-actions';
import { AppProcess } from '../../types/state';
import { City } from '../../types/offer';
import { CITIES, NameSpace } from '../../utils/const';

const initialState: AppProcess = {
  city: CITIES[0],
  offers: [],
  favoriteOffers: [],
  isOffersLoading: false,
};

export const appProcess = createSlice({
  name: NameSpace.App,
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

        state.offers.map((offer) => {
          const favoritedOffer = action.payload.find((favoriteOffer) => favoriteOffer.id === offer.id);

          if (favoritedOffer) {
            offer.isFavorite = true;
          }
        });
      })
      .addCase(toggleFavoriteOfferAction.fulfilled, (state, action) => {
        const offerToUpdate = state.offers.find((item) => item.id === action.payload.id);

        if (offerToUpdate) {
          offerToUpdate.isFavorite = action.payload.isFavorite;
        }

        if (action.payload.isFavorite) {
          state.favoriteOffers.push(action.payload);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.id);
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favoriteOffers = [];

        state.offers.forEach((item) => {
          item.isFavorite = false;
        });
      });
  }
});

export const { setActiveCity } = appProcess.actions;

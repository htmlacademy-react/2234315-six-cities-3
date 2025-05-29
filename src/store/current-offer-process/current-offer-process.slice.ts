import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCurrentOfferAction,
  fetchCommentsAction,
  fetchNearbyOffersAction,
  sendCommentAction,
  toggleFavoriteOfferAction
} from '../api-actions';
import { CurrentOfferProcess } from '../../types/state';
import { NameSpace, OFFER_NEARBY_MAX_LENGHT } from '../../utils/const';

const initialState: CurrentOfferProcess = {
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isCurrentOfferLoading: false,
  isCurrentOfferNotFound: false,
};

export const currentOfferProcess = createSlice({
  name: NameSpace.CurrentOffer,
  initialState,
  reducers: {
    resetCurrentOfferState: (state)=> {
      state.currentOffer = null;
      state.nearbyOffers = [];
      state.comments = [];
    }
  },
  extraReducers (builder){
    builder
      .addCase(fetchCurrentOfferAction.pending, (state)=> {
        state.isCurrentOfferLoading = true;
        state.isCurrentOfferNotFound = false;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action)=> {
        state.currentOffer = action.payload;
        state.isCurrentOfferLoading = false;
        state.isCurrentOfferNotFound = false;
      })
      .addCase(fetchCurrentOfferAction.rejected, (state)=> {
        state.isCurrentOfferLoading = false;
        state.isCurrentOfferNotFound = true;
      })
      .addCase(fetchNearbyOffersAction.pending, (state)=> {
        state.isCurrentOfferLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action)=> {
        state.nearbyOffers = action.payload.slice(0, OFFER_NEARBY_MAX_LENGHT);
        state.isCurrentOfferLoading = false;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state)=> {
        state.isCurrentOfferLoading = false;
      })
      .addCase(fetchCommentsAction.pending, (state)=> {
        state.isCurrentOfferLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action)=> {
        state.comments = action.payload;
        state.isCurrentOfferLoading = false;
      })
      .addCase(fetchCommentsAction.rejected, (state)=> {
        state.isCurrentOfferLoading = false;
      })
      .addCase(sendCommentAction.fulfilled, (state, action)=> {
        state.comments = [action.payload, ...state.comments];
      })
      .addCase(toggleFavoriteOfferAction.fulfilled, (state, action) => {
        if (state.nearbyOffers.length !== 0) {
          state.nearbyOffers.forEach((item) => {
            if (item.id === action.payload.id) {
              item.isFavorite = action.payload.isFavorite;
            }
          });
        }

        if (state.currentOffer && state.currentOffer.id === action.payload.id) {
          state.currentOffer.isFavorite = action.payload.isFavorite;
        }
      });
  }
});

export const { resetCurrentOfferState } = currentOfferProcess.actions;

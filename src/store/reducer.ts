import { createReducer } from '@reduxjs/toolkit';

import { setOffers, setActiveCity} from './actions';

import { CITIES } from '../utils/const';
import { offers } from '../mocks/offers';

const initialState = {
  city: CITIES[0],
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};

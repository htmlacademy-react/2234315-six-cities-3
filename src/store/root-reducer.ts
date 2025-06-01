import { combineReducers } from '@reduxjs/toolkit';
import { appProcess } from './app-process/app-process.slice';
import { currentOfferProcess } from './current-offer-process/current-offer-process.slice';
import { userProcess } from './user-process/user-process.slice';
import { NameSpace } from '../utils/const';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.CurrentOffer]: currentOfferProcess.reducer,
  [NameSpace.User]: userProcess.reducer
});

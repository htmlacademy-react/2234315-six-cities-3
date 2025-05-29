import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../utils/const';
import { appAsideProcess } from './app-aside-process/app-aside-process.slice';
import { currentOfferProcess } from './current-offer-process/current-offer-process.slice';
import { userProcess } from './user-process/user-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.AppAside]: appAsideProcess.reducer,
  [NameSpace.CurrentOffer]: currentOfferProcess.reducer,
  [NameSpace.User]: userProcess.reducer
});

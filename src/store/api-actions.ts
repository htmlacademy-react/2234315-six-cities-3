import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { loadOffers, setOffersDataLoadingStatus, requireAuthorization, redirectToRoute, setUserData } from './actions';
import { saveToken, dropToken } from '../services/token';
import { AppDispatch, State } from '../types/state.js';
import { Offers } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { APIRoute, AuthorizationStatus, AppRoute } from '../utils/const';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: userData} = await api.get<UserData>(APIRoute.Login);
      dispatch(setUserData(userData));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(setUserData(null));
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: userData} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(userData.token);
    dispatch(setUserData(userData));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUserData(null));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

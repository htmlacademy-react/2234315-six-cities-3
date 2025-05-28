import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  setOffers,
  setOffersLoadingStatus,
  requireAuthorization,
  redirectToRoute,
  setUserData,
  setCurrentOfferLoadingStatus,
  setCurrentOffer,
  setCurrentOfferNotFound,
  setCommentsLoadingStatus,
  setComments,
  setNearbyOffersLoadingStatus,
  setNearbyOffers,
  setFavoriteOffers,
  changeFavoriteOffers,
  updateOffersFavoriteFlag
} from './actions';

import { saveToken, dropToken } from '../services/token';
import { AppDispatch, State } from '../types/state.js';
import { DetailedOffer, Offer, Offers } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Review, Reviews } from '../types/review.js';
import { APIRoute, AuthorizationStatus, AppRoute, FavoritesChangeStatus } from '../utils/const';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(setOffers(data));
  },
);

export const fetchCurrentOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchCurrentOffer',
  async (offerId, {dispatch, extra: api}) => {
    try {
      dispatch(setCurrentOfferNotFound(false));
      dispatch(setCurrentOfferLoadingStatus(true));
      const {data} = await api.get<DetailedOffer>(`${APIRoute.Offers}/${offerId}`);
      dispatch(setCurrentOffer(data));
    } catch (error) {
      dispatch(setCurrentOfferNotFound(true));
    } finally {
      dispatch(setCurrentOfferLoadingStatus(false));
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchNearbyOffers',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setNearbyOffersLoadingStatus(true));
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${offerId}${APIRoute.NearbyOffers}`);
    dispatch(setNearbyOffersLoadingStatus(false));
    dispatch(setNearbyOffers(data));
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchFavoriteOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.FavoriteOffers}`);

    dispatch(setFavoriteOffers(data));
  },
);

export const toggleFavoriteOfferAction = createAsyncThunk<void, {id: string; isFavorite: boolean}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/toggleFavorite',
  async ({id, isFavorite}, {dispatch, extra: api}) => {
    const status = isFavorite ? FavoritesChangeStatus.Add : FavoritesChangeStatus.Remove;
    const {data} = await api.post<Offer>(`${APIRoute.FavoriteOffers}/${id}/${status}`);

    dispatch(changeFavoriteOffers(data));
    dispatch(updateOffersFavoriteFlag(data));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/fetchComments',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setCommentsLoadingStatus(true));
    const {data} = await api.get<Reviews>(`${APIRoute.Comments}/${offerId}`);
    dispatch(setCommentsLoadingStatus(false));
    dispatch(setComments(data));
  },
);

export const sendCommentAction = createAsyncThunk<Review, {
  offerId: string;
  rating: number;
  comment: string;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/sendComment',
  async ({offerId, rating, comment}, {extra: api}) => {
    const {data: newComment} = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, {rating, comment});

    return newComment;
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
      dispatch(fetchFavoriteOffersAction());
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(setUserData(null));
      dispatch(setFavoriteOffers([]));
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
    dispatch(fetchOffersAction());
    dispatch(fetchFavoriteOffersAction());
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
    dispatch(setFavoriteOffers([]));
    dispatch(fetchOffersAction());
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

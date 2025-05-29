import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { redirectToRoute } from './actions';
import { saveToken, dropToken } from '../services/token';
import { AppDispatch, State } from '../types/state';
import { DetailedOffer, Offer, Offers } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Review, Reviews } from '../types/review';
import { APIRoute, AppRoute, FavoritesChangeStatus } from '../utils/const';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);

    return data;
  },
);

export const fetchCurrentOfferAction = createAsyncThunk<DetailedOffer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchCurrentOffer',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<DetailedOffer>(`${APIRoute.Offers}/${offerId}`);

    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<Offers, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchNearbyOffers',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${offerId}${APIRoute.NearbyOffers}`);

    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<Reviews, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/fetchComments',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Comments}/${offerId}`);

    return data;
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

export const fetchFavoriteOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.FavoriteOffers}`);

    return data;
  },
);

export const toggleFavoriteOfferAction = createAsyncThunk<Offer, {id: string; isFavorite: boolean}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/toggleFavorite',
  async ({id, isFavorite}, {extra: api}) => {
    const status = isFavorite ? FavoritesChangeStatus.Add : FavoritesChangeStatus.Remove;
    const {data} = await api.post<Offer>(`${APIRoute.FavoriteOffers}/${id}/${status}`);

    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    dispatch(fetchFavoriteOffersAction());

    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(fetchOffersAction());
    dispatch(fetchFavoriteOffersAction());
    dispatch(redirectToRoute(AppRoute.Main));

    return data;
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
    dispatch(fetchOffersAction());
  },
);

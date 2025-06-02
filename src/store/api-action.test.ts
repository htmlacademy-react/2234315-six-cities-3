import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { AppThunkDispatch, extractActionsTypes, makeFakeComment, makeFakeDetailedOffer, makeFakeOffer, makeFakeUserData } from '../utils/mocks';
import { APIRoute, FavoritesChangeStatus } from '../utils/const';
import { checkAuthAction, fetchCommentsAction, fetchCurrentOfferAction, fetchFavoriteOffersAction, fetchNearbyOffersAction, fetchOffersAction, loginAction, logoutAction, sendCommentAction, toggleFavoriteOfferAction } from './api-actions';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './actions';
import * as tokenStorage from '../services/token';


describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      APP: { offers: [], favoriteOffers: [] },
      CURRENT_OFFER: { currentOffer: null, nearbyOffers: [], comments: [] }
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled", when server response 200', async() => {
      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchCurrentOfferAction', () => {
    it('should dispatch "fetchCurrentOfferAction.pending" and "fetchCurrentOfferAction.fulfilled" when server response 200', async () => {
      const mockOffer = makeFakeDetailedOffer();
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}`).reply(200, mockOffer);

      await store.dispatch(fetchCurrentOfferAction(mockOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCurrentOfferAction.pending.type,
        fetchCurrentOfferAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should dispatch "fetchNearbyOffersAction.pending" and "fetchNearbyOffersAction.fulfilled" when server response 200', async () => {
      const mockOffer = makeFakeDetailedOffer();
      const mockNearbyOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}${APIRoute.NearbyOffers}`).reply(200, mockNearbyOffers);

      await store.dispatch(fetchNearbyOffersAction(mockOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should dispatch "fetchCommentsAction.pending" and "fetchCommentsAction.fulfilled" when server response 200', async () => {
      const mockComments = [makeFakeComment()];
      const offerId = 'test-id';
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(200, mockComments);

      await store.dispatch(fetchCommentsAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);
    });
  });

  describe('sendCommentAction', () => {
    it('should dispatch "sendCommentAction.pending" and "sendCommentAction.fulfilled" when server response 200', async () => {
      const mockComment = makeFakeComment();
      const offerId = 'test-id';
      const commentData = { rating: 5, comment: 'Test comment' };
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${offerId}`).reply(200, mockComment);

      await store.dispatch(sendCommentAction({ offerId, ...commentData }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendCommentAction.pending.type,
        sendCommentAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchFavoriteOffersAction', () => {
    it('should dispatch "fetchFavoriteOffersAction.pending" and "fetchFavoriteOffersAction.fulfilled" when server response 200', async () => {
      const mockFavoriteOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.FavoriteOffers).reply(200, mockFavoriteOffers);

      await store.dispatch(fetchFavoriteOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.fulfilled.type,
      ]);
    });
  });

  describe('toggleFavoriteOfferAction', () => {
    it('should dispatch "toggleFavoriteOfferAction.pending" and "toggleFavoriteOfferAction.fulfilled" when adding to favorites', async () => {
      const mockOffer = makeFakeOffer();
      const status = FavoritesChangeStatus.Add;
      mockAxiosAdapter.onPost(`${APIRoute.FavoriteOffers}/${mockOffer.id}/${status}`).reply(200, mockOffer);

      await store.dispatch(toggleFavoriteOfferAction({ id: mockOffer.id, isFavorite: true }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        toggleFavoriteOfferAction.pending.type,
        toggleFavoriteOfferAction.fulfilled.type,
      ]);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch correct actions when server response 200', async () => {
      const mockUserData = makeFakeUserData();
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, mockUserData);
      mockAxiosAdapter.onGet(APIRoute.FavoriteOffers).reply(200, []);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        fetchFavoriteOffersAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch correct actions when server response 200', async () => {
      const fakeUser: AuthData = { login: 'test@test.com', password: '1k' };
      const fakeServerReplay = makeFakeUserData();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      mockAxiosAdapter.onGet(APIRoute.FavoriteOffers).reply(200, []);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        fetchFavoriteOffersAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { login: 'test@test.com', password: '1k' };
      const fakeServerReplay = makeFakeUserData();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should call "dropToken" once with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});

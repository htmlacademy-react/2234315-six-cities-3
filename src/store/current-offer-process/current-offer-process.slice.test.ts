import { OFFER_NEARBY_MAX_LENGHT } from '../../utils/const';
import { makeFakeComment, makeFakeDetailedOffer, makeFakeOffer } from '../../utils/mocks';
import { fetchCommentsAction, fetchCurrentOfferAction, fetchNearbyOffersAction, logoutAction, sendCommentAction, toggleFavoriteOfferAction } from '../api-actions';
import { currentOfferProcess, resetCurrentOfferState } from './current-offer-process.slice';


describe('CurrentOfferProcess slice', () => {
  const mockOffer = makeFakeOffer();
  const mockDetailedOffer = makeFakeDetailedOffer();
  const mockComment = makeFakeComment();
  const mockNearbyOffers = Array.from({ length: 10 }, () => makeFakeOffer());

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      currentOffer: null,
      nearbyOffers: [],
      comments: [],
      isCurrentOfferLoading: false,
      isCurrentOfferNotFound: false,
    };
    const result = currentOfferProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it ('should return default initial state with empty action and undefined state', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {
      currentOffer: null,
      nearbyOffers: [],
      comments: [],
      isCurrentOfferLoading: false,
      isCurrentOfferNotFound: false,
    };
    const result = currentOfferProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should reset state with "resetCurrentOfferState" action', () => {
    const initialState = {
      currentOffer: mockDetailedOffer,
      nearbyOffers: mockNearbyOffers,
      comments: [mockComment],
      isCurrentOfferLoading: false,
      isCurrentOfferNotFound: false,
    };
    const result = currentOfferProcess.reducer(initialState, resetCurrentOfferState());

    expect(result.currentOffer).toBeNull();
    expect(result.nearbyOffers).toEqual([]);
    expect(result.comments).toEqual([]);
  });

  describe('fetchCurrentOfferAction', () => {
    it('should set "isCurrentOfferLoading" to "true" with "fetchCurrentOfferAction.pending"', () => {
      const initialState = {
        currentOffer: null,
        nearbyOffers: [],
        comments: [],
        isCurrentOfferLoading: false,
        isCurrentOfferNotFound: false,
      };
      const result = currentOfferProcess.reducer(initialState, fetchCurrentOfferAction.pending);

      expect(result.isCurrentOfferLoading).toBe(true);
      expect(result.isCurrentOfferNotFound).toBe(false);
    });

    it('should set current offer and "isCurrentOfferLoading" to "false" with "fetchCurrentOfferAction.fulfilled"', () => {
      const initialState = {
        currentOffer: null,
        nearbyOffers: [],
        comments: [],
        isCurrentOfferLoading: true,
        isCurrentOfferNotFound: false,
      };
      const result = currentOfferProcess.reducer(
        initialState,
        fetchCurrentOfferAction.fulfilled(mockDetailedOffer, '', mockDetailedOffer.id)
      );

      expect(result.currentOffer).toEqual(mockDetailedOffer);
      expect(result.isCurrentOfferLoading).toBe(false);
      expect(result.isCurrentOfferNotFound).toBe(false);
    });

    it('should set "isCurrentOfferNotFound" to "true" with "fetchCurrentOfferAction.rejected"', () => {
      const initialState = {
        currentOffer: null,
        nearbyOffers: [],
        comments: [],
        isCurrentOfferLoading: true,
        isCurrentOfferNotFound: false,
      };
      const result = currentOfferProcess.reducer(
        initialState,
        fetchCurrentOfferAction.rejected(new Error(), '', mockDetailedOffer.id)
      );

      expect(result.isCurrentOfferLoading).toBe(false);
      expect(result.isCurrentOfferNotFound).toBe(true);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should set "isCurrentOfferLoading" to "true" with "fetchNearbyOffersAction.pending"', () => {
      const initialState = {
        currentOffer: mockDetailedOffer,
        nearbyOffers: [],
        comments: [],
        isCurrentOfferLoading: false,
        isCurrentOfferNotFound: false,
      };
      const result = currentOfferProcess.reducer(initialState, fetchNearbyOffersAction.pending);

      expect(result.isCurrentOfferLoading).toBe(true);
    });

    it('should set nearby offers limited by OFFER_NEARBY_MAX_LENGHT with "fetchNearbyOffersAction.fulfilled"', () => {
      const initialState = {
        currentOffer: mockDetailedOffer,
        nearbyOffers: [],
        comments: [],
        isCurrentOfferLoading: true,
        isCurrentOfferNotFound: false,
      };
      const result = currentOfferProcess.reducer(
        initialState,
        fetchNearbyOffersAction.fulfilled(mockNearbyOffers, '', mockDetailedOffer.id)
      );

      expect(result.nearbyOffers.length).toBe(OFFER_NEARBY_MAX_LENGHT);
      expect(result.isCurrentOfferLoading).toBe(false);
    });

    it('should set "isCurrentOfferLoading" to "false" with "fetchNearbyOffersAction.rejected"', () => {
      const initialState = {
        currentOffer: mockDetailedOffer,
        nearbyOffers: [],
        comments: [],
        isCurrentOfferLoading: true,
        isCurrentOfferNotFound: false,
      };
      const result = currentOfferProcess.reducer(
        initialState,
        fetchNearbyOffersAction.rejected(null, '', mockDetailedOffer.id)
      );

      expect(result.isCurrentOfferLoading).toBe(false);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should set "isCurrentOfferLoading" to "true" with "fetchCommentsAction.pending"', () => {
      const initialState = {
        currentOffer: mockDetailedOffer,
        nearbyOffers: [],
        comments: [],
        isCurrentOfferLoading: false,
        isCurrentOfferNotFound: false,
      };
      const result = currentOfferProcess.reducer(initialState, fetchCommentsAction.pending);

      expect(result.isCurrentOfferLoading).toBe(true);
    });

    it('should set comments with "fetchCommentsAction.fulfilled"', () => {
      const initialState = {
        currentOffer: mockDetailedOffer,
        nearbyOffers: [],
        comments: [],
        isCurrentOfferLoading: true,
        isCurrentOfferNotFound: false,
      };
      const mockComments = [mockComment];
      const result = currentOfferProcess.reducer(
        initialState,
        fetchCommentsAction.fulfilled(mockComments, '', mockDetailedOffer.id)
      );

      expect(result.comments).toEqual(mockComments);
      expect(result.isCurrentOfferLoading).toBe(false);
    });

    it('should set "isCurrentOfferLoading" to "false" with "fetchCommentsAction.rejected"', () => {
      const initialState = {
        currentOffer: mockDetailedOffer,
        nearbyOffers: [],
        comments: [],
        isCurrentOfferLoading: true,
        isCurrentOfferNotFound: false,
      };
      const result = currentOfferProcess.reducer(
        initialState,
        fetchCommentsAction.rejected(null, '', mockDetailedOffer.id)
      );

      expect(result.isCurrentOfferLoading).toBe(false);
    });
  });

  describe('sendCommentAction', () => {
    it('should add new comment to start of comments list with "sendCommentAction.fulfilled"', () => {
      const initialState = {
        currentOffer: mockDetailedOffer,
        nearbyOffers: [],
        comments: [mockComment],
        isCurrentOfferLoading: false,
        isCurrentOfferNotFound: false,
      };
      const newComment = makeFakeComment();
      const result = currentOfferProcess.reducer(
        initialState,
        sendCommentAction.fulfilled(newComment, '', {
          offerId: mockDetailedOffer.id,
          comment: 'Test comment',
          rating: 5
        })
      );

      expect(result.comments.length).toBe(2);
      expect(result.comments[0]).toEqual(newComment);
    });
  });

  describe('toggleFavoriteOfferAction', () => {
    it('should update current offer favorite status with "toggleFavoriteOfferAction.fulfilled"', () => {
      const initialState = {
        currentOffer: { ...mockDetailedOffer, isFavorite: false },
        nearbyOffers: [],
        comments: [],
        isCurrentOfferLoading: false,
        isCurrentOfferNotFound: false,
      };

      const result = currentOfferProcess.reducer(
        initialState,
        toggleFavoriteOfferAction.fulfilled(
          { ...mockOffer, id: mockDetailedOffer.id,isFavorite: true },
          '',
          { id: mockDetailedOffer.id, isFavorite: true }
        )
      );

      expect(result.currentOffer?.isFavorite).toBe(true);
    });
  });

  describe('logoutAction', () => {
    it('should reset favorite status for current offer and nearby offers with "logoutAction.fulfilled"', () => {
      const initialState = {
        currentOffer: { ...mockDetailedOffer, isFavorite: true },
        nearbyOffers: [{ ...makeFakeOffer(), isFavorite: true }],
        comments: [],
        isCurrentOfferLoading: false,
        isCurrentOfferNotFound: false,
      };
      const result = currentOfferProcess.reducer(
        initialState,
        logoutAction.fulfilled
      );

      expect(result.currentOffer?.isFavorite).toBe(false);
      expect(result.nearbyOffers[0].isFavorite).toBe(false);
    });
  });
});

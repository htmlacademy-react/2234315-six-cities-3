import { NameSpace } from '../../utils/const';
import { makeFakeComment, makeFakeDetailedOffer, makeFakeOffer } from '../../utils/mocks';
import { getComments, getCurrentOffer, getCurrentOfferLoadingStatus, getCurrentOfferNotFoundStatus, getNearbyOffers } from './current-offer-process.selectors';

describe('CurrentOfferProcess selectors', () => {
  const mockDetailedOffer = makeFakeDetailedOffer();
  const mockNearbyOffer = makeFakeOffer();
  const mockComment = makeFakeComment();

  const state = {
    [NameSpace.CurrentOffer]: {
      currentOffer: mockDetailedOffer,
      nearbyOffers: [mockNearbyOffer],
      comments: [mockComment],
      isCurrentOfferLoading: false,
      isCurrentOfferNotFound: false,
    }
  };

  it('should return current offer from state', () => {
    const { currentOffer } = state[NameSpace.CurrentOffer];
    const result = getCurrentOffer(state);

    expect(result).toEqual(currentOffer);
  });

  it('should return nearby offers from state', () => {
    const { nearbyOffers } = state[NameSpace.CurrentOffer];
    const result = getNearbyOffers(state);

    expect(result).toEqual(nearbyOffers);
  });

  it('should return comments from state', () => {
    const { comments } = state[NameSpace.CurrentOffer];
    const result = getComments(state);

    expect(result).toEqual(comments);
  });

  it('should return current offer loading status', () => {
    const { isCurrentOfferLoading } = state[NameSpace.CurrentOffer];
    const result = getCurrentOfferLoadingStatus(state);

    expect(result).toBe(isCurrentOfferLoading);
  });

  it('should return current offer not found status', () => {
    const { isCurrentOfferNotFound } = state[NameSpace.CurrentOffer];
    const result = getCurrentOfferNotFoundStatus(state);

    expect(result).toBe(isCurrentOfferNotFound);
  });
});

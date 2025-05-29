import { DetailedOffer, Offers } from '../../types/offer';
import { Reviews } from '../../types/review';
import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';

export const getCurrentOffer = (state: Pick<State, NameSpace.CurrentOffer>): DetailedOffer | null => state[NameSpace.CurrentOffer].currentOffer;
export const getNearbyOffers = (state: Pick<State, NameSpace.CurrentOffer>): Offers => state[NameSpace.CurrentOffer].nearbyOffers;
export const getComments = (state: Pick<State, NameSpace.CurrentOffer>): Reviews => state[NameSpace.CurrentOffer].comments;
export const getCurrentOfferLoadingStatus = (state: Pick<State, NameSpace.CurrentOffer>): boolean => state[NameSpace.CurrentOffer].isCurrentOfferLoading;
export const getCurrentOfferNotFoundStatus = (state: Pick<State, NameSpace.CurrentOffer>): boolean => state[NameSpace.CurrentOffer].isCurrentOfferNotFound;



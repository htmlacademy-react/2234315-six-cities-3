import { OFFER_MAX_RATING } from './const';

export const getRatingPercent = (rating: number): string => `${(Math.round(100 / OFFER_MAX_RATING * rating)).toString()}%`;

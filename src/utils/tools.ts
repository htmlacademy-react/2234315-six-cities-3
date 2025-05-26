import { Offers } from '../types/offer';
import { Reviews } from '../types/review';
import { SortType } from './const';

export const getRatingPercent = (rating: number, maxRating: number): string => `${(Math.round(100 / maxRating * rating)).toString()}%`;

export function formatDate(dateString: string, formatType: 'short' | 'full'): string {
  const date = new Date(dateString);
  const months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  if (formatType === 'short') {
    return `${monthName} ${year}`;
  } else if (formatType === 'full') {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  } else {
    throw new Error('Invalid format type. Use "full" or "short".');
  }
}

export function sortOffers(offers: Offers, sortType: SortType): Offers {
  switch (sortType) {
    case SortType.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortType.TopRatedFirst:
      return [...offers].sort((a, b) => b.rating - a.rating);
    case SortType.Popular:
    default:
      return [...offers];
  }
}

export function capitalizeFirstLetter(str: string | undefined): string {
  if (!str) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function sortReviewByNewest(reviews: Reviews): Reviews {
  return reviews.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

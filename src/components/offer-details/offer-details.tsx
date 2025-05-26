import { DetailedOffer } from '../../types/offer';
import { OFFER_MAX_RATING } from '../../utils/const';
import { capitalizeFirstLetter, getRatingPercent } from '../../utils/tools';

type OfferDetailsProps = {
  offer: DetailedOffer;
}

function OfferDetails({offer}: OfferDetailsProps): JSX.Element {
  return (
    <>
      {offer.isPremium &&
      <div className="offer__mark">
        <span>Premium</span>
      </div>}
      <div className="offer__name-wrapper">
        <h1 className="offer__name">{offer.title}</h1>
        <button
          className={`offer__bookmark-button ${offer.isFavorite && 'offer__bookmark-button--active'} button`}
          type="button"
        >
          <svg className="offer__bookmark-icon" width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">${offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
        </button>
      </div>
      <div className="offer__rating rating">
        <div className="offer__stars rating__stars">
          <span style={{ width: getRatingPercent(offer.rating ?? 0, OFFER_MAX_RATING) }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="offer__rating-value rating__value">{offer.rating}</span>
      </div>
      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">
          {capitalizeFirstLetter(offer.type)}
        </li>
        <li className="offer__feature offer__feature--bedrooms">
          {offer.bedrooms} Bedroom{offer.bedrooms && offer.bedrooms > 1 ? 's' : ''}
        </li>
        <li className="offer__feature offer__feature--adults">
          Max {offer.maxAdults} adult{offer.maxAdults && offer.maxAdults > 1 ? 's' : ''}
        </li>
      </ul>
      <div className="offer__price">
        <b className="offer__price-value">&euro;{offer.price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>
      <div className="offer__inside">
        <h2 className="offer__inside-title">What&apos;s inside</h2>
        <ul className="offer__inside-list">
          {offer.goods.map((facility) => (
            <li key={facility} className="offer__inside-item">
              {facility}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default OfferDetails;

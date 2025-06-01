import { Link } from 'react-router-dom';
import { memo } from 'react';
import { Offer } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/actions';
import { toggleFavoriteOfferAction } from '../../store/api-actions';
import { capitalizeFirstLetter, getRatingPercent } from '../../utils/tools';
import { AppRoute, AuthorizationStatus, OFFER_MAX_RATING } from '../../utils/const';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

type PlaceCardProps = {
  cardInfo: Offer;
  cardType?: string;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
}

function PlaceCard({cardInfo, cardType, onMouseEnter, onMouseLeave}: PlaceCardProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const handleBookmarkClick = (offer: Offer) => {
    if (isAuthorized) {
      dispatch(toggleFavoriteOfferAction({id: offer.id, isFavorite: !offer.isFavorite}));
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return (
    <article
      className={`${cardType && `${cardType}__card`} place-card`}
      onMouseEnter={() => onMouseEnter?.(cardInfo.id)}
      onMouseLeave={() => onMouseLeave?.()}
    >
      {cardInfo.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${cardType && `${cardType}__image-wrapper`} place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${cardInfo.id}`}>
          <img
            className="place-card__image"
            src={cardInfo.previewImage}
            width={cardType === 'favorites' ? '150' : '260'}
            height={cardType === 'favorites' ? '110' : '200'}
            alt={cardInfo.title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{cardInfo.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${cardInfo.isFavorite && 'place-card__bookmark-button--active'} button`}
            type="button"
            onClick={() => handleBookmarkClick(cardInfo)}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">${cardInfo.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRatingPercent(cardInfo.rating, OFFER_MAX_RATING) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${cardInfo.id}`}>{cardInfo.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(cardInfo.type)}</p>
      </div>
    </article>
  );
}

export default memo(PlaceCard);

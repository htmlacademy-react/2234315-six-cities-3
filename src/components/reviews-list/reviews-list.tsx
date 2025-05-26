import { Reviews } from '../../types/review';
import { getRatingPercent, formatDate, sortReviewByNewest } from '../../utils/tools';
import { COMMENT_MAX_RATING, OFFER_COMMENTS_MAX_LENGHT } from '../../utils/const';

type ReviewsListProps = {
  reviews: Reviews;
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  const displayedReviews = sortReviewByNewest(reviews).slice(0, OFFER_COMMENTS_MAX_LENGHT);

  return (
    <ul className="reviews__list">
      {displayedReviews.map((review) => (
        <li key={review.id} className="reviews__item">
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img
                className="reviews__avatar user__avatar"
                src={review.user.avatarUrl}
                width="54"
                height="54"
                alt={`${review.user.name} avatar`}
              />
            </div>
            <span className="reviews__user-name">{review.user.name}</span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{ width: getRatingPercent(review.rating, COMMENT_MAX_RATING) }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">
              {review.comment}
            </p>
            <time className="reviews__time" dateTime={formatDate(review.date, 'full')}>{formatDate(review.date, 'short')}</time>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ReviewsList;

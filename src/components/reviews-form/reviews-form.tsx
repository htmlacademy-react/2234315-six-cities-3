import { useState, ChangeEvent, FormEvent, Fragment } from 'react';
import { COMMENT_RATINGS } from '../../utils/const';

function ReviewsForm(): JSX.Element {
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState('');

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {COMMENT_RATINGS.map((commentRating) => (
          <Fragment key={commentRating.value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={commentRating.value}
              id={`${commentRating.value}-stars`}
              type="radio"
              checked={commentRating.value === rating}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${commentRating.value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={commentRating.title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewText}
        maxLength={300}
        onChange={handleReviewChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!rating || reviewText.length < 50}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;

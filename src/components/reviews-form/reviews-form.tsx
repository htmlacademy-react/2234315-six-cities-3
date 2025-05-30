import { useState, ChangeEvent, Fragment, memo } from 'react';
import { useAppDispatch } from '../../hooks';
import { sendCommentAction } from '../../store/api-actions';
import { COMMENT_RATINGS, CommentTextLenght } from '../../utils/const';

type ReviewsFormProps = {
  offerId: string;
}

function ReviewsForm({offerId}: ReviewsFormProps): JSX.Element {
  const [rating, setRating] = useState<number | null>();
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const dispatch = useAppDispatch();

  const isFormValid = rating !== null && reviewText.length >= CommentTextLenght.Min && reviewText.length <= CommentTextLenght.Max;

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(evt.target.value);
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!rating || reviewText.length < CommentTextLenght.Min || reviewText.length > CommentTextLenght.Max) {
      setErrorMessage('Please fill out the form correctly.');

      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    dispatch(
      sendCommentAction({
        offerId,
        rating,
        comment: reviewText,
      })
    )
      .unwrap()
      .then(() => {
        setRating(null);
        setReviewText('');
      })
      .catch(() => {
        setErrorMessage('Failed to submit comment. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
              disabled={isSubmitting}
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
        maxLength={CommentTextLenght.Max}
        disabled={isSubmitting}
        onChange={handleReviewChange}
      />
      {errorMessage && (
        <div className="error-message" style={{ color: 'red', marginBottom: '12px' }}>
          {errorMessage}
        </div>
      )}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{CommentTextLenght.Min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid || isSubmitting}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default memo(ReviewsForm);

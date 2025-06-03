import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Reviews } from '../../types/review';
import { OFFER_COMMENTS_MAX_LENGHT } from '../../utils/const';
import { formatDate, getRatingPercent, sortReviewByNewest } from '../../utils/tools';
import ReviewsList from './reviews-list';
import { makeFakeComment } from '../../utils/mocks';

vi.mock('../../utils/tools', () => ({
  getRatingPercent: vi.fn((rating) => `${rating * 20}%`),
  formatDate: vi.fn((type) => type === 'full' ? '2023-01-01' : 'January 2023'),
  sortReviewByNewest: vi.fn((reviews: Reviews) => [...reviews].reverse()),
}));

describe('Component: ReviewsList', () => {
  const mockReviews = [makeFakeComment(), makeFakeComment()];

  it('should render correctly with reviews', () => {
    render(<ReviewsList reviews={mockReviews} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(mockReviews.length);
    expect(screen.getByText(mockReviews[0].comment)).toBeInTheDocument();
    expect(screen.getByText(mockReviews[1].comment)).toBeInTheDocument();
    expect(screen.getByText(mockReviews[0].user.name)).toBeInTheDocument();
    expect(screen.getByText(mockReviews[1].user.name)).toBeInTheDocument();
  });

  it('should display limited number of reviews', () => {
    const manyReviews = Array(OFFER_COMMENTS_MAX_LENGHT + 5).fill(null).map((_, i) => ({
      id: String(i),
      comment: `Review ${i}`,
      date: '2023-01-01T00:00:00.000Z',
      rating: 3,
      user: {
        name: `User ${i}`,
        avatarUrl: `https://example.com/avatar${i}.jpg`,
        isPro: false,
      },
    }));

    render(<ReviewsList reviews={manyReviews} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(OFFER_COMMENTS_MAX_LENGHT);
  });

  it('should call sortReviewByNewest utility', () => {
    render(<ReviewsList reviews={mockReviews} />);
    expect(sortReviewByNewest).toHaveBeenCalledWith(mockReviews);
  });

  it('should display correct rating stars', () => {
    render(<ReviewsList reviews={mockReviews} />);

    mockReviews.forEach((review) => {
      const ratingElement = screen.getByText(review.comment)
        .closest('li')
        ?.querySelector('.reviews__stars span');

      expect(ratingElement).toHaveStyle(`width: ${getRatingPercent(review.rating, 5)}`);
    });
  });

  it('should display formatted dates', () => {
    render(<ReviewsList reviews={mockReviews} />);

    expect(formatDate).toHaveBeenCalledWith(mockReviews[0].date, 'full');
    expect(formatDate).toHaveBeenCalledWith(mockReviews[0].date, 'short');
    expect(screen.getAllByText('January 2023')).toHaveLength(mockReviews.length);
  });

  it('should not render when no reviews provided', () => {
    const { container } = render(<ReviewsList reviews={[]} />);
    expect(container.querySelector('.reviews__list')).toBeEmptyDOMElement();
  });
});

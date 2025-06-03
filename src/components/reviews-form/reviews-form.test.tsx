import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ReviewsForm from './reviews-form';
import { useAppDispatch } from '../../hooks';
import { COMMENT_RATINGS, CommentTextLenght } from '../../utils/const';
import { sendCommentAction } from '../../store/api-actions';

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(() => vi.fn()),
}));

vi.mock('../../store/api-actions', () => ({
  sendCommentAction: vi.fn(() => ({
    unwrap: vi.fn().mockResolvedValue(undefined),
  })),
}));

describe('Component: ReviewsForm', () => {
  const mockOfferId = '1';
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(mockDispatch).mockReturnValue({
      unwrap: vi.fn().mockResolvedValue(undefined),
    });
  });

  it('should render correctly', () => {
    render(<ReviewsForm offerId={mockOfferId} />);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(COMMENT_RATINGS.length);
  });

  it('should update rating when star is clicked', async () => {
    render(<ReviewsForm offerId={mockOfferId} />);
    const firstStar = screen.getAllByRole('radio')[0];

    await userEvent.click(firstStar);
    expect(firstStar).toBeChecked();
  });

  it('should update review text when typing', async () => {
    render(<ReviewsForm offerId={mockOfferId} />);
    const textarea = screen.getByRole('textbox');
    const testText = 'This is a test review';

    await userEvent.type(textarea, testText);
    expect(textarea).toHaveValue(testText);
  });

  it('should disable submit button when form is invalid', () => {
    render(<ReviewsForm offerId={mockOfferId} />);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('should enable submit button when form is valid', async () => {
    render(<ReviewsForm offerId={mockOfferId} />);
    const textarea = screen.getByRole('textbox');
    const firstStar = screen.getAllByRole('radio')[0];
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await userEvent.click(firstStar);
    await userEvent.type(textarea, 'a'.repeat(CommentTextLenght.Min));

    expect(submitButton).toBeEnabled();
  });

  it('should call sendCommentAction when form is submitted', async () => {
    render(<ReviewsForm offerId={mockOfferId} />);
    const textarea = screen.getByRole('textbox');
    const firstStar = screen.getAllByRole('radio')[0];
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const testText = 'a'.repeat(CommentTextLenght.Min);

    await userEvent.click(firstStar);
    await userEvent.type(textarea, testText);
    await userEvent.click(submitButton);

    expect(sendCommentAction).toHaveBeenCalledWith({
      offerId: mockOfferId,
      rating: COMMENT_RATINGS[0].value,
      comment: testText,
    });
  });

  it('should show error message when submission fails', async () => {
    const error = new Error('Submission failed');
    vi.mocked(mockDispatch).mockReturnValue({
      unwrap: vi.fn().mockRejectedValue(error),
    });

    render(<ReviewsForm offerId={mockOfferId} />);
    const textarea = screen.getByRole('textbox');
    const firstStar = screen.getAllByRole('radio')[0];
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const testText = 'a'.repeat(CommentTextLenght.Min);

    await userEvent.click(firstStar);
    await userEvent.type(textarea, testText);
    await userEvent.click(submitButton);

    expect(await screen.findByText('Failed to submit comment. Please try again.')).toBeInTheDocument();
  });

  it('should reset form after successful submission', async () => {
    render(<ReviewsForm offerId={mockOfferId} />);
    const textarea = screen.getByRole('textbox');
    const firstStar = screen.getAllByRole('radio')[0];
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const testText = 'a'.repeat(CommentTextLenght.Min);

    await userEvent.click(firstStar);
    await userEvent.type(textarea, testText);
    await userEvent.click(submitButton);

    expect(textarea).toHaveValue('');
    expect(firstStar).not.toBeChecked();
  });

  it('should disable form elements while submitting', async () => {
    vi.mocked(mockDispatch).mockReturnValue({
      unwrap: vi.fn(() => new Promise(() => {})),
    });

    render(<ReviewsForm offerId={mockOfferId} />);
    const textarea = screen.getByRole('textbox');
    const firstStar = screen.getAllByRole('radio')[0];
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const testText = 'a'.repeat(CommentTextLenght.Min);

    await userEvent.click(firstStar);
    await userEvent.type(textarea, testText);
    await userEvent.click(submitButton);

    expect(textarea).toBeDisabled();
    expect(firstStar).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
});

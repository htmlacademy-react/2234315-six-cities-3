import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SortType } from '../../utils/const';
import PlacesSorting from './places-sorting';

describe('Component: PlacesSorting', () => {
  const mockActiveSortType = SortType.Popular;
  const mockOnChangeSortType = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    render(
      <PlacesSorting
        activeSortType={mockActiveSortType}
        onChangeSortType={mockOnChangeSortType}
      />
    );

    expect(screen.getByTestId('active-sort-type')).toHaveTextContent(mockActiveSortType);
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(Object.values(SortType).length);
  });

  it('should toggle sort options visibility when clicking on sorting type', async () => {
    render(
      <PlacesSorting
        activeSortType={mockActiveSortType}
        onChangeSortType={mockOnChangeSortType}
      />
    );

    const sortingType = screen.getByTestId('active-sort-type');
    const optionsList = screen.getByRole('list');

    expect(optionsList).not.toHaveClass('places__options--opened');

    await userEvent.click(sortingType);
    expect(optionsList).toHaveClass('places__options--opened');

    await userEvent.click(sortingType);
    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('should call onChangeSortType with correct sort type when option is clicked', async () => {
    render(
      <PlacesSorting
        activeSortType={mockActiveSortType}
        onChangeSortType={mockOnChangeSortType}
      />
    );

    await userEvent.click(screen.getByTestId('active-sort-type'));

    for (const sortType of Object.values(SortType)) {
      await userEvent.click(screen.getByTestId(sortType));
      expect(mockOnChangeSortType).toHaveBeenCalledWith(sortType);
      mockOnChangeSortType.mockClear();
    }
  });

  it('should close options after selecting a sort type', async () => {
    render(
      <PlacesSorting
        activeSortType={mockActiveSortType}
        onChangeSortType={mockOnChangeSortType}
      />
    );

    await userEvent.click(screen.getByTestId('active-sort-type'));
    const optionsList = screen.getByRole('list');
    expect(optionsList).toHaveClass('places__options--opened');

    const testSortType = Object.values(SortType).find((type) => type !== mockActiveSortType);
    await userEvent.click(screen.getByTestId(testSortType!));

    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('should highlight active sort type', () => {
    render(
      <PlacesSorting
        activeSortType={mockActiveSortType}
        onChangeSortType={mockOnChangeSortType}
      />
    );

    const activeOption = screen.getByTestId(mockActiveSortType).closest('li');
    expect(activeOption).toHaveClass('places__option--active');
  });

  it('should render all sort types from SortType enum', () => {
    render(
      <PlacesSorting
        activeSortType={mockActiveSortType}
        onChangeSortType={mockOnChangeSortType}
      />
    );

    Object.values(SortType).forEach((sortType) => {
      expect(screen.getByTestId(sortType)).toBeInTheDocument();
    });
  });
});

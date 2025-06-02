import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: Favorites empty', () => {
  it('should render correct', () => {
    render(<FavoritesEmpty />);

    expect(screen.getByRole('heading', { level: 1, name: /Favorites \(empty\)/i })).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });
});

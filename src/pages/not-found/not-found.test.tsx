import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppRoute, PageTitle } from '../../utils/const';
import NotFound from './not-found';
import { withHistory, withStore } from '../../utils/mock-component';

vi.mock('../../components/layout/layout', () => ({
  default: vi.fn(({ children, pageTitle, className }: { pageTitle: string; className: string; children: JSX.Element }) => (
    <div className={className} data-testid="layout">
      <title>{pageTitle}</title>
      {children}
    </div>
  ))
}));

describe('Component: NotFound', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderNotFound = () => {
    const { withStoreComponent } = withStore(<NotFound />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
  };

  it('should render correctly', () => {

    renderNotFound();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('We are sorry, Page not found!')).toBeInTheDocument();
    expect(
      screen.getByText(
        'The page you are looking for might have been removed, had its name changed or is temporarily unavailable.'
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to homepage/i })).toBeInTheDocument();
  });

  it('should have correct link to homepage', () => {
    renderNotFound();

    const link = screen.getByRole('link', { name: /back to homepage/i });
    expect(link).toHaveAttribute('href', AppRoute.Main);
  });

  it('should pass correct props to Layout', () => {
    renderNotFound();

    const layout = screen.getByTestId('layout');
    expect(layout).toHaveClass('page--gray');
    expect(screen.getByText(`${PageTitle.NotFound} | ${PageTitle.Main}`)).toBeInTheDocument();
  });
});

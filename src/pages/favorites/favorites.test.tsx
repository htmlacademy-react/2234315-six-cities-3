import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Favorites from './favorites';
import { PageTitle } from '../../utils/const';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { State } from '../../types/state';
import { Offers } from '../../types/offer';

vi.mock('../../components/layout/layout', () => ({
  default: vi.fn(({ children, pageTitle, className, withFooter }: {
    pageTitle: string;
    className: string;
    children: JSX.Element;
    withFooter: boolean;
  }
  ) => (
    <div className={className} data-testid="layout" data-with-footer={withFooter}>
      <title>{pageTitle}</title>
      {children}
    </div>
  )),
}));

vi.mock('../../components/favorite-locations-list/favorite-locations-list', () => ({
  default: vi.fn(({ offers }: {offers: Offers}) => (
    <div data-testid="favorite-locations-list">
      {offers.map((offer) => (
        <div key={offer.id}>{offer.title}</div>
      ))}
    </div>
  )),
}));

vi.mock('../../components/favorites-empty/favorites-empty', () => ({
  default: vi.fn(() => <div data-testid="favorites-empty">No favorites</div>),
}));

describe('Component: Favorites', () => {
  const mockOffers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
  const initialState: Partial<State> = makeFakeStore();
  const store: Partial<State> = {
    ...initialState,
    APP: {
      ...initialState.APP!,
      favoriteOffers: mockOffers,
    },
  };

  const renderFavorites = () => {
    const { withStoreComponent } = withStore(<Favorites />, store);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
  };

  it('should render correctly with favorite offers', () => {
    renderFavorites();

    expect(screen.getByTestId('layout')).not.toHaveClass('page--favorites-empty');
    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-locations-list')).toBeInTheDocument();
    expect(screen.queryByTestId('favorites-empty')).not.toBeInTheDocument();
    expect(screen.getByText(`${PageTitle.Favorites} | ${PageTitle.Main}`)).toBeInTheDocument();
  });

  it('should render correctly with no favorite offers', () => {
    const { withStoreComponent } = withStore(<Favorites />, {
      ...initialState,
      APP: {
        ...initialState.APP!,
        favoriteOffers: [],
      },
    });

    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('layout')).toHaveClass('page--favorites-empty');
    expect(screen.getByTestId('favorites-empty')).toBeInTheDocument();
    expect(screen.queryByText('Saved listing')).not.toBeInTheDocument();
    expect(screen.queryByTestId('favorite-locations-list')).not.toBeInTheDocument();
  });

  it('should pass correct props to Layout', () => {
    renderFavorites();

    const layout = screen.getByTestId('layout');
    expect(layout).toHaveAttribute('data-with-footer', 'true');
    expect(layout).not.toHaveClass('page--favorites-empty');
  });

  it('should add empty page classes when no favorites', () => {
    const { withStoreComponent } = withStore(<Favorites />, {
      ...initialState,
      APP: {
        ...initialState.APP!,
        favoriteOffers: [],
      },
    });

    render(withHistory(withStoreComponent));

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('page__main--favorites');
    expect(mainElement).toHaveClass('page__main--favorites-empty');
  });

  it('should not add empty page classes when has favorites', () => {
    renderFavorites();

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('page__main--favorites');
    expect(mainElement).not.toHaveClass('page__main--favorites-empty');
  });
});

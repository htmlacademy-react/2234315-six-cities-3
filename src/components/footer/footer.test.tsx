import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { AppRoute } from '../../utils/const';
import { withHistory } from '../../utils/mock-component';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(<Footer />);

    render(preparedComponent);

    expect(screen.getByTestId('footer-container')).toBeInTheDocument();

    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveClass('footer__logo-link');
    expect(logoLink).toHaveAttribute('href', AppRoute.Main);

    const logoImage = screen.getByAltText('6 cities logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveClass('footer__logo');
  });
});

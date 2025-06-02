import { render, screen } from '@testing-library/react';
import OfferHost from './offer-host';
import { makeFakeDetailedOffer } from '../../utils/mocks';

describe('Component: Offer host', () => {
  it('should render correct', () => {
    const offer = makeFakeDetailedOffer();

    render(<OfferHost offer={offer} />);

    expect(screen.getByRole('heading', { level: 2, name: /Meet the host/i })).toBeInTheDocument();
    expect(screen.getByText(offer.host.name)).toBeInTheDocument();
    expect(screen.getByAltText(/Host avatar/i)).toBeInTheDocument();
  });
});

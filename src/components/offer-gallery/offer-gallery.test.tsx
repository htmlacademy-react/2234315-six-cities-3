import { render, screen } from '@testing-library/react';
import { makeFakeDetailedOffer } from '../../utils/mocks';
import OfferGallery from './offer-gallery';

describe('Component: Offer gallery', () => {
  it('should render correct', () => {
    const offer = makeFakeDetailedOffer();
    const galleryContainerTestId = 'gallery-container';

    render(<OfferGallery offer={offer} />);

    const galleryContainer = screen.getByTestId(galleryContainerTestId);

    expect(galleryContainer).toBeInTheDocument();
  });
});

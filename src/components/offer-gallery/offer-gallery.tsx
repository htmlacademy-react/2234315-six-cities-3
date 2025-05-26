import { DetailedOffer } from '../../types/offer';
import { OFFER_GALLERY_MAX_LENGHT } from '../../utils/const';

type OfferGalleryProps = {
  offer: DetailedOffer;
}

function OfferGallery({offer}: OfferGalleryProps): JSX.Element {
  const images = offer.images.slice(0, OFFER_GALLERY_MAX_LENGHT);

  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((src) => (
          <div key={src} className="offer__image-wrapper">
            <img className="offer__image" src={src} alt={`Photo ${offer.type}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferGallery;

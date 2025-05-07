import PlaceCard from '../../components/place-card/place-card';
import { Offers } from '../../types/offer';

type PlacesListProps = {
  cardType?: string;
  places: Offers;
  onCardHover?: (id: string | null) => void;
}

function PlacesList({cardType, places, onCardHover}: PlacesListProps): JSX.Element {
  return (
    <>
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          cardInfo={place}
          cardType={cardType}
          onMouseEnter={() => onCardHover?.(place.id)}
          onMouseLeave={() => onCardHover?.(null)}
        />
      ))}
    </>
  );
}

export default PlacesList;

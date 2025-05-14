import PlaceCard from '../../components/place-card/place-card';
import { Offers } from '../../types/offer';

type PlacesListProps = {
  cardType?: string;
  places: Offers;
  onCardHover?: (id: string | undefined) => void;
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
          onMouseLeave={() => onCardHover?.(undefined)}
        />
      ))}
    </>
  );
}

export default PlacesList;

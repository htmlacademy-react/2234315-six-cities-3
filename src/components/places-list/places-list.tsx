import PlaceCard from '../../components/place-card/place-card';
import { Offers } from '../../types/offer';

type PlacesListProps = {
  cardType?: string;
  places: Offers;
}

function PlacesList({cardType, places}: PlacesListProps): JSX.Element {
  return (
    <>
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          cardInfo={place}
          cardType={cardType}
        />
      ))}
    </>
  );
}

export default PlacesList;

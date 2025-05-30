import { memo, useCallback } from 'react';
import PlaceCard from '../../components/place-card/place-card';
import { Offers } from '../../types/offer';

type PlacesListProps = {
  cardType?: string;
  places: Offers;
  onCardHover?: (id?: string) => void;
}

function PlacesList({cardType, places, onCardHover}: PlacesListProps): JSX.Element {
  const handleCardHover = useCallback((id?: string) => {
    onCardHover?.(id);
  }, [onCardHover]);

  return (
    <>
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          cardInfo={place}
          cardType={cardType}
          onMouseEnter={() => handleCardHover(place.id)}
          onMouseLeave={() => handleCardHover()}
        />
      ))}
    </>
  );
}

export default memo(PlacesList);

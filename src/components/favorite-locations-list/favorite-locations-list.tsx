import FavoriteLocation from '../favorite-location/favorite-location';
import { Offers } from '../../types/offer';

type FavoriteLocationsListProps = {
  offers: Offers;
}

function FavoriteLocationsList({offers}: FavoriteLocationsListProps): JSX.Element {
  const groupedOffers = offers.reduce<{ [key: string]: Offers }>((acc, offer) => {
    const cityName = offer.city.name;

    if (!acc[cityName]) {
      acc[cityName] = [];
    }

    acc[cityName].push(offer);

    return acc;
  }, {});

  return (
    <>
      {Object.entries(groupedOffers).map(([city, cityOffers]) => (
        <FavoriteLocation
          key={city}
          city={city}
          favoritePlaces={cityOffers}
        />
      ))}
    </>
  );
}

export default FavoriteLocationsList;

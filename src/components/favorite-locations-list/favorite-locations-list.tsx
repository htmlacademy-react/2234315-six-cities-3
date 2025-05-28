import { Link } from 'react-router-dom';
import PlacesList from '../places-list/places-list';
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
        <li key={city} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            <PlacesList
              cardType="favorites"
              places={cityOffers}
            />
          </div>
        </li>
      ))}
    </>
  );
}

export default FavoriteLocationsList;

import { Link } from 'react-router-dom';
import PlacesList from '../places-list/places-list';
import { Offers } from '../../types/offer';

type FavoriteLocationProps = {
  city: string;
  favoritePlaces: Offers;
}

function FavoriteLocation({city, favoritePlaces}: FavoriteLocationProps): JSX.Element {
  return (
    <li className="favorites__locations-items" data-testid="favorite-location">
      <div className="favorites__locations locations locations--current" data-testid="locations-container">
        <div className="locations__item">
          <Link className="locations__item-link" to="#">
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places" data-testid="places-list">
        <PlacesList
          cardType="favorites"
          places={favoritePlaces}
        />
      </div>
    </li>
  );
}

export default FavoriteLocation;

import { Link } from 'react-router-dom';
import PlacesList from '../../components/places-list/places-list';
import { Offers } from '../../types/offer';

type FavoriteLocationProps = {
  city: string;
  favoritePlaces: Offers;
}

function FavoriteLocation({city, favoritePlaces}: FavoriteLocationProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
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
          places={favoritePlaces}
        />
      </div>
    </li>
  );
}

export default FavoriteLocation;

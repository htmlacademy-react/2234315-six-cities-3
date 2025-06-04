import { Link } from 'react-router-dom';
import { memo, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { City } from '../../types/offer';
import { CITIES } from '../../utils/const';
import { setActiveCity } from '../../store/app-process/app-process.slice';
import { getCity } from '../../store/app-process/app-process.selectors';

function CitiesList(): JSX.Element {
  const activeCity = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  const handleCitySelect = (evt: MouseEvent<HTMLAnchorElement>, city: City) => {
    evt.preventDefault();
    dispatch(setActiveCity(city));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li
            className="locations__item"
            key={city.name}
            data-testid="city-tab"
          >
            <Link
              className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
              to="#"
              onClick={(evt) => handleCitySelect(evt, city)}
            >
              <span>{city.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(CitiesList);

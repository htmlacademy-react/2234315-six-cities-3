import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveCity } from '../../store/actions';
import { cities } from '../../utils/const';

function CitiesList(): JSX.Element {
  const activeCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  const handleCitySelect = (evt: MouseEvent<HTMLAnchorElement>, city: string) => {
    evt.preventDefault();
    dispatch(setActiveCity(city));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li
            className="locations__item"
            key={city}
          >
            <Link
              className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
              to="#"
              onClick={(evt) => handleCitySelect(evt, city)}
            >
              <span>{city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CitiesList;

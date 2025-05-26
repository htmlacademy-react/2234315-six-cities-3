import { useState } from 'react';
import { SortType } from '../../utils/const';

type PlacesSortingProps = {
  activeSortType: SortType;
  onChangeSortType: (type: SortType) => void;
}

function PlacesSorting({activeSortType, onChangeSortType}: PlacesSortingProps): JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isFormOpen ? 'places__options--opened' : ''}`}>
        {Object.values(SortType).map((type) => (
          <li
            key={type}
            className={`places__option ${type === activeSortType ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => {
              onChangeSortType(type);
              setIsFormOpen(false);
            }}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default PlacesSorting;

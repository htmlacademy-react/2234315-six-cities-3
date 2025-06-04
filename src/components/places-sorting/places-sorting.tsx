import { memo, useState } from 'react';
import { SortType } from '../../utils/const';

type PlacesSortingProps = {
  activeSortType: SortType;
  onChangeSortType: (type: SortType) => void;
}

function PlacesSorting({activeSortType, onChangeSortType}: PlacesSortingProps): JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleChangeSortType = (sortType: SortType) => {
    onChangeSortType(sortType);
    setIsFormOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span
        className="places__sorting-caption"
        style={{ marginRight: 10 }}
      >Sort by
      </span>
      <span
        className="places__sorting-type"
        data-testid="active-sort-type"
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
            data-testid={type}
            tabIndex={0}
            onClick={() => handleChangeSortType(type)}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default memo(PlacesSorting);

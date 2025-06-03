import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitiesList from './cities-list';
import { CITIES } from '../../utils/const';
import { setActiveCity } from '../../store/app-process/app-process.slice';
import { withHistory, withStore } from '../../utils/mock-component';
import type { State } from '../../types/state';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: CitiesList', () => {
  const initialState: Partial<State> = makeFakeStore();
  const store: Partial<State> = {
    ...initialState,
    APP: {
      ...initialState.APP!,
      city: CITIES[4],
    },
  };

  it('should render correctly with cities list', () => {
    const cityTabTestId = 'city-tab';

    const { withStoreComponent } = withStore(<CitiesList />, store);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    CITIES.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });

    expect(screen.getAllByTestId(cityTabTestId)).toHaveLength(CITIES.length);
  });

  it('should mark active city with special class', () => {
    const { withStoreComponent } = withStore(<CitiesList />, store);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const activeCityTab = screen.getByText(CITIES[4].name).closest('a');
    expect(activeCityTab).toHaveClass('tabs__item--active');

    CITIES
      .filter((city) => city !== CITIES[4])
      .forEach((city) => {
        const inactiveTab = screen.getByText(city.name).closest('a');
        expect(inactiveTab).not.toHaveClass('tabs__item--active');
      });
  });

  it('should dispatch setActiveCity when city is clicked', async () => {
    const { withStoreComponent, mockStore } = withStore(<CitiesList />, store);
    const preparedComponent = withHistory(withStoreComponent);
    const user = userEvent.setup();

    render(preparedComponent);
    await user.click(screen.getByText(CITIES[1].name));

    const actions = mockStore.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe(setActiveCity.type);
    expect(actions[0].payload).toEqual(CITIES[1]);
  });

  it('should update when active city changes', () => {
    const newState: Partial<State> = {
      ...initialState,
      APP: {
        ...initialState.APP!,
        city: CITIES[2],
      },
    };

    const { withStoreComponent } = withStore(<CitiesList />, newState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const newActiveCityTab = screen.getByText(CITIES[2].name).closest('a');
    expect(newActiveCityTab).toHaveClass('tabs__item--active');

    const oldActiveCityTab = screen.getByText(CITIES[4].name).closest('a');
    expect(oldActiveCityTab).not.toHaveClass('tabs__item--active');
  });
});

import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';
import { CITIES } from '../../utils/const';

describe('Component: Main empty', () => {
  it('should render correct', () => {
    const city = CITIES[4];

    render(<MainEmpty city={city.name} />);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in/i)).toBeInTheDocument();
  });
});

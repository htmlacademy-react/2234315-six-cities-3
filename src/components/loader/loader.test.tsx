import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render correct', () => {
    const loaderContainerTestId = 'loader-container';

    render(<Loader />);

    const loaderContainer = screen.getByTestId(loaderContainerTestId);

    expect(loaderContainer).toBeInTheDocument();
  });
});

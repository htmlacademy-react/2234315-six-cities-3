import { render, screen } from '@testing-library/react';
import Layout from './layout';
import { withHistory, withStore } from '../../utils/mock-component';
import { HelmetProvider } from 'react-helmet-async';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: Layout', () => {
  const store = makeFakeStore();
  const mockPageTitle = 'Test Page Title';
  const mockChildren = <div data-testid="test-children">Test Content</div>;

  it('should render correctly with all props', () => {
    const { withStoreComponent } = withStore(
      <HelmetProvider>
        <Layout
          pageTitle={mockPageTitle}
          className="test-class"
          withFooter
        >
          {mockChildren}
        </Layout>
      </HelmetProvider>,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('test-children')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByTestId('layout')).toHaveClass('page', 'test-class');
  });

  it('should render without footer when withFooter is false', () => {
    const { withStoreComponent } = withStore(
      <HelmetProvider>
        <Layout
          pageTitle={mockPageTitle}
          withFooter={false}
        >
          {mockChildren}
        </Layout>
      </HelmetProvider>,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('test-children')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  });

  it('should apply correct className', () => {
    const testClass = 'custom-page-class';
    const { withStoreComponent } = withStore(
      <HelmetProvider>
        <Layout
          pageTitle={mockPageTitle}
          className={testClass}
        >
          {mockChildren}
        </Layout>
      </HelmetProvider>,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('layout')).toHaveClass('page', testClass);
  });

  it('should render children content', () => {
    const customChildren = <div data-testid="custom-content">Custom Content</div>;
    const { withStoreComponent } = withStore(
      <HelmetProvider>
        <Layout
          pageTitle={mockPageTitle}
        >
          {customChildren}
        </Layout>
      </HelmetProvider>,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('should render with default props correctly', () => {
    const { withStoreComponent } = withStore(
      <HelmetProvider>
        <Layout
          pageTitle={mockPageTitle}
        >
          {mockChildren}
        </Layout>
      </HelmetProvider>,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('test-children')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    expect(screen.getByTestId('layout')).toHaveClass('page');
    expect(screen.getByTestId('layout')).not.toHaveClass('undefined');
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppRoute, AUTH_PASSWORD_PATTERN, CITIES, PageTitle } from '../../utils/const';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { withHistory, withStore } from '../../utils/mock-component';
import { City } from '../../types/offer';
import { AuthData } from '../../types/auth-data';
import { makeFakeStore } from '../../utils/mocks';
import { PayloadAction } from '@reduxjs/toolkit';
import Login from './login';

type MockSetActiveCityAction = PayloadAction<City> & {
  type: 'MOCK_SET_ACTIVE_CITY';
};

const mockSetActiveCity = vi.fn((city: City): MockSetActiveCityAction => ({
  type: 'MOCK_SET_ACTIVE_CITY',
  payload: city,
}));

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(() => vi.fn()),
}));

vi.mock('../../store/api-actions', () => ({
  loginAction: vi.fn((credentials: AuthData) => ({
    type: 'MOCK_LOGIN_ACTION',
    payload: credentials,
  })),
}));

vi.mock('../../store/app-process/app-process.slice', () => ({
  setActiveCity: (city: City) => mockSetActiveCity(city),
}));

vi.mock('../../components/layout/layout', () => ({
  default: vi.fn(({ children, pageTitle, className }: { pageTitle: string; className: string; children: JSX.Element }) => (
    <div className={className} data-testid="layout">
      <title>{pageTitle}</title>
      {children}
    </div>
  )),
}));

describe('Component: Login', () => {
  const mockDispatch = vi.fn();
  const store = makeFakeStore();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    mockSetActiveCity.mockImplementation((city: City) => ({
      type: 'MOCK_SET_ACTIVE_CITY',
      payload: city,
    }));
  });

  const renderLogin = () => {
    const { withStoreComponent } = withStore(<Login />, store);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
  };

  it('should render correctly', () => {
    renderLogin();

    expect(screen.getByRole('heading', { level: 1, name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByTestId('layout')).toHaveClass('page--gray');
    expect(screen.getByTestId('layout')).toHaveClass('page--login');
    expect(screen.getByText(`${PageTitle.Login} | ${PageTitle.Main}`)).toBeInTheDocument();
  });

  it('should display password validation message', () => {
    renderLogin();

    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toHaveAttribute('pattern', AUTH_PASSWORD_PATTERN);
    expect(passwordInput).toHaveAttribute(
      'title',
      'The password should contain at least one letter and one number.'
    );
  });

  it('should submit form with email and password', async () => {
    const testEmail = 'test@example.com';
    const testPassword = 'password1';

    renderLogin();

    await userEvent.type(screen.getByPlaceholderText('Email'), testEmail);
    await userEvent.type(screen.getByPlaceholderText('Password'), testPassword);
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(loginAction).toHaveBeenCalledWith({
      login: testEmail,
      password: testPassword,
    });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should not submit form with invalid inputs', async () => {
    renderLogin();

    const submitButton = screen.getByRole('button', { name: 'Sign in' });
    await userEvent.click(submitButton);

    expect(loginAction).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalledWith(loginAction);
  });

  it('should show random city link', () => {
    renderLogin();

    const cityLinks = CITIES.map((city) => city.name);
    const displayedCity = screen.getByText(/Paris|Cologne|Brussels|Amsterdam|Hamburg|Dusseldorf/i);
    expect(cityLinks).toContain(displayedCity.textContent);
  });

  it('should dispatch setActiveCity when city link is clicked', async () => {
    renderLogin();

    const cityLink = screen.getByText(/Paris|Cologne|Brussels|Amsterdam|Hamburg|Dusseldorf/i);
    await userEvent.click(cityLink);

    expect(mockSetActiveCity).toHaveBeenCalled();
  });

  it('should navigate to main page when city link is clicked', () => {
    renderLogin();

    const cityLink = screen.getByText(/Paris|Cologne|Brussels|Amsterdam|Hamburg|Dusseldorf/i).closest('a');
    expect(cityLink).toHaveAttribute('href', AppRoute.Main);
  });
});

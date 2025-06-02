import { AuthorizationStatus } from '../../utils/const';
import { makeFakeUserData } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process.slice';


describe ('UserProcess slice', ()=> {
  const mockUser = makeFakeUserData();

  it ('should return initial state with empty action', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null
    };
    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it ('should return default initial state with empty action and undefined state', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
    };
    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "AuthorizationStatus" to "Auth" and user data with "checkAuthAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUser,
    };
    const result = userProcess.reducer(
      initialState,
      checkAuthAction.fulfilled(mockUser, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "AuthorizationStatus" to "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
    };
    const result = userProcess.reducer(
      initialState,
      checkAuthAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "AuthorizationStatus" to "Auth" and user data with "loginAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUser,
    };
    const result = userProcess.reducer(
      initialState,
      loginAction.fulfilled(mockUser, '', { login: 'test@test.com', password: '1a' })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "AuthorizationStatus" to "NoAuth" with "loginAction.rejected" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
    };
    const result = userProcess.reducer(
      initialState,
      loginAction.rejected(null, '', { login: 'test@test.com', password: '12' })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "AuthorizationStatus" to "NoAuth" and null user data with "logoutAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUser,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
    };
    const result = userProcess.reducer(
      initialState,
      logoutAction.fulfilled
    );

    expect(result).toEqual(expectedState);
  });
});

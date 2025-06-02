import { AuthorizationStatus, NameSpace } from '../../utils/const';
import { makeFakeUserData } from '../../utils/mocks';
import { getAuthorizationStatus, getUserData } from './user-process.selectors';

describe('UserProcess selectors', () => {
  const mockUserData = makeFakeUserData();

  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData,
    }
  };

  it('should return authorization status', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthorizationStatus(state);

    expect(result).toBe(authorizationStatus);
  });

  it('should return user data from state', () => {
    const { userData } = state[NameSpace.User];
    const result = getUserData(state);

    expect(result).toEqual(userData);
  });
});

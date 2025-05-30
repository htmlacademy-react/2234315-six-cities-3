import { State } from '../../types/state';
import { UserData } from '../../types/user-data';
import { AuthorizationStatus, NameSpace } from '../../utils/const';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserData = (state: Pick<State, NameSpace.User>): UserData | null => state[NameSpace.User].userData;

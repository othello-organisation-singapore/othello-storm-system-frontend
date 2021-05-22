import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { parse } from 'cookie';
import { useHistory } from 'react-router-dom';

import { message } from 'antd';

import { UserRole, HttpMethod } from 'utils/enums';
import useFetch from 'hooks/useFetch';
import useToastPushError from 'hooks/useToastPushError';
import { LoginResponse, User } from 'utils/apiResponseShape';
import { setCookie, removeCookie } from 'utils/cookie';

type LoginCallback = (username: string, password: string) => void;

interface UserContext {
  user?: User;
  isLoggedIn: boolean;
  logout: () => void;
  login: LoginCallback;
  isLoading: boolean;
  updateCurrentUser: () => void;
}

const UserContext = createContext(null);
export const useUserContext = (): UserContext => useContext(UserContext);

const getLoggedInUserData = (): LoginResponse => {
  const { username, displayName, jwt, role = UserRole.Visitor } = parse(
    document.cookie
  );
  return { username, displayName, jwt, role: role as UserRole };
};

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(getLoggedInUserData());
  const refreshUser = useCallback(() => setUser(getLoggedInUserData()), []);
  const history = useHistory();

  const { request: loginRequest, isLoading } = useFetch<LoginResponse>();
  const { request: currentUserRequest } = useFetch<User>();
  const { pushError } = useToastPushError();

  const logout = useCallback(() => {
    removeCookie('username');
    removeCookie('displayName');
    removeCookie('role');
    removeCookie('jwt');
    message.info('You have been logged out', 1.5);
    refreshUser();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const { response, error } = await loginRequest(
      '/api/login/',
      HttpMethod.POST,
      { username, password }
    );

    if (response === '') {
      pushError(error.code);
      return;
    }

    const { jwt, username: loggedInUsername, displayName, role } = response;
    setCookie('username', loggedInUsername);
    setCookie('displayName', displayName);
    setCookie('role', role);
    setCookie('jwt', jwt);
    message.info('You have been logged in', 1.5);
    refreshUser();
    history.push('/');
    return;
  }, []);

  const updateCurrentUser = useCallback(async () => {
    const { response, error } = await currentUserRequest(
      '/api/profile/',
      HttpMethod.GET
    );

    if (response === '') {
      pushError(error.code);
      return;
    }

    const { username: loggedInUsername, displayName, role } = response;
    setCookie('username', loggedInUsername);
    setCookie('displayName', displayName);
    setCookie('role', role);
    refreshUser();
    return;
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: user.role !== UserRole.Visitor,
        logout,
        login,
        isLoading,
        updateCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

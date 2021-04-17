import { createContext, ReactNode, useContext, useState } from 'react';
import { parse } from 'cookie';

import { UserRole, HttpMethod, HttpErrorCode } from 'enums';
import useFetch from 'hooks/useFetch';
import { HttpResponseError } from 'interfaces';

interface User {
  username?: string;
  displayName?: string;
  role: UserRole;
  jwt?: string;
}

interface UserContext {
  user?: User;
  isLoggedIn: boolean;
  logout: Function;
  login: Function;
  isLoginLoading: boolean;
  loginErrorDetails: HttpResponseError;
}

const UserContext = createContext({
  user: { role: UserRole.Visitor },
  isLoggedIn: false,
  logout: () => {},
  login: (_username: string, _password: string) => {},
  isLoginLoading: false,
  loginErrorDetails: { code: HttpErrorCode.NoError, message: '' },
});
export const useUserContext = (): UserContext => useContext(UserContext);

const getLoggedInUserData = (): User => {
  const { username, displayName, jwt, role = UserRole.Visitor } = parse(
    document.cookie
  );
  return { username, displayName, jwt, role: role as UserRole };
};

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(getLoggedInUserData());
  const refreshUser = () => setUser(getLoggedInUserData());

  const {
    request: loginRequest,
    isLoading: isLoginLoading,
    error: loginErrorDetails,
  } = useFetch();

  const logout = () => {
    document.cookie = '';
    refreshUser();
  };
  const login = async (username: string, password: string) => {
    const response = await loginRequest('/api/login', HttpMethod.POST, {
      username,
      password,
    });
    const { jwt, username: loggedInUsername, displayName, role } = response;
    document.cookie = `username=${loggedInUsername}; jwt=${jwt}; displayName=${displayName}; role=${role}`;
    refreshUser();
    return;
  };
  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: user.role !== UserRole.Visitor,
        logout,
        login,
        isLoginLoading,
        loginErrorDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

import { createContext, ReactNode, useContext, useState } from 'react';
import { parse } from 'cookie';

import { UserRole } from 'enums';

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
}

const UserContext = createContext({
  user: { role: UserRole.Visitor },
  isLoggedIn: false,
  logout: () => {},
  login: () => {},
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
  const logout = () => console.log('log out');
  const login = () => console.log('log in');
  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: user.role !== UserRole.Visitor,
        logout,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

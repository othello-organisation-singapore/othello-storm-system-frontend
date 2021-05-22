import { UserRole } from 'utils/enums';

export interface User {
  username: string;
  displayName: string;
  role: UserRole;
}

export interface LoginResponse extends User {
  jwt: string;
}

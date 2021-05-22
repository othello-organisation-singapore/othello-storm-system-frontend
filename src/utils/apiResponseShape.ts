import { UserRole } from 'utils/enums';

export interface UserResponse {
  jwt: string;
  username: string;
  displayName: string;
  role: UserRole;
}

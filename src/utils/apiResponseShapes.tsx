import { UserRoles, TournamentTypes } from 'utils/enums';

export interface User {
  username: string;
  displayName: string;
  role: UserRoles;
}

export interface LoginResponse extends User {
  jwt: string;
}

export interface MessageResponse {
  message: string;
}

export interface TournamentPreview {
  id: number;
  name: string;
  tournamentType: TournamentTypes;
  country: string;
  creatorUsername: string;
  startDate: string;
  endDate: string;
}

export interface TournamentListResponse {
  tournaments: TournamentPreview[];
}

export interface TournamentCreator {
  username: string;
  displayName: string;
}

export interface TournamentDetails {
  id: number;
  name: string;
  tournamentType: TournamentTypes;
  country: string;
  startDate: string;
  endDate: string;
  creator: TournamentCreator;
}

export interface TournamentAdminListResponse {
  admins: User[];
}

export interface TournamentPotentialAdminListResponse {
  potentialAdmins: User[];
}

export interface JoueursPlayer {
  joueursId: string;
  firstName: string;
  lastName: string;
  country: string;
  rating: string;
}

export interface Player extends JoueursPlayer {
  id: number;
}

export interface TournamentPlayerListResponse {
  tournamentId: number;
  players: Player[];
}

export interface TournamentJoueursPlayerListResponse {
  tournamentId: number;
  joueursPlayers: JoueursPlayer[];
}

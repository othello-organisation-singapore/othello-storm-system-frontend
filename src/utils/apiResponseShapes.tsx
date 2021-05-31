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

export interface TournamentsResponse {
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

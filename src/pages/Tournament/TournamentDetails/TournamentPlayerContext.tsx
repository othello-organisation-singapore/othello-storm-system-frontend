import React, { useContext, createContext, ReactNode } from 'react';
import differenceBy from 'lodash/differenceBy';
import keyBy from 'lodash/keyBy';

import useGet from 'hooks/useGet';
import {
  TournamentPlayerListResponse,
  TournamentJoueursPlayerListResponse,
  TournamentDetails,
  Player,
  JoueursPlayer,
} from 'utils/apiResponseShapes';

export interface PlayersById {
  [id: number]: Player;
}

interface TournamentPlayerContextShape {
  players: Player[];
  joueursPlayers: JoueursPlayer[];
  refresh: () => void;
  playersById: PlayersById;
}

const TournamentPlayerContext = createContext<TournamentPlayerContextShape>(
  null
);
export const useTournamentPlayerContext = () =>
  useContext(TournamentPlayerContext);

interface TournamentPlayerProviderProps {
  tournament: TournamentDetails;
  children: ReactNode;
  skipJoueursLoad: boolean;
}

function TournamentPlayerProvider({
  tournament,
  children,
  skipJoueursLoad,
}: TournamentPlayerProviderProps) {
  const {
    data: playerListData,
    refresh: refreshPlayers,
  } = useGet<TournamentPlayerListResponse>(
    `/api/tournaments/${tournament.id}/players/`
  );

  const {
    data: joueursPlayerListData,
  } = useGet<TournamentJoueursPlayerListResponse>(
    `/api/tournaments/${tournament.id}/joueurs_players/`,
    {},
    { skip: skipJoueursLoad }
  );

  const joueursData: TournamentJoueursPlayerListResponse = skipJoueursLoad
    ? { joueursPlayers: [], tournamentId: tournament.id }
    : joueursPlayerListData;

  return (
    playerListData &&
    joueursData && (
      <TournamentPlayerContext.Provider
        value={{
          players: playerListData.players,
          joueursPlayers: differenceBy(
            joueursData.joueursPlayers,
            playerListData.players,
            player => player.joueursId
          ),
          refresh: refreshPlayers,
          playersById: keyBy(playerListData.players, player => player.id),
        }}
      >
        {children}
      </TournamentPlayerContext.Provider>
    )
  );
}

export default TournamentPlayerProvider;

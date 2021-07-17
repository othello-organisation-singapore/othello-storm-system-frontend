import React, { useContext, createContext, ReactNode } from 'react';

import useGet from 'hooks/useGet';
import {
  RoundPreview,
  TournamentDetails,
  TournamentRoundsResponse,
} from 'utils/apiResponseShapes';

interface TournamentRoundContextShape {
  rounds: RoundPreview[];
  refresh: () => void;
}

const TournamentRoundContext = createContext<TournamentRoundContextShape>(null);
export const useTournamentRoundContext = () =>
  useContext(TournamentRoundContext);

interface TournamentRoundProviderProps {
  tournament: TournamentDetails;
  children: ReactNode;
}

function TournamentRoundProvider({
  tournament,
  children,
}: TournamentRoundProviderProps) {
  const { data, refresh } = useGet<TournamentRoundsResponse>(
    `/api/tournaments/${tournament.id}/rounds/`
  );

  return (
    data && (
      <TournamentRoundContext.Provider value={{ rounds: data.rounds, refresh }}>
        {children}
      </TournamentRoundContext.Provider>
    )
  );
}

export default TournamentRoundProvider;

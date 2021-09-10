import React, { useContext, createContext, ReactNode } from 'react';

import { TournamentDetails } from 'utils/apiResponseShapes';

interface TournamentInfoContextShape {
  tournament: TournamentDetails;
  refresh: () => void;
}

const TournamentInfoContext = createContext<TournamentInfoContextShape>(null);
export const useTournamentInfoContext = () => useContext(TournamentInfoContext);

interface TournamentInfoProviderProps {
  tournament: TournamentDetails;
  refresh: () => void;
  children: ReactNode;
}

function TournamentInfoProvider({
  tournament,
  refresh,
  children,
}: TournamentInfoProviderProps) {
  return (
    <TournamentInfoContext.Provider value={{ tournament, refresh }}>
      {children}
    </TournamentInfoContext.Provider>
  );
}

export default TournamentInfoProvider;

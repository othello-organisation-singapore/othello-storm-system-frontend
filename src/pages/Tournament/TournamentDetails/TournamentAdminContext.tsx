import React, { useContext, createContext, ReactNode } from 'react';

import useGet from 'hooks/useGet';
import {
  TournamentAdminListResponse,
  TournamentPotentialAdminListResponse,
  TournamentDetails,
  User,
} from 'utils/apiResponseShapes';

interface TournamentAdminContextShape {
  admins: User[];
  potentialAdmins: User[];
  refresh: () => void;
}

const TournamentAdminContext = createContext<TournamentAdminContextShape>(null);
export const useTournamentAdminContext = () =>
  useContext(TournamentAdminContext);

interface TournamentAdminProviderProps {
  tournament: TournamentDetails;
  children: ReactNode;
}

function TournamentAdminProvider({
  tournament,
  children,
}: TournamentAdminProviderProps) {
  const {
    data: adminData,
    refresh: refreshAdmin,
  } = useGet<TournamentAdminListResponse>(
    `/api/tournaments/${tournament.id}/admins/`
  );

  const {
    data: potentialAdminData,
    refresh: refreshPotentialAdmin,
  } = useGet<TournamentPotentialAdminListResponse>(
    `/api/tournaments/${tournament.id}/potential_admins/`
  );

  return (
    adminData &&
    potentialAdminData && (
      <TournamentAdminContext.Provider
        value={{
          admins: adminData.admins,
          potentialAdmins: potentialAdminData.potentialAdmins,
          refresh: () => {
            refreshAdmin();
            refreshPotentialAdmin();
          },
        }}
      >
        {children}
      </TournamentAdminContext.Provider>
    )
  );
}

export default TournamentAdminProvider;

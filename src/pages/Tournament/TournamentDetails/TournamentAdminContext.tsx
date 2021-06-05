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
  isLoading: boolean;
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
    isLoading: isAdminLoading,
  } = useGet<TournamentAdminListResponse>(
    `/api/tournaments/${tournament.id}/admins/`
  );

  const {
    data: potentialAdminData,
    refresh: refreshPotentialAdmin,
    isLoading: isPotentialAdminLoading,
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
          isLoading: isAdminLoading || isPotentialAdminLoading,
        }}
      >
        {children}
      </TournamentAdminContext.Provider>
    )
  );
}

export default TournamentAdminProvider;

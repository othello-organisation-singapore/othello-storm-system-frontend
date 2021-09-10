import React from 'react';

import { useProgressiveContext } from 'components/ProgressiveContext';
import useGet from 'hooks/useGet';
import { TournamentListResponse } from 'utils/apiResponseShapes';
import { ScreenTypes } from 'utils/enums';
import {
  DesktopTournamentListTable,
  MobileTournamentListTable,
  TournamentListPageTitle,
} from './parts';

function AllTournamentsPage() {
  const { data, refresh, isLoading } = useGet<TournamentListResponse>(
    '/api/tournaments/'
  );
  const { screenType } = useProgressiveContext();
  return (
    <>
      <TournamentListPageTitle
        title="All Tournaments"
        onCreateNewTournament={refresh}
      />
      {data &&
        !isLoading &&
        (screenType === ScreenTypes.Desktop ? (
          <DesktopTournamentListTable
            tournaments={data.tournaments.slice().reverse()}
          />
        ) : (
          <MobileTournamentListTable
            tournaments={data.tournaments.slice().reverse()}
          />
        ))}
    </>
  );
}
export default AllTournamentsPage;

import React from 'react';

import { useProgressiveContext } from 'components/ProgressiveContext';
import useGet from 'hooks/useGet';
import { TournamentsResponse } from 'utils/apiResponseShapes';
import { ScreenTypes } from 'utils/enums';
import {
  DesktopTournamentListTable,
  MobileTournamentListTable,
  TournamentListPageTitle,
} from './parts';

function AllTournamentsPage() {
  const { data, refresh } = useGet<TournamentsResponse>('/api/tournaments/');
  const { screenType } = useProgressiveContext();
  return (
    <>
      <TournamentListPageTitle
        title="All Tournaments"
        onCreateNewTournament={refresh}
      />
      {data &&
        (screenType === ScreenTypes.Desktop ? (
          <DesktopTournamentListTable tournaments={data.tournaments} />
        ) : (
          <MobileTournamentListTable tournaments={data.tournaments} />
        ))}
    </>
  );
}
export default AllTournamentsPage;

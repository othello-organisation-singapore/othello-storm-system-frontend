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

function CreatedTournamentsPage() {
  const { data, refresh } = useGet<TournamentListResponse>(
    '/api/tournaments/created_by_me/'
  );
  const { screenType } = useProgressiveContext();
  return (
    <>
      <TournamentListPageTitle
        title="Tournaments Created by Me"
        onCreateNewTournament={refresh}
      />
      {data &&
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

export default CreatedTournamentsPage;

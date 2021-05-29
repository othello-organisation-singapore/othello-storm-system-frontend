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

function CreatedTournamentsPage() {
  const { data } = useGet<TournamentsResponse>(
    '/api/tournaments/created_by_me/'
  );
  const { screenType } = useProgressiveContext();
  return (
    <>
      <TournamentListPageTitle title="Tournaments Created by Me" />
      {data &&
        (screenType === ScreenTypes.Desktop ? (
          <DesktopTournamentListTable tournaments={data.tournaments} />
        ) : (
          <MobileTournamentListTable tournaments={data.tournaments} />
        ))}
    </>
  );
}

export default CreatedTournamentsPage;

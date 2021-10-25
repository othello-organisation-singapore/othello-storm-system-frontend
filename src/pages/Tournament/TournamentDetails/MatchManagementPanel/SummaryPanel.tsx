import React from 'react';
import styled from 'styled-components';

import { Row } from 'components/common';
import DownloadELOButton from './DownloadELOButton';
import { useTournamentInfoContext } from '../TournamentInfoContext';

const StyledRow = styled(Row)`
  margin-top: 12px;
  margin-bottom: 12px;
`;

function SummaryPanel() {
  const { tournament } = useTournamentInfoContext();

  return (
    tournament && (
      <StyledRow>
        <DownloadELOButton tournamentId={tournament.id} />
      </StyledRow>
    )
  );
}

export default SummaryPanel;

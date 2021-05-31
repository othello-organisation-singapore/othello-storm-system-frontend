import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

import { Row, PageTitle, PageWrapper } from 'components/common';
import { useUserContext } from 'components/UserContext';
import useGet from 'hooks/useGet';
import { TournamentDetails } from 'utils/apiResponseShapes';
import TournamentInfoProvider from './TournamentInfoContext';
import BasicInfoPanel from './BasicInfoPanel';
import BasicInfoEditPanel from './BasicInfoEditPanel';

const StyledRow = styled(Row)`
  justify-content: center;
`;

interface TournamentDetailsParams {
  tournamentId: string;
}

function TournamentDetailsPage() {
  const { tournamentId } = useParams<TournamentDetailsParams>();
  const { data, refresh } = useGet<TournamentDetails>(
    `/api/tournaments/${tournamentId}/`
  );

  const { isLoggedIn } = useUserContext();

  return (
    data && (
      <TournamentInfoProvider tournament={data} refresh={refresh}>
        <PageWrapper>
          <StyledRow>
            <PageTitle>{data.name}</PageTitle>
          </StyledRow>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Basic Info">
              {isLoggedIn ? <BasicInfoEditPanel /> : <BasicInfoPanel />}
            </TabPane>
          </Tabs>
        </PageWrapper>
      </TournamentInfoProvider>
    )
  );
}

export default TournamentDetailsPage;

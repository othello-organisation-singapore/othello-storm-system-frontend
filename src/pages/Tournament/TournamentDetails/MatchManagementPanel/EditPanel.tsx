import React from 'react';
import styled from 'styled-components';
import sortBy from 'lodash/sortBy';

import { Tabs } from 'antd';

import useRefreshKey from 'hooks/useRefreshKey';
import NewMatchSubpanel from './NewMatchSubpanel';
import { useTournamentRoundContext } from '../TournamentRoundContext';

const { TabPane } = Tabs;

const MatchesPanelWrapper = styled.div`
  margin: 0 15px;
`;

function MatchesEditPanel() {
  const { refreshKey, refresh } = useRefreshKey();
  const { rounds } = useTournamentRoundContext();
  return (
    <MatchesPanelWrapper>
      <Tabs defaultActiveKey="0" onChange={refresh}>
        <TabPane tab="Create New Match" key="0">
          <NewMatchSubpanel key={refreshKey} />
        </TabPane>
        {sortBy(rounds, 'id').map((round, idx) => (
          <TabPane tab={round.name} key={idx + 1}>
            {round.name}
          </TabPane>
        ))}
      </Tabs>
    </MatchesPanelWrapper>
  );
}

export default MatchesEditPanel;

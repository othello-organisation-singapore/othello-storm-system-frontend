import React from 'react';
import styled from 'styled-components';
import sortBy from 'lodash/sortBy';

import { Tabs } from 'antd';

import NewRoundSubpanel from './NewRoundSubpanel';
import RoundEditSubpanel from './RoundEditSubpanel';
import { useTournamentRoundContext } from '../TournamentRoundContext';

const { TabPane } = Tabs;

const MatchesPanelWrapper = styled.div`
  @media only screen and (min-width: 400px) {
    margin: 0 15px;
  }
`;

function MatchesEditPanel() {
  const { rounds, refresh: refreshRounds } = useTournamentRoundContext();
  return (
    <MatchesPanelWrapper>
      <Tabs defaultActiveKey="0">
        <TabPane tab="Create New Round" key="0">
          <NewRoundSubpanel />
        </TabPane>
        {sortBy(rounds, 'id').map(round => (
          <TabPane tab={round.name} key={round.id}>
            <RoundEditSubpanel
              roundId={round.id}
              refreshRounds={refreshRounds}
            />
          </TabPane>
        ))}
      </Tabs>
    </MatchesPanelWrapper>
  );
}

export default MatchesEditPanel;

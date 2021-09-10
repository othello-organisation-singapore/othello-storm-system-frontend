import React from 'react';
import styled from 'styled-components';
import sortBy from 'lodash/sortBy';

import { Tabs, Empty } from 'antd';

import RoundInfoSubpanel from './RoundInfoSubpanel';
import { useTournamentRoundContext } from '../TournamentRoundContext';

const { TabPane } = Tabs;

const MatchesPanelWrapper = styled.div`
  @media only screen and (min-width: 400px) {
    margin: 0 15px;
  }
`;

function MatchesPanel() {
  const { rounds } = useTournamentRoundContext();
  return (
    rounds && (
      <MatchesPanelWrapper>
        {rounds.length > 0 ? (
          <Tabs defaultActiveKey="0">
            {sortBy(rounds, 'id').map(round => (
              <TabPane tab={round.name} key={round.id}>
                <RoundInfoSubpanel roundId={round.id} />
              </TabPane>
            ))}
          </Tabs>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </MatchesPanelWrapper>
    )
  );
}

export default MatchesPanel;

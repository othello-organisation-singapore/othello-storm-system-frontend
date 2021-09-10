import React from 'react';
import styled from 'styled-components';

import { List, Avatar, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { Row } from 'components/common';
import { Player } from 'utils/apiResponseShapes';
import { useTournamentPlayerContext } from '../TournamentPlayerContext';

const StyledList = styled(List)`
  max-width: 500px;
`;

const StyledListItem = styled(List.Item)`
  display: flex;
  justify-content: space-between;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 12px;
`;

const PlayerName = styled.div`
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media only screen and (max-width: 500px) {
    max-width: 240px;
  }
`;

function PlayersPanel() {
  const { players } = useTournamentPlayerContext();

  return (
    players && (
      <>
        {players.length > 0 ? (
          <StyledList
            dataSource={players}
            renderItem={(item: Player) => (
              <StyledListItem>
                <Row>
                  <StyledAvatar icon={<UserOutlined />} />
                  <PlayerName>
                    {item.lastName} {item.firstName} ({item.country})
                  </PlayerName>
                </Row>
              </StyledListItem>
            )}
            header="Tournament's Players"
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </>
    )
  );
}

export default PlayersPanel;

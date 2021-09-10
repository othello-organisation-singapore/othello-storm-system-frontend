import React from 'react';
import styled from 'styled-components';

import { List, Button, Avatar } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';

import { Row } from 'components/common';
import useFetch from 'hooks/useFetch';
import useToastPushSubmit from 'hooks/useToastPushSubmit';
import { MessageResponse, Player } from 'utils/apiResponseShapes';
import { AddPlayerFromJoueursButton, AddNewPlayerButton } from './parts';
import { useTournamentInfoContext } from '../TournamentInfoContext';
import { useTournamentPlayerContext } from '../TournamentPlayerContext';

const StyledRow = styled(Row)`
  margin-top: 12px;
  margin-bottom: 12px;
  gap: 8px;
`;

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

function PlayersEditPanel() {
  const { tournament } = useTournamentInfoContext();
  const { players, refresh } = useTournamentPlayerContext();

  const { request, isLoading } = useFetch<MessageResponse>();
  const { pushError, pushSuccess } = useToastPushSubmit();

  const handleRemovePlayer = async (id: number) => {
    const { response, error } = await request(
      `/api/tournaments/${tournament.id}/players/${id}/`,
      'DELETE'
    );

    if (response === '') {
      pushError(error.code);
    } else {
      pushSuccess('Player removed');
      refresh();
    }
  };

  return (
    players && (
      <>
        <StyledRow>
          <AddPlayerFromJoueursButton onSuccess={refresh} />
          <AddNewPlayerButton onSuccess={refresh} />
        </StyledRow>
        {players.length > 0 && (
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
                <Button
                  danger
                  type="text"
                  disabled={isLoading}
                  onClick={() => handleRemovePlayer(item.id)}
                >
                  <DeleteOutlined />
                </Button>
              </StyledListItem>
            )}
            header="Tournament's Players"
          />
        )}
      </>
    )
  );
}

export default PlayersEditPanel;

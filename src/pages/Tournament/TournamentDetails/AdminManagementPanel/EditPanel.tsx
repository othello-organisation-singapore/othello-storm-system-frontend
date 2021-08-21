import React from 'react';
import styled from 'styled-components';

import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, List } from 'antd';

import { Row } from 'components/common';
import useFetch from 'hooks/useFetch';
import { MessageResponse, User } from 'utils/apiResponseShapes';
import useToastPushSubmit from 'hooks/useToastPushSubmit';
import { AddNewAdminButton } from './parts';
import { useTournamentInfoContext } from '../TournamentInfoContext';
import { useTournamentAdminContext } from '../TournamentAdminContext';

const StyledRow = styled(Row)`
  margin-top: 12px;
  margin-bottom: 12px;
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

function AdministratorsPanel() {
  const { tournament } = useTournamentInfoContext();
  const { admins, refresh } = useTournamentAdminContext();

  const { request, isLoading } = useFetch<MessageResponse>();
  const { pushError, pushSuccess } = useToastPushSubmit();

  const handleRemoveAdmin = async (username: string) => {
    const { response, error } = await request(
      `/api/tournaments/${tournament.id}/admins/${username}/`,
      'DELETE'
    );

    if (response === '') {
      pushError(error.code);
    } else {
      pushSuccess('Admin removed');
      refresh();
    }
  };

  return (
    <>
      <StyledRow>
        <AddNewAdminButton onSuccess={refresh} />
      </StyledRow>
      {admins.length > 0 && (
        <StyledList
          dataSource={admins}
          renderItem={(item: User) => (
            <StyledListItem>
              <div>
                <StyledAvatar icon={<UserOutlined />} />
                {item.displayName}
              </div>
              <Button
                danger
                type="text"
                disabled={isLoading}
                onClick={() => handleRemoveAdmin(item.username)}
              >
                <DeleteOutlined />
              </Button>
            </StyledListItem>
          )}
          header="Tournament's Admins"
        />
      )}
    </>
  );
}

export default AdministratorsPanel;

import React from 'react';
import styled from 'styled-components';

import { List, Button, Avatar } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';

import { Row } from 'components/common';
import useFetch from 'hooks/useFetch';
import useToastPushSubmit from 'hooks/useToastPushSubmit';
import { MessageResponse, User } from 'utils/apiResponseShapes';
import { useTournamentAdminContext } from './TournamentAdminContext';
import { useTournamentInfoContext } from './TournamentInfoContext';
import { AddNewAdminButton } from './parts';

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

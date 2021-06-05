import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Modal, Select } from 'antd';

import useFetch from 'hooks/useFetch';
import useToastPushSubmit from 'hooks/useToastPushSubmit';
import { MessageResponse } from 'utils/apiResponseShapes';
import { ClosableComponentProps } from 'utils/interfaces';
import { useTournamentInfoContext } from './TournamentInfoContext';
import { useTournamentAdminContext } from './TournamentAdminContext';

const StyledSelect = styled(Select)`
  width: 300px;
`;

interface AddNewAdminDialogProps extends ClosableComponentProps {
  onSuccess: () => void;
}

export function AddNewAdminDialog({
  isOpen,
  handleClose,
  onSuccess,
}: AddNewAdminDialogProps) {
  const { tournament } = useTournamentInfoContext();
  const { potentialAdmins } = useTournamentAdminContext();
  const { request, isLoading } = useFetch<MessageResponse>();
  const { pushError, pushSuccess } = useToastPushSubmit();

  const [selectedUsername, setSelectedUsername] = useState(null);
  const handleSubmit = async () => {
    const { response, error } = await request(
      `/api/tournaments/${tournament.id}/admins/`,
      'POST',
      {
        username: selectedUsername,
      }
    );
    if (response === '') {
      pushError(error.code);
    } else {
      pushSuccess('Admin added');
      onSuccess();
      handleClose();
    }
  };

  return (
    <Modal
      title="Add New Admin"
      visible={isOpen}
      onCancel={handleClose}
      footer={[
        <Button onClick={handleClose}>Cancel</Button>,
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={isLoading}
          disabled={selectedUsername === null}
        >
          Submit
        </Button>,
      ]}
    >
      <StyledSelect value={selectedUsername} onChange={setSelectedUsername}>
        {potentialAdmins.map(({ username, displayName }) => (
          <Select.Option key={username} value={username}>
            {displayName}
          </Select.Option>
        ))}
      </StyledSelect>
    </Modal>
  );
}

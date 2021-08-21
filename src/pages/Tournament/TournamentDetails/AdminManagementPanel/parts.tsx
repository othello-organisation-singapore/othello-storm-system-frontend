import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Modal, Select } from 'antd';

import { ClosableComponentProps } from 'utils/interfaces';
import useFetch from 'hooks/useFetch';
import { MessageResponse } from 'utils/apiResponseShapes';
import useToastPushSubmit from 'hooks/useToastPushSubmit';
import { useTournamentInfoContext } from '../TournamentInfoContext';
import { useTournamentAdminContext } from '../TournamentAdminContext';

interface AddNewAdminButtonProps {
  onSuccess: () => void;
}
export function AddNewAdminButton({ onSuccess }: AddNewAdminButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Add New Admin
      </Button>
      <AddNewAdminDialog
        onSuccess={onSuccess}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </>
  );
}

interface AddNewAdminDialogProps extends ClosableComponentProps {
  onSuccess: () => void;
}

const StyledSelect = styled(Select)`
  width: 300px;
`;

function AddNewAdminDialog({
  isOpen,
  handleClose,
  onSuccess,
}: AddNewAdminDialogProps) {
  const { tournament } = useTournamentInfoContext();
  const { potentialAdmins } = useTournamentAdminContext();
  const { request, isLoading } = useFetch<MessageResponse>();
  const { pushError, pushSuccess } = useToastPushSubmit();

  const [keyword, setKeyword] = useState('');
  const [selectedUsername, setSelectedUsername] = useState(null);
  const onClose = () => {
    handleClose();
    setKeyword('');
    setSelectedUsername(null);
  };

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
      onClose();
    }
  };

  return (
    <Modal
      title="Add New Admin"
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button onClick={onClose}>Cancel</Button>,
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
      <StyledSelect
        value={selectedUsername}
        onChange={setSelectedUsername}
        showSearch
        onSearch={val => setKeyword(val.toLowerCase())}
        filterOption={() => true}
      >
        {potentialAdmins
          .filter(({ displayName }) =>
            displayName.toLowerCase().includes(keyword)
          )
          .map(({ username, displayName }) => (
            <Select.Option key={username} value={username}>
              {displayName}
            </Select.Option>
          ))}
      </StyledSelect>
    </Modal>
  );
}

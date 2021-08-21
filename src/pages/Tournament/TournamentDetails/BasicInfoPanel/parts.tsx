import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Modal } from 'antd';

import { ClosableComponentProps } from 'utils/interfaces';
import useFetch from 'hooks/useFetch';
import useToastPushSubmit from 'hooks/useToastPushSubmit';
import useEventCallback from 'hooks/useEventCallback';
import { MessageResponse } from 'utils/apiResponseShapes';
import { useTournamentInfoContext } from '../TournamentInfoContext';

interface DeleteTournamentButtonProps {
  onSuccess: () => void;
}

const StyledButton = styled(Button)`
  margin-left: 12px;
`;

export function DeleteTournamentButton({
  onSuccess,
}: DeleteTournamentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledButton danger type="primary" onClick={() => setIsOpen(true)}>
        Delete Tournament
      </StyledButton>
      <DeleteTournamentDialog
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
}

interface DeleteTournamentDialogProps extends ClosableComponentProps {
  onSuccess: () => void;
}

function DeleteTournamentDialog({
  isOpen,
  handleClose,
  onSuccess,
}: DeleteTournamentDialogProps) {
  const { tournament } = useTournamentInfoContext();
  const { request, isLoading } = useFetch<MessageResponse>();
  const { pushError, pushSuccess } = useToastPushSubmit();

  const handleSubmit = useEventCallback(async () => {
    const { response, error } = await request(
      `/api/tournaments/${tournament.id}/`,
      'DELETE'
    );
    if (response === '') {
      pushError(error.code);
    } else {
      pushSuccess('Tournament deleted');
      onSuccess();
      handleClose();
    }
  });

  return (
    <Modal
      centered
      title="Delete tournament"
      visible={isOpen}
      onCancel={handleClose}
      footer={[
        <Button onClick={handleClose}>Cancel</Button>,
        <Button
          danger
          type="primary"
          onClick={handleSubmit}
          loading={isLoading}
        >
          Delete
        </Button>,
      ]}
    >
      Are you sure you want to delete tournament {tournament.name}? This action
      is not reversible.
    </Modal>
  );
}

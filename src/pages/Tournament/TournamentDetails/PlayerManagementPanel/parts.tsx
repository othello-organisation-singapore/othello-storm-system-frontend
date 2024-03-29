import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Form, Input, Modal, Select } from 'antd';

import { FormItem, FormLabel } from 'components/common';
import useFetch from 'hooks/useFetch';
import useToastPushSubmit from 'hooks/useToastPushSubmit';
import { ClosableComponentProps } from 'utils/interfaces';
import { MessageResponse } from 'utils/apiResponseShapes';
import { useTournamentInfoContext } from '../TournamentInfoContext';
import { useTournamentPlayerContext } from '../TournamentPlayerContext';

interface AddPlayerButtonProps {
  onSuccess: () => void;
}

export function AddPlayerFromJoueursButton({
  onSuccess,
}: AddPlayerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Add Player From Joueurs
      </Button>
      <AddPlayerFromJoueursDialog
        onSuccess={onSuccess}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </>
  );
}

interface AddPlayerDialogProps extends ClosableComponentProps {
  onSuccess: () => void;
}

const StyledSelect = styled(Select)`
  width: 300px;
`;

function AddPlayerFromJoueursDialog({
  isOpen,
  handleClose,
  onSuccess,
}: AddPlayerDialogProps) {
  const { tournament } = useTournamentInfoContext();
  const { joueursPlayers } = useTournamentPlayerContext();
  const { request, isLoading } = useFetch<MessageResponse>();
  const { pushError, pushSuccess } = useToastPushSubmit();

  const [keyword, setKeyword] = useState('');
  const [selectedJoueursId, setSelectedJoueursId] = useState(null);
  const onClose = () => {
    handleClose();
    setKeyword('');
    setSelectedJoueursId(null);
  };

  const handleSubmit = async () => {
    const { response, error } = await request(
      `/api/tournaments/${tournament.id}/players/`,
      'POST',
      {
        joueursId: selectedJoueursId,
      }
    );
    if (response === '') {
      pushError(error.code);
    } else {
      pushSuccess('Player added');
      onSuccess();
      onClose();
    }
  };
  return (
    <Modal
      title="Add Player From Joueurs"
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button onClick={onClose}>Cancel</Button>,
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={isLoading}
          disabled={selectedJoueursId === null}
        >
          Submit
        </Button>,
      ]}
    >
      <StyledSelect
        value={selectedJoueursId}
        onChange={setSelectedJoueursId}
        showSearch
        onSearch={val => setKeyword(val.toLowerCase())}
        filterOption={() => true}
      >
        {joueursPlayers
          .filter(({ firstName, lastName }) =>
            `${lastName} ${firstName}`.toLowerCase().includes(keyword)
          )
          .map(({ firstName, lastName, joueursId, country }) => (
            <Select.Option key={joueursId} value={joueursId}>
              {lastName} {firstName} ({country})
            </Select.Option>
          ))}
      </StyledSelect>
    </Modal>
  );
}

interface AddNewPlayerButtonProps {
  onSuccess: () => void;
}

export function AddNewPlayerButton({ onSuccess }: AddNewPlayerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Add New Player
      </Button>
      <AddNewPlayerDialog
        onSuccess={onSuccess}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </>
  );
}

interface AddNewPlayerDialogProps extends ClosableComponentProps {
  onSuccess: () => void;
}

function AddNewPlayerDialog({
  isOpen,
  handleClose,
  onSuccess,
}: AddNewPlayerDialogProps) {
  const { tournament } = useTournamentInfoContext();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const resetState = () => {
    setFirstName('');
    setLastName('');
    setCountry('');
  };

  const { request, isLoading } = useFetch<MessageResponse>();
  const { pushError, pushSuccess } = useToastPushSubmit();
  const handleSubmit = async () => {
    const { response, error } = await request(
      `/api/tournaments/${tournament.id}/players/new/`,
      'POST',
      {
        firstName,
        lastName,
        country,
      }
    );

    if (response === '') {
      pushError(error.code);
    } else {
      pushSuccess('New Player Added');
      onSuccess();
      handleClose();
    }
  };

  return (
    <Modal
      title="Add New Player"
      visible={isOpen}
      onCancel={handleClose}
      afterClose={resetState}
      footer={[
        <Button onClick={handleClose}>Cancel</Button>,
        <Button type="primary" onClick={handleSubmit} loading={isLoading}>
          Submit
        </Button>,
      ]}
    >
      <Form>
        <FormItem label={<FormLabel>First Name</FormLabel>}>
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </FormItem>
        <FormItem label={<FormLabel>Last Name</FormLabel>}>
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </FormItem>
        <FormItem label={<FormLabel>Country</FormLabel>}>
          <Input
            placeholder="Country"
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </FormItem>
      </Form>
    </Modal>
  );
}

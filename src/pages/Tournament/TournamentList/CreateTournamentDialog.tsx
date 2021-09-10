import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import styled from 'styled-components';

import { Button, Modal, Input, Form, Select, DatePicker } from 'antd';
import { SelectValue } from 'antd/lib/select';

import { FormItem, FormLabel } from 'components/common';
import useFetch from 'hooks/useFetch';
import useToastPushSubmit from 'hooks/useToastPushSubmit';
import { DATE_FORMAT } from 'utils/constants';
import { TournamentTypes } from 'utils/enums';
import { MessageResponse } from 'utils/apiResponseShapes';
import { TournamentTypeDisplays } from './displays';

interface CreateTournamentDialogProps {
  handleClose: () => void;
  isOpen: boolean;
  onCreate: () => void;
}

const StyledRangePicker = styled(DatePicker.RangePicker)`
  width: 100%;
`;

function CreateTournamentDialog({
  handleClose,
  isOpen,
  onCreate,
}: CreateTournamentDialogProps) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [type, setType] = useState<SelectValue>(TournamentTypes.SwissPairing);
  const [range, setRange] = useState<[Moment, Moment]>([moment(), moment()]);
  const resetState = () => {
    setName('');
    setCountry('');
    setType(TournamentTypes.SwissPairing);
    setRange([moment(), moment()]);
  };

  const { request, isLoading } = useFetch<MessageResponse>();
  const { pushError, pushSuccess } = useToastPushSubmit();
  const handleSubmit = async () => {
    const { response, error } = await request('/api/tournaments/', 'POST', {
      name,
      country,
      tournamentType: type,
      startDate: range[0].format(DATE_FORMAT),
      endDate: range[1].format(DATE_FORMAT),
    });

    if (response === '') {
      pushError(error.code);
    } else {
      pushSuccess('Tournament Created');
      onCreate();
      handleClose();
    }
  };

  return (
    <Modal
      title="Create New Tournament"
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
        <FormItem label={<FormLabel>Tournament Name</FormLabel>}>
          <Input
            placeholder="Tournament Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormItem>
        <FormItem label={<FormLabel>Country</FormLabel>}>
          <Input
            placeholder="Country"
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </FormItem>
        <FormItem label={<FormLabel>Tournament Type</FormLabel>}>
          <Select value={type} onChange={setType}>
            <Select.Option value={TournamentTypes.RoundRobin}>
              {TournamentTypeDisplays[TournamentTypes.RoundRobin]}
            </Select.Option>
            <Select.Option value={TournamentTypes.SwissPairing}>
              {TournamentTypeDisplays[TournamentTypes.SwissPairing]}
            </Select.Option>
          </Select>
        </FormItem>
        <FormItem label={<FormLabel>Event Date</FormLabel>}>
          <StyledRangePicker value={range} onChange={setRange} />
        </FormItem>
      </Form>
    </Modal>
  );
}

export default CreateTournamentDialog;

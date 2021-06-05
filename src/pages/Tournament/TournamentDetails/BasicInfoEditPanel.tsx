import React, { useState, ChangeEvent } from 'react';
import moment, { Moment } from 'moment';
import styled from 'styled-components';

import { DatePicker, Button, Form } from 'antd';

import { FormLabel, StyledInput, FormItem, FormText } from 'components/common';
import useFetch from 'hooks/useFetch';
import useToastPushSubmit from 'hooks/useToastPushSubmit';
import { MessageResponse } from 'utils/apiResponseShapes';
import { DATE_FORMAT } from 'utils/constants';
import { TournamentTypeDisplays } from './displays';
import { useTournamentInfoContext } from './TournamentInfoContext';
import useDeepCompareEffect from 'use-deep-compare-effect';

const StyledRangePicker = styled(DatePicker.RangePicker)`
  width: 300px;
  margin: 10px 0;
`;

const StyledButton = styled(Button)`
  margin: 12px 0;
`;

function BasicInfoEditPanel() {
  const { tournament, refresh } = useTournamentInfoContext();
  const [name, setName] = useState(tournament.name);
  const [country, setCountry] = useState(tournament.country);
  const [range, setRange] = useState<[Moment, Moment]>([
    moment(tournament.startDate),
    moment(tournament.endDate),
  ]);

  useDeepCompareEffect(() => {
    setName(tournament.name);
    setCountry(tournament.country);
    setRange([moment(tournament.startDate), moment(tournament.endDate)]);
  }, [tournament]);

  const { request, isLoading } = useFetch<MessageResponse>();
  const { pushError, pushSuccess } = useToastPushSubmit();
  const handleSubmit = async () => {
    const { response, error } = await request(
      `/api/tournaments/${tournament.id}/`,
      'PATCH',
      {
        name,
        country,
        startDate: range[0].format(DATE_FORMAT),
        endDate: range[1].format(DATE_FORMAT),
      }
    );

    if (response === '') {
      pushError(error.code);
    } else {
      pushSuccess('Tournament Updated');
      refresh();
    }
  };

  return (
    <Form>
      <FormItem label={<FormLabel>Tournament Name</FormLabel>}>
        <StyledInput
          placeholder="Name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
      </FormItem>
      <FormItem label={<FormLabel>Country</FormLabel>}>
        <StyledInput
          placeholder="Country"
          value={country}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCountry(e.target.value)
          }
        />
      </FormItem>
      <FormItem label={<FormLabel>Type</FormLabel>}>
        <FormText>{TournamentTypeDisplays[tournament.tournamentType]}</FormText>
      </FormItem>
      <FormItem label={<FormLabel>Event Date</FormLabel>}>
        <StyledRangePicker value={range} onChange={setRange} />
      </FormItem>
      <FormItem label={<FormLabel>Creator Name</FormLabel>}>
        <FormText>{tournament.creator.displayName}</FormText>
      </FormItem>
      <StyledButton type="primary" loading={isLoading} onClick={handleSubmit}>
        Save Changes
      </StyledButton>
    </Form>
  );
}

export default BasicInfoEditPanel;

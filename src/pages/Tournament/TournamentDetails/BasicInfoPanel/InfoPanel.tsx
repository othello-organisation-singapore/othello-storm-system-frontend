import React from 'react';
import { Form } from 'antd';

import { FormItem, FormLabel, FormText } from 'components/common';
import { useTournamentInfoContext } from '../TournamentInfoContext';
import { TournamentTypeDisplays } from '../displays';

function BasicInfoPanel() {
  const { tournament } = useTournamentInfoContext();

  return (
    tournament && (
      <Form>
        <FormItem label={<FormLabel>Tournament Name</FormLabel>}>
          <FormText>{tournament.name}</FormText>
        </FormItem>
        <FormItem label={<FormLabel>Country</FormLabel>}>
          <FormText>{tournament.country}</FormText>
        </FormItem>
        <FormItem label={<FormLabel>Type</FormLabel>}>
          <FormText>
            {TournamentTypeDisplays[tournament.tournamentType]}
          </FormText>
        </FormItem>
        <FormItem label={<FormLabel>Start Date</FormLabel>}>
          <FormText>{tournament.startDate}</FormText>
        </FormItem>
        <FormItem label={<FormLabel>End Date</FormLabel>}>
          <FormText>{tournament.endDate}</FormText>
        </FormItem>
        <FormItem label={<FormLabel>Creator Name</FormLabel>}>
          <FormText>{tournament.creator.displayName}</FormText>
        </FormItem>
      </Form>
    )
  );
}

export default BasicInfoPanel;

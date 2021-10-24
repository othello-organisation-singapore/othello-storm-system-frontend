import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Form } from 'antd';

import useGet from 'hooks/useGet';
import useFetch from 'hooks/useFetch';
import useEventCallback from 'hooks/useEventCallback';
import useToastPushSubmit from 'hooks/useToastPushSubmit';
import {
  FormItem,
  FormLabel,
  FormText,
  Row,
  ThrottledButton,
} from 'components/common';
import {
  MessageResponse,
  RoundDetailsResponse,
  RoundMatchesResponse,
  StandingsResponse,
} from 'utils/apiResponseShapes';
import { RoundTypes } from 'utils/enums';
import { RoundTypeDisplays } from './displays';
import { useTournamentInfoContext } from '../TournamentInfoContext';
import { DeleteRoundButton, MatchEditDisplay, Standings } from './parts';

interface RoundEditSubpanelProps {
  roundId: number;
  refreshRounds: () => void;
}

const StyledRow = styled(Row)`
  flex-wrap: wrap;
`;

const Column = styled.div`
  margin-top: 10px;
  min-width: 300px;
  flex-grow: 1;
`;

function RoundEditSubpanel({ roundId, refreshRounds }: RoundEditSubpanelProps) {
  const { tournament } = useTournamentInfoContext();
  const {
    data: roundData,
    refresh: refreshRoundData,
  } = useGet<RoundDetailsResponse>(
    `/api/tournaments/${tournament.id}/rounds/${roundId}/`
  );
  const {
    data: matchesData,
    refresh: refreshMatchesData,
  } = useGet<RoundMatchesResponse>(
    `/api/tournaments/${tournament.id}/rounds/${roundId}/matches/`
  );
  const {
    data: standingsData,
    refresh: refreshStandingsData,
  } = useGet<StandingsResponse>(
    `/api/tournaments/${tournament.id}/rounds/${roundId}/standings/`
  );

  const { request } = useFetch<MessageResponse>();
  const { pushError, pushSuccess } = useToastPushSubmit();

  const handleNameChange = useEventCallback(async (updatedName: string) => {
    const {
      response,
      error,
    } = await request(
      `/api/tournaments/${tournament.id}/rounds/${roundId}/`,
      'PATCH',
      { updatedName }
    );

    if (response === '') {
      pushError(error.code);
    } else {
      pushSuccess('Round Name Updated');
      refreshRounds();
      refreshRoundData();
    }
  });

  return (
    roundData &&
    matchesData &&
    standingsData && (
      <StyledRow>
        <Column>
          <Row>
            <DeleteRoundButton
              onSuccess={refreshRounds}
              round={roundData.round}
            />
            <ThrottledButton
              props={{
                type: 'primary',
                style: { marginBottom: 12, marginLeft: 8 },
              }}
              onClick={() => {
                refreshRoundData();
                refreshMatchesData();
                refreshStandingsData();
              }}
              interval={500}
            >
              Refresh
            </ThrottledButton>
          </Row>
          <Form>
            <FormItem label={<FormLabel>Round Name</FormLabel>}>
              <FormText editable={{ onChange: handleNameChange }}>
                {roundData.round.name}
              </FormText>
            </FormItem>
            <FormItem label={<FormLabel>Round Type</FormLabel>}>
              <FormText>{RoundTypeDisplays[roundData.round.type]}</FormText>
            </FormItem>
          </Form>
          {matchesData.matches.map(match => (
            <MatchEditDisplay
              match={match}
              key={match.id}
              onUpdate={() => {
                refreshMatchesData();
                if (roundData.round.type !== RoundTypes.ManualSpecial) {
                  refreshStandingsData();
                }
              }}
              round={roundData.round}
            />
          ))}
        </Column>
        <Column>
          {roundData.round.type !== RoundTypes.ManualSpecial && (
            <Standings standings={standingsData.standings} />
          )}
        </Column>
      </StyledRow>
    )
  );
}

export default RoundEditSubpanel;

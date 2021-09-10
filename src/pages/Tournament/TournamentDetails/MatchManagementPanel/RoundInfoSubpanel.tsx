import React from 'react';
import styled from 'styled-components';

import { Form } from 'antd';

import useGet from 'hooks/useGet';
import { FormItem, FormLabel, FormText, Row } from 'components/common';
import {
  RoundDetailsResponse,
  RoundMatchesResponse,
  StandingsResponse,
} from 'utils/apiResponseShapes';
import { RoundTypes } from 'utils/enums';
import { RoundTypeDisplays } from './displays';
import { useTournamentInfoContext } from '../TournamentInfoContext';
import { MatchInfoDisplay, Standings } from './parts';

interface RoundInfoSubpanelProps {
  roundId: number;
}

const StyledRow = styled(Row)`
  flex-wrap: wrap;
`;

const Column = styled.div`
  margin-top: 10px;
  min-width: 300px;
  flex-grow: 1;
`;

function RoundInfoSubpanel({ roundId }: RoundInfoSubpanelProps) {
  const { tournament } = useTournamentInfoContext();
  const { data: roundData } = useGet<RoundDetailsResponse>(
    `/api/tournaments/${tournament.id}/rounds/${roundId}/`
  );
  const { data: matchesData } = useGet<RoundMatchesResponse>(
    `/api/tournaments/${tournament.id}/rounds/${roundId}/matches/`
  );
  const { data: standingsData } = useGet<StandingsResponse>(
    `/api/tournaments/${tournament.id}/rounds/${roundId}/standings/`
  );

  return (
    roundData &&
    matchesData &&
    standingsData && (
      <StyledRow>
        <Column>
          <Form>
            <FormItem label={<FormLabel>Round Name</FormLabel>}>
              <FormText>{roundData.round.name}</FormText>
            </FormItem>
            <FormItem label={<FormLabel>Round Type</FormLabel>}>
              <FormText>{RoundTypeDisplays[roundData.round.type]}</FormText>
            </FormItem>
          </Form>
          {matchesData.matches.map(match => (
            <MatchInfoDisplay match={match} key={match.id} />
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

export default RoundInfoSubpanel;

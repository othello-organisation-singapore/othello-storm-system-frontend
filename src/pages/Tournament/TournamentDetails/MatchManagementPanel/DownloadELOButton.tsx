import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Button } from 'antd';

import useEventCallback from 'hooks/useEventCallback';
import useFetch from 'hooks/useFetch';
import useToastPushSubmit from 'hooks/useToastPushSubmit';
import {
  MatchSummary,
  PlayerStandingSummary,
  RoundSummary,
  SummaryResponse,
  TournamentInfoSummary,
} from 'utils/apiResponseShapes';
import downloadToFile from 'utils/download';
import { SpecialConditionScores } from '../../../../utils/enums';

const StyledButton = styled(Button)`
  margin: 12px 0;
`;

interface DownloadELOButtonProps {
  tournamentId: number;
}

const generateSummaryContent = (summary: SummaryResponse): string => {
  const contents: string[] = [];

  contents.push(...generateTournamentInfoContent(summary.tournamentInfo), '');
  contents.push(...generateStandingsContent(summary.standings), '');
  summary.rounds.forEach(r => contents.push(...generateRoundContent(r)));

  return contents.join('\n');
};

const generateTournamentInfoContent = (
  info: TournamentInfoSummary
): string[] => {
  const contents: string[] = [];

  contents.push(`%%Tournament: ${info.name}`);
  contents.push(`%%Country: ${info.country}`);
  const startDate = moment(info.startDate).format('DD/MM/YYYY');
  const endDate = moment(info.endDate).format('DD/MM/YYYY');
  if (startDate == endDate) {
    contents.push(`%%Date: ${startDate}`);
  } else {
    contents.push(`%%Date: ${startDate} -  ${endDate}`);
  }
  contents.push('%%Sender: Othello Storm System');

  return contents;
};

const generateStandingsContent = (
  standings: PlayerStandingSummary[]
): string[] => {
  // %_%  250001, Koh, Bo Xiang, SGP, 6, 463.0
  return [
    '%        ID, Family_Name, Firstname, COUNTRY, Score, MBQ',
    ...standings.map(
      standing =>
        `%_%  ${standing.joueursId}, ${standing.lastName}, ${standing.firstName}, ${standing.country}, ${standing.majorScore}, ${standing.minorScore}.0`
    ),
  ];
};

const generateRoundContent = (round: RoundSummary): string[] => {
  return [
    `%${round.name}`,
    '%B               %W',
    ...round.matches
      .filter(
        match =>
          match.blackScore !== SpecialConditionScores.Bye &&
          match.blackScore !== SpecialConditionScores.NotFinished
      )
      .map(generateMatchContent),
    '',
  ];
};

const generateMatchContent = (match: MatchSummary): string => {
  //  250003 (53>11)  250053
  const winningSign =
    match.blackScore > match.whiteScore
      ? '>'
      : match.blackScore === match.whiteScore
      ? '='
      : '<';
  return ` ${match.blackPlayerJoueursId} (${match.blackScore}${winningSign}${match.whiteScore}) ${match.whitePlayerJoueursId}`;
};

function DownloadELOButton({ tournamentId }: DownloadELOButtonProps) {
  const { request, isLoading } = useFetch<SummaryResponse>();
  const { pushError } = useToastPushSubmit();
  const handleClick = useEventCallback(async () => {
    const { response, error } = await request(
      `/api/tournaments/${tournamentId}/summary/`,
      'GET'
    );
    if (response === '') {
      pushError(error.code);
      return;
    }

    const startDate = moment(response.tournamentInfo.startDate).format(
      'YYYYMMDD'
    );
    const tournamentName = response.tournamentInfo.name;

    const fileName = `${startDate}_${tournamentName.split(' ').join('_')}.ELO`;
    const fileContent = generateSummaryContent(response);
    downloadToFile(fileContent, fileName);
  });

  return (
    <StyledButton type="primary" onClick={handleClick} disabled={isLoading}>
      Download ELO File
    </StyledButton>
  );
}

export default DownloadELOButton;

import React from 'react';
import styled from 'styled-components';

import { Table, Button } from 'antd';

import { PageTitle, Row } from 'components/common';
import { useUserContext } from 'components/UserContext';
import { TournamentPreview } from 'utils/apiResponseShapes';
import { UserRoles } from 'utils/enums';
import { TournamentTypeDisplays } from './displays';

interface TournamentListPageTitleProps {
  title: string;
}

const StyledRow = styled(Row)`
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  margin-bottom: 30px;
`;

export function TournamentListPageTitle({
  title,
}: TournamentListPageTitleProps) {
  const { user } = useUserContext();

  return (
    <StyledRow>
      <PageTitle>{title}</PageTitle>
      {user.role !== UserRoles.Visitor && (
        <StyledButton type="primary">Test</StyledButton>
      )}
    </StyledRow>
  );
}

interface TournamentListTableProps {
  tournaments: TournamentPreview[];
}

const desktopTableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Tournament Type',
    dataIndex: 'tournamentType',
    key: 'tournamentType',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Creator',
    dataIndex: 'creatorUsername',
    key: 'creatorUsername',
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    key: 'endDate',
  },
];

export function DesktopTournamentListTable({
  tournaments,
}: TournamentListTableProps) {
  return (
    <Table
      dataSource={tournaments.map(t => ({
        ...t,
        key: t.id,
        tournamentType: TournamentTypeDisplays[t.tournamentType],
      }))}
      columns={desktopTableColumns}
      scroll={{ x: true }}
    />
  );
}

const mobileTableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
];

export function MobileTournamentListTable({
  tournaments,
}: TournamentListTableProps) {
  return (
    <Table
      dataSource={tournaments.map(t => ({ ...t, key: t.id }))}
      columns={mobileTableColumns}
      scroll={{ x: true }}
    />
  );
}

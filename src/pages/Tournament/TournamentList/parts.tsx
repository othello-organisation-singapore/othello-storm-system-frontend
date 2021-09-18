import React, { useState } from 'react';
import styled from 'styled-components';
import sortedUniqBy from 'lodash/sortedUniqBy';

import { Table, Button } from 'antd';

import { PageTitle, Row } from 'components/common';
import { useUserContext } from 'components/UserContext';
import { TournamentPreview } from 'utils/apiResponseShapes';
import { TournamentTypeDisplays } from './displays';
import CreateTournamentDialog from './CreateTournamentDialog';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface TournamentListPageTitleProps {
  title: string;
  onCreateNewTournament: () => void;
}

const StyledRow = styled(Row)`
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  margin-bottom: 30px;
`;

export function TournamentListPageTitle({
  title,
  onCreateNewTournament,
}: TournamentListPageTitleProps) {
  const { isLoggedIn } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledRow>
      <PageTitle>{title}</PageTitle>
      {isLoggedIn && (
        <>
          <StyledButton type="primary" onClick={() => setIsOpen(true)}>
            Create
          </StyledButton>
          <CreateTournamentDialog
            handleClose={() => setIsOpen(false)}
            isOpen={isOpen}
            onCreate={onCreateNewTournament}
          />
        </>
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
    dataIndex: 'creatorDisplayName',
    key: 'creatorDisplayName',
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
  const { push } = useHistory();
  const { url } = useRouteMatch();
  return (
    <Table
      dataSource={sortedUniqBy(tournaments, t => -t.id).map(t => ({
        ...t,
        key: t.id,
        tournamentType: TournamentTypeDisplays[t.tournamentType],
      }))}
      columns={desktopTableColumns}
      scroll={{ x: true }}
      onRow={record => ({
        onClick: () =>
          push(
            url.replace(/tournaments\/.+$/, `tournaments/detail/${record.id}`)
          ),
        style: { cursor: 'pointer' },
      })}
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
  const { push } = useHistory();
  const { url } = useRouteMatch();
  return (
    <Table
      dataSource={tournaments.map(t => ({ ...t, key: t.id }))}
      columns={mobileTableColumns}
      scroll={{ x: true }}
      onRow={record => ({
        onClick: () =>
          push(
            url.replace(/tournaments\/.+$/, `tournaments/detail/${record.id}`)
          ),
        style: { cursor: 'pointer' },
      })}
    />
  );
}

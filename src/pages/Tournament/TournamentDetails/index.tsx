import React from 'react';
import { useParams } from 'react-router-dom';

import { Tabs } from 'antd';
import { PageTitle, PageWrapper, Row } from 'components/common';
import { useUserContext } from 'components/UserContext';
import useGet from 'hooks/useGet';
import useRefreshKey from 'hooks/useRefreshKey';
import { UserRoles } from 'utils/enums';
import { TournamentDetails } from 'utils/apiResponseShapes';
import TournamentInfoProvider from './TournamentInfoContext';
import TournamentAdminProvider, {
  useTournamentAdminContext,
} from './TournamentAdminContext';
import TournamentPlayerProvider from './TournamentPlayerContext';
import TournamentRoundProvider from './TournamentRoundContext';
import { AdminEditPanel } from './AdminManagementPanel';
import { BasicInfoPanel, BasicInfoEditPanel } from './BasicInfoPanel';
import { PlayersPanel, PlayersEditPanel } from './PlayerManagementPanel';
import { MatchesPanel, MatchesEditPanel } from './MatchManagementPanel';

const { TabPane } = Tabs;

interface TournamentDetailsParams {
  tournamentId: string;
}

function TournamentDetailsPage() {
  const { tournamentId } = useParams<TournamentDetailsParams>();
  const { data, refresh } = useGet<TournamentDetails>(
    `/api/tournaments/${tournamentId}/`
  );

  return (
    data && (
      <TournamentInfoProvider tournament={data} refresh={refresh}>
        <TournamentAdminProvider tournament={data}>
          <PageWrapper>
            <Row>
              <PageTitle>{data.name}</PageTitle>
            </Row>
            <TournamentManagementTabs tournament={data} />
          </PageWrapper>
        </TournamentAdminProvider>
      </TournamentInfoProvider>
    )
  );
}

interface TournamentManagementTabsProps {
  tournament: TournamentDetails;
}

function TournamentManagementTabs({
  tournament,
}: TournamentManagementTabsProps) {
  const { refreshKey, refresh } = useRefreshKey();

  const { user } = useUserContext();
  const { admins } = useTournamentAdminContext();

  const hasMainEditPermission =
    user.role === UserRoles.Superuser ||
    user.username === tournament.creator.username;

  const hasAdminPermission =
    hasMainEditPermission ||
    admins.filter(admin => admin.username === user.username).length > 0;

  return (
    <TournamentPlayerProvider
      tournament={tournament}
      skipJoueursLoad={!hasAdminPermission}
    >
      <Tabs defaultActiveKey="1" onChange={refresh} type="card">
        <TabPane tab="Basic Info" key="1">
          {hasMainEditPermission ? (
            <BasicInfoEditPanel key={refreshKey} />
          ) : (
            <BasicInfoPanel />
          )}
        </TabPane>
        {hasMainEditPermission && (
          <TabPane tab="Administrators" key="2">
            <AdminEditPanel />
          </TabPane>
        )}
        <TabPane tab="Players" key="3">
          {hasAdminPermission ? (
            <PlayersEditPanel key={refreshKey} />
          ) : (
            <PlayersPanel />
          )}
        </TabPane>
        <TabPane tab="Matches" key="4">
          <TournamentRoundProvider tournament={tournament}>
            {hasAdminPermission ? (
              <MatchesEditPanel key={refreshKey} />
            ) : (
              <MatchesPanel />
            )}
          </TournamentRoundProvider>
        </TabPane>
      </Tabs>
    </TournamentPlayerProvider>
  );
}

export default TournamentDetailsPage;

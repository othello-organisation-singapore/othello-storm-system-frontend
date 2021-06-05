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
import TournamentAdminProvider from './TournamentAdminContext';
import AdministratorsPanel from './AdministratorsPanel';
import BasicInfoPanel from './BasicInfoPanel';
import BasicInfoEditPanel from './BasicInfoEditPanel';

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
  // Unmount inactive tab
  const { refreshKey, refresh } = useRefreshKey();

  const { user } = useUserContext();
  const hasMainEditPermission =
    user.role === UserRoles.Superuser ||
    user.username === tournament.creator.username;
  return (
    <Tabs defaultActiveKey="1" onChange={refresh}>
      <TabPane tab="Basic Info" key="1">
        {hasMainEditPermission ? (
          <BasicInfoEditPanel key={refreshKey} />
        ) : (
          <BasicInfoPanel />
        )}
      </TabPane>
      {hasMainEditPermission && (
        <TabPane tab="Administrators" key="2">
          <AdministratorsPanel />
        </TabPane>
      )}
    </Tabs>
  );
}

export default TournamentDetailsPage;

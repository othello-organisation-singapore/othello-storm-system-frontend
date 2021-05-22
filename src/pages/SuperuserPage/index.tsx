import React from 'react';
import styled from 'styled-components';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

import { Row, PageTitle, PageWrapper } from 'components/common';
import CreateAdminPanel from './CreateAdminPanel';

const StyledRow = styled(Row)`
  justify-content: center;
`;

function SuperuserPage() {
  return (
    <PageWrapper>
      <StyledRow>
        <PageTitle>Superuser Panel</PageTitle>
      </StyledRow>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Create Admin Panel" key="1">
          <CreateAdminPanel />
        </TabPane>
      </Tabs>
    </PageWrapper>
  );
}

export default SuperuserPage;

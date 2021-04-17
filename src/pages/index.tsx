import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import Menu from './Menu';

const PageWrapper = styled.div`
  padding: 30px 40px;
  height: calc(100vh - 46px);
`;

function OSS() {
  return (
    <BrowserRouter>
      <Menu />
      <PageWrapper>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Redirect to="/" />
        </Switch>
      </PageWrapper>
    </BrowserRouter>
  );
}

export default OSS;

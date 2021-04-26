import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { ProgressiveContextProvider } from 'ProgressiveContext';
import { ThemeContextProvider } from 'ThemeContext';
import { UserContextProvider } from 'UserContext';
import Menu from 'pages/Menu';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';

const PageWrapper = styled.div`
  padding: 30px 40px;
  height: calc(100vh - 46px);

  @media only screen and (max-width: 600px) {
    padding: 30px 30px;
  }

  @media only screen and (max-width: 400px) {
    padding: 30px 20px;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <ProgressiveContextProvider>
        <ThemeContextProvider>
          <UserContextProvider>
            <Menu />
            <PageWrapper>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Redirect to="/" />
              </Switch>
            </PageWrapper>
          </UserContextProvider>
        </ThemeContextProvider>
      </ProgressiveContextProvider>
    </BrowserRouter>
  );
}

export default App;

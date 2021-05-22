import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { ProgressiveContextProvider } from 'components/ProgressiveContext';
import { ThemeContextProvider } from 'components/ThemeContext';
import { UserContextProvider, useUserContext } from 'components/UserContext';
import Menu from 'pages/Menu';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import About from 'pages/About';
import ProfilePage from 'pages/ProfilePage';
import Resources from 'pages/Resources';
import SuperuserPage from 'pages/SuperuserPage';
import Tournament from 'pages/Tournament';
import { UserRole } from 'utils/enums';

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
              <Routes />
            </PageWrapper>
          </UserContextProvider>
        </ThemeContextProvider>
      </ProgressiveContextProvider>
    </BrowserRouter>
  );
}

function Routes() {
  const { isLoggedIn, user } = useUserContext();
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={About} />
      <Route path="/login" component={LoginPage} />
      <Route path="/tournaments" component={Tournament} />
      <Route path="/resources" component={Resources} />
      {isLoggedIn && <Route path="/profile" component={ProfilePage} />}
      {user.role === UserRole.Superuser && (
        <Route path="/superuser" component={SuperuserPage} />
      )}
      <Redirect to="/" />
    </Switch>
  );
}

export default App;

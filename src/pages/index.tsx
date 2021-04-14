import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';

import { Dropdown, Menu } from 'semantic-ui-react';

import HomePage from './HomePage';

const StyledMenu = styled(Menu)`
  && {
    border-radius: 0;
  }
`;
function OSS() {
  return (
    <BrowserRouter>
      <StyledMenu inverted>
        <Menu.Item name="Home" />
        <Menu.Item name="About" />
        <Menu.Item name="Tournament" />
        <Menu.Item name="Profile" />
      </StyledMenu>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default OSS;

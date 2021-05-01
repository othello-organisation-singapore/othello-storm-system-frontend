import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import AboutOthelloPage from './AboutOthelloPage';
import AboutWOFPage from './AboutWOFPage';
import AboutOOSPage from './AboutOOSPage';
import AboutOthelloStormPage from './AboutOthelloStormPage';

function About() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/othello`} component={AboutOthelloPage} />
      <Route path={`${path}/wof`} component={AboutWOFPage} />
      <Route path={`${path}/oos`} component={AboutOOSPage} />
      <Route path={`${path}/othellostorm`} component={AboutOthelloStormPage} />
      <Redirect to={`${path}/oos`} />
    </Switch>
  );
}

export default About;

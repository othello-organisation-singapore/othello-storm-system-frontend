import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import AllTournamentsPage from './TournamentList/AllTournamentsPage';
import CreatedTournamentsPage from './TournamentList/CreatedTournamentsPage';
import ManagedTournamentsPage from './TournamentList/ManagedTournamentsPage';

function Tournament() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/created`} component={CreatedTournamentsPage} />
      <Route path={`${path}/managed`} component={ManagedTournamentsPage} />
      <Route path={`${path}/all`} component={AllTournamentsPage} />
      <Redirect to={`${path}/all`} />
    </Switch>
  );
}

export default Tournament;

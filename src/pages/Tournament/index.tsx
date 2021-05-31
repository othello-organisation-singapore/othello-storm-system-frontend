import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import AllTournamentsPage from './TournamentList/AllTournamentsPage';
import CreatedTournamentsPage from './TournamentList/CreatedTournamentsPage';
import ManagedTournamentsPage from './TournamentList/ManagedTournamentsPage';
import TournamentDetails from './TournamentDetails';

function Tournament() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/created`} component={CreatedTournamentsPage} />
      <Route path={`${path}/managed`} component={ManagedTournamentsPage} />
      <Route path={`${path}/all`} component={AllTournamentsPage} />
      <Route
        path={`${path}/detail/:tournamentId`}
        component={TournamentDetails}
      />
      <Redirect to={`${path}/all`} />
    </Switch>
  );
}

export default Tournament;

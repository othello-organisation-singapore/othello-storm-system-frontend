import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import ResourceBookPage from './ResourceBookPage';
import ResourcePlatformPage from './ResourcePlatformPage';
import ResourceVideoPage from './ResourceVideoPage';

function Resources() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/book`} component={ResourceBookPage} />
      <Route path={`${path}/platform`} component={ResourcePlatformPage} />
      <Route path={`${path}/video`} component={ResourceVideoPage} />
      <Redirect to={`${path}/video`} />
    </Switch>
  );
}

export default Resources;

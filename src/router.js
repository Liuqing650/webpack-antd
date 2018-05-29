import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import handleTitle from 'helpers/handleTitle';
import {
  App,
  HomePage,
} from 'containers';

// 各个路由进入时的配置
function requireAuth(allStores, nextState, replace) {
  const title = handleTitle(nextState.location);
  document.title = title;
}
export default ({ allStores }) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="/home" exact component={HomePage} onEnter={requireAuth.bind(null, allStores)} />
      <Redirect from="*" to="/" />
    </Route>
  );
};

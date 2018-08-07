import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import loadable from 'helpers/loadable';
import {handleTitle} from 'helpers';
import App from 'containers/App';

// 按需加载
const HomePage = loadable(() =>
  import('containers/HomePage' /* webpackChunkName: 'HomePage' */));

const FirstPage = loadable(() =>
  import('containers/FirstPage' /* webpackChunkName: 'FirstPage' */));

const renderTitle = (location) => {
  const title = handleTitle(location.pathname, location.query);
  document.title = title;
};
function requireAuth(stores, nextState, replace) {
  renderTitle(nextState.location);
}
export default (stores) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} onEnter={requireAuth.bind(null, stores)} />
      <Route path="page" component={FirstPage} onEnter={requireAuth.bind(null, stores)} />
      <Redirect from="*" to="/" />
    </Route>
  );
};

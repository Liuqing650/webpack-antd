import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import loadable from 'utils/loadable';
// import Authorized from 'components/common/Authorized';

// 权限路由
// const { AuthorizedRoute } = Authorized;

// 直接加载
// import HomePage from './routes/HomePage';

// 按需加载
const HomePage = loadable(() =>
  import('./routes/HomePage' /* webpackChunkName: 'HomePage' */));

const SecondPage = loadable(() =>
  import('./routes/SecondPage' /* webpackChunkName: 'SecondPage' */));

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/list" exact component={SecondPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

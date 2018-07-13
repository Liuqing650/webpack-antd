import React, {Component} from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import axios from 'axios';
import styles from './index.less';
import routers from '../../router';

@withRouter
export default class App extends Component {
  RouteWithSubRoutes = (route) => (
    <Route
      key={route.path}
      exact={route.exact || false}
      path={route.path}
      render={props => {
        if (route.path === '*') {
          return <Redirect to="/notFound" />;
        }
         return <route.component {...props} routes={route.routes || null} />;
      }}
    />
  );
  render() {
    return (
      <div id="root">
        <div className={styles.content}>
          <Switch>{routes.map(route => this.RouteWithSubRoutes(route))}</Switch>
        </div>
      </div>
    );
  }
}

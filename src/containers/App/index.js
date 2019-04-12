import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import router from '../../router';
import styles from './index.less';

class App extends React.Component {
  renderSubRoutes = (route) => (
    <Route
      key={route.path}
      exact={route.exact || false}
      path={route.path}
      render={props => {
        let routeComp = '';
        routeComp = <route.component {...props} routes={route.routes || null} />;
        return routeComp;
      }}
    />
  );
  render() {
    return (
      <div id="root">
        <div className={styles.content}>
          <Switch>{router.map(route => this.renderSubRoutes(route))}</Switch>
        </div>
      </div>
    );
  }
}
export default withRouter(App);


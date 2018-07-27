import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getUserInfo} from 'helper';
import Authorized from './Authorized';

class AuthorizedRoute extends Component {
  render() {
    const { component: Component, render, authority, requreLogin, redirectPath, ...rest } = this.props;
    const userInfo = getUserInfo();
    return (
      <Authorized
        authority={authority}
        authId={userInfo && userInfo.authId ? userInfo.authId : null}
        currentAuthority={userInfo && userInfo.role ? userInfo.role : null}
        requreLogin={requreLogin || true}
        noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
      >
        <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
      </Authorized>
    );
  }
}

export default AuthorizedRoute;

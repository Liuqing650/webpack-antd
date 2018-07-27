import React from 'react';
import CheckPermissions from './CheckPermissions';

class Authorized extends React.Component {
  render() {
    const { children, authority, currentAuthority, authId, requreLogin, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(authority, currentAuthority, authId, requreLogin, childrenRender, noMatch);
  }
}

export default Authorized;

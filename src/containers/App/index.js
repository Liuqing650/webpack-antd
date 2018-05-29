import React, {Component} from 'react';
import { observer } from 'mobx-react';
import './index.less';

@observer
export default class App extends Component {
  render() {
    return (
      <div id="root">
        {this.props.children}
      </div>
    );
  }
}

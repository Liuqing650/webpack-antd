import React, {Component} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

@observer
export default class App extends Component {
  render() {
    return (
      <div id="root">
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

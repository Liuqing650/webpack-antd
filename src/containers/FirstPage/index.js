import React, { Component } from 'react';
import { observer, inject} from 'mobx-react';
import { Button } from 'antd';

@inject('routing')
@observer
export default class FirstPage extends Component {
  render() {
    const onBack = () => {
      this.props.routing.push('/');
    };
    return (
      <div>
        FirstPage
        <Button type="primary" onClick={onBack}>返回主页</Button>
      </div>
    );
  }
}

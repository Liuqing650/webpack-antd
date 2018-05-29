import React, { Component } from 'react';
import { observer, inject} from 'mobx-react';
import HomePage from 'components/homePage';

@inject('homeStore')
@observer
export default class Home extends Component {
  componentDidMount() {
    this.props.homeStore.getUsers();
  }
  render() {
    return (
      <HomePage />
    );
  }
}

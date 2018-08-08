import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import axios from 'axios';
import Uuid from 'uuid';
import { Provider } from 'mobx-react';
import * as stores from 'stores';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import getRoutes from './router';

// 引入mock
import './mock';

const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);
const renderDom = document.getElementById('root');

// 请求之前传递携带 token
axios.interceptors.request.use(
  axiosConfig => {
    axiosConfig.headers['auth-id'] = `${Uuid.v4()}`;
    axiosConfig.headers['auth-token'] = 'sc-data';
    axiosConfig.headers['Cache-Control'] = 'no-cache';
    if (!axiosConfig.params) {
      axiosConfig.params = {
        timestamp: new Date().getTime()
      };
    } else {
      axiosConfig.params.timestamp = new Date().getTime();
    }
    return axiosConfig;
  },
  error => {
    console.log('request error', error);
  }
);

axios.interceptors.response.use((response) => response, (error) => {
  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }
  if (error && error.response.data.errorCode === 401000) {
    window.location.href = '/';
  }
  return Promise.reject(error);
});

stores.routing = routingStore;
ReactDOM.render(
  <Provider {...stores}>
    <Router routes={getRoutes(stores)} history={history} />
  </Provider>,
  renderDom
);

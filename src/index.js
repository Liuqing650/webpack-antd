import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import Uuid from 'node-uuid';
import { Provider } from 'mobx-react';
import * as allStores from 'stores';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import config from 'utils/config';
import getRoutes from './router';
import App from './containers/app';

const browserHistory = createBrowserHistory();
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

allStores.routing = routingStore;
ReactDOM.render(
  <Provider {...allStores}>
    <Router history={browserHistory}>        
      <App />
    </Router>
  </Provider>,
  renderDom
);

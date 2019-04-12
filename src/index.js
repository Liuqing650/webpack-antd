import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { RouterStore } from 'mobx-react-router';
import axios from 'axios';
import Uuid from 'uuid';
import { Provider } from 'mobx-react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import Loadable from 'react-loadable';
import browserHistory from './helpers/history';
import App from './containers/App';
import * as store from './stores';

// 引入mock
import './mock';

const routingStore = new RouterStore();
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

store.routing = routingStore;
const renderApp = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.render(
      <Provider {...store}>
        <Router history={browserHistory}>
          <LocaleProvider locale={zhCN}>
            <App />
          </LocaleProvider>
        </Router>
      </Provider>,
      renderDom
    );
  });
};
renderApp();

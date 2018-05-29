import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'mobx-react';
import * as allStores from 'stores';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import getRoutes from './router';

const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);
const renderDom = document.getElementById('root');

allStores.routing = routingStore;
ReactDOM.render(
  <Provider {...allStores}>
    <Router routes={getRoutes(allStores)} history={history} />
  </Provider>,
  renderDom
);

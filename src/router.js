import React from 'react';
import { Route, Redirect } from 'react-router';
import loadable from 'helpers/loadable';
import handleTitle from 'helpers';
import { App } from 'containers';

const NoMatch = () => 'not found';
// 按需加载
const HomePage = loadable(() =>
  import('routes/HomePage' /* webpackChunkName: 'HomePage' */));

const SecondPage = loadable(() =>
  import('routes/SecondPage' /* webpackChunkName: 'SecondPage' */));

export default [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '*',
    component: NoMatch
  }
];

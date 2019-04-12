import loadable from 'helpers/loadable';

// 按需加载
const HomePage = loadable(() =>
  import('containers/HomePage' /* webpackChunkName: 'HomePage' */));

const FirstPage = loadable(() =>
  import('containers/FirstPage' /* webpackChunkName: 'FirstPage' */));

export default [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/page',
    component: FirstPage
  },
];

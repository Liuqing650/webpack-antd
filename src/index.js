import '@babel/polyfill';
import dva from 'dva';
import createHistory from 'history/createHashHistory';
// import createHistory from 'history/createBrowserHistory';
// 引入路由
import router from './router';
// 引入model
import home from './models/home';
// 引入全局样式, mock, 拦截请求,设置token信息等
import './mock';
import './utils/axiosRequest';
import './index.less';

// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
// bug: 不用require()导入
// https://github.com/dvajs/dva/issues/261
app.model(home);

// 4. Router
app.router(router);

// 5. Start
app.start('#root');

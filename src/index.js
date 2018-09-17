import '@babel/polyfill';
import dva from 'dva';
import createHistory from 'history/createHashHistory';
// import createHistory from 'history/createBrowserHistory';
// 引入路由
import router from './router';
// 引入全局样式, mock, 拦截请求,设置token信息等
import './mock';
import './utils/axiosRequest';
import './index.less';

// 1. Initialize
const app = dva({
  history: createHistory(),
  onHmr: () => {
    if (module.hot) {
      module.hot.accept();
    }
  }
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/home'));

// 4. Router
app.router(router);

// 5. Start
app.start('#root');

import dva from 'dva';
// 引入路由
import router from './router';
// 引入model
import home from './models/home';
// 引入全局样式
import './index.less';

// 1. Initialize
const app = dva();

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

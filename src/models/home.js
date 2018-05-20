import { message } from 'antd';
import { getUser } from 'services/home';

export default {
  namespace: 'home',
  state: {
    msg: 'init state...',
    tableData: [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/') {
          dispatch({
            type: 'query',
            payload: location.pathname
          });
        }
      });
    }
  },
  effects: {
    *query({ payload }, { call, put }) {
      message.success('欢迎进入主页...');
      yield put({
        type: 'change',
        payload: {
          msg: 'new state...'
        }
      });
    },
    *getUsers({ payload }, { call, put }) {
      message.success('数据已经刷新...');
      const data = yield call(getUser);
      const date = new Date();
      const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      yield put({
        type: 'change',
        payload: {
          msg: `${time}: 数据刷新了...`,
          tableData: data
        }
      });
    }
  },
  reducers: {
    change(state, action) {
      return { ...state, ...action.payload };
    }
  }
};

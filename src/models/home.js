import { message } from 'antd';
import { getUser, getList } from 'services/home';

export default {
  namespace: 'home',
  state: {
    msg: 'init state 123...',
    listData: ['一段文字'],
    loading: false,
    tableData: [{
      key: '1',
      name: '胡彦斌22',
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
        } else if (location.pathname === '/list') {
          dispatch({
            type: 'getList',
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
          msg: 'new state5...'
        }
      });
    },
    *getUsers({ payload }, { call, put }) {
      yield put({type: 'change', payload: {loading: true}});
      const data = yield call(getUser);
      const date = new Date();
      message.success('表格数据已经刷新了...');
      const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      yield put({
        type: 'change',
        payload: {
          msg: `${time}: 数据刷新了...`,
          tableData: data.data.data,
          loading: false
        }
      });
    },
    *getList({ payload }, { call, put }) {
      yield put({type: 'change', payload: {loading: true}});
      const data = yield call(getList);
      console.log('data---->', data);
      message.success('列表数据已经刷新...');
      const date = new Date();
      const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      yield put({
        type: 'change',
        payload: {
          msg: `${time}: 列表数据刷新了...`,
          listData: data.data.data,
          loading: false
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

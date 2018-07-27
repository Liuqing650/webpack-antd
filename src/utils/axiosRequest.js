import axios from 'axios';
import Uuid from 'uuid';
import * as util from 'helpers';
import { message } from 'antd';

const userInfo = util.getUserInfo();
// 设置请求超时
axios.defaults.timeout = 1000;
// 拦截axios 处理token信息
axios.interceptors.request.use(
  axiosConfig => {
    if (!axiosConfig.isCancelTocken) {
      axiosConfig.headers['auth-id'] = `${userInfo ? userInfo.authId : Uuid.v4()}`;
      axiosConfig.headers['auth-token'] = 'sc-data';
      axiosConfig.headers['Cache-Control'] = 'no-cache';
    }
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
    message.error('request error!!!');
    console.log('request error', error);
  }
);

axios.interceptors.response.use((response) => response, (error) => {
  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }
  if (error && error.response.data.code === 401002) {
    window.location.href = '/#/login';
  }
  message.error('response error!!!');
  return Promise.reject(error);
});

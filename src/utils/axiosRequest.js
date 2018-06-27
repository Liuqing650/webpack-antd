import axios from 'axios';
import Uuid from 'node-uuid';
import { message } from 'antd';

// 拦截axios 处理token信息
axios.interceptors.request.use(
  axiosConfig => {
    if (!axiosConfig.isCancelTocken) {
      axiosConfig.headers['auth-id'] = `${Uuid.v4()}`;
      axiosConfig.headers['auth-token'] = 'maby-antd';
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
  if (error && error.response.data.errorCode === 401000) {
    window.location.href = '/';
  }
  message.error('response error!!!');
  return Promise.reject(error);
});

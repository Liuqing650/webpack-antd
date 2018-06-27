import axios from 'axios';
import Uuid from 'node-uuid';
import config from './config';

// 请求之前传递携带 token
axios.interceptors.request.use(
  axiosConfig => {
    axiosConfig.headers['auth-id'] = `${Uuid.v4()}`;
    axiosConfig.headers['auth-token'] = 'maby-antd';
    axiosConfig.headers['Cache-Control'] = 'no-cache';
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
  return Promise.reject(error);
});

// 修改 url
const modifyUrl = (url) => {
  if (/^http[s]?:(?:\/\/)/.test(url)) {
    return url;
  }
  return `${config.host}${url}`;
};
// 获取GET, PUT, POST, DELETE请求
// options 中可以传递 CancelToken
// CancelToken 获取方法
// const source = axios.CancelToken.source();
// options = {cancelToken: source.token}
const GET = (url, params, options = {}) => {
  return axios.get(modifyUrl(url), params, options);
};
const POST = (url, params, options = {}) => {
  return axios.post(modifyUrl(url), params, options);
};
const PUT = (url, params, options = {}) => {
  return axios.put(modifyUrl(url), params, options);
};
const DELETE = (url, params, options = {}) => {
  return axios.delete(modifyUrl(url), params, options);
};
const RequestAxios = () => ({
  get: GET,
  post: POST,
  put: PUT,
  delete: DELETE
});
const request = new RequestAxios();
export default request;

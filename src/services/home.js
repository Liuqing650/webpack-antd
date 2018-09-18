<<<<<<< HEAD
import axios from 'axios';

export function getUser(params) {
  return axios.get('/api/getUser', {params}).catch(error => error);
}

export function getList() {
  return axios.get('/api/list').catch(error => error);
=======
import { config } from 'utils';
import axios from 'axios';

export function getUser(params) {
  return axios.get(`${config.host}/api/getUser`, params).catch(error => error);
}

export function getList() {
  return axios.get(`${config.host}/api/list`, {isCancelTocken: true}).catch(() => ({error: true}));
>>>>>>> master
}

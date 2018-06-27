import {request} from 'utils';

export function getUser(params) {
  return request.get('/api/getUser', params);
}

export function getList() {
  return request.get('/api/list');
}

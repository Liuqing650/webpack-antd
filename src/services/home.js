import axios from 'axios';
import {config} from 'utils';
import * as mockApi from 'mockApi';

export function getUser() {
  return axios.get(`${config.host}/api/getUser`).catch((err) => {
    console.log(':::::MY GOD=====>', err.response);
    if (err) {
      return mockApi.createUserMock();
    }
  });
}

import axios from 'axios';
import {config} from 'utils';

export const getUser = () =>
  axios.get(`${config.host}/api/getUser`);

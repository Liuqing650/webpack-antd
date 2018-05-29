import { observable, action } from 'mobx';
import { message } from 'antd';
import { setPathValue } from 'pathval';
import { homeApi } from 'api';
import * as mockApi from 'mockApi';

class HomeStore {
  @observable msg = 'init store...';
  @observable update = '';
  @observable tableData = [];
  @observable isLoading = true;

  @action.bound changeValue(path, value) {
    setPathValue(this, path, value);
  }

  @action.bound getUsers() {
    message.success('数据已经刷新...');
    this.isLoading = true;
    homeApi.getUser()
      .then(resp => {
        this.isLoading = false;
        this.tableData = resp.data;
      })
      .catch(err => {
        console.log(err);
        const date = new Date();
        const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        this.isLoading = false;
        this.update = `${time}: 数据刷新了...`;
        this.tableData = mockApi.createUserMock();
      });
  }
}
export default new HomeStore();

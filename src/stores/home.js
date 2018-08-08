import { observable, action } from 'mobx';
import { message } from 'antd';
import { setPathValue } from 'pathval';
import { homeApi } from 'api';

class HomeStore {
  @observable msg = 'init store...';
  @observable update = '';
  @observable tableData = [];
  @observable loading = true;

  @action.bound changeValue(path, value) {
    setPathValue(this, path, value);
  }

  @action.bound getUsers() {
    message.success('数据已经刷新...');
    this.loading = true;
    homeApi.getUser()
      .then(resp => {
        const respData = resp.data;
        console.log('resp.data-------->', resp.data);
        this.loading = false;
        this.tableData = respData.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
export default new HomeStore();

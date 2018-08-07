import React from 'react';
import { observer, inject} from 'mobx-react';
import { toJS } from 'mobx';
import TableCom from 'components/common/tables';
import { Button } from 'antd';

const HomePage = ({ homeStore, routing }) => {
  const { tableData, msg, update } = homeStore;
  const tabelProps = {
    tableData: toJS(tableData),
    onRefresh() {
      homeStore.getUsers();
    }
  };
  const onJump = () => {
    routing.push('/page');
  };
  return (
    <div>
      <h2>HomePage</h2>
      <h4>state: {msg}</h4>
      <h4>记录: {update}</h4>
      <Button type="primary" onClick={onJump}>跳转页面</Button>
      <TableCom {...tabelProps} />
    </div>
  );
};
export default inject('homeStore', 'routing')(observer(HomePage));

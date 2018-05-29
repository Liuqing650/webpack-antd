import React from 'react';
import { observer, inject} from 'mobx-react';
import { toJS } from 'mobx';
import TableCom from 'components/common/tables';

const HomePage = ({ homeStore, routing }) => {
  const { tableData, msg, update } = homeStore;
  const tabelProps = {
    tableData: toJS(tableData),
    onRefresh() {
      homeStore.getUsers();
    }
  };
  return (
    <div>
      <h2>HomePage</h2>
      <h4>state: {msg}</h4>
      <h4>记录: {update}</h4>
      <TableCom {...tabelProps} />
    </div>
  );
};
export default inject('homeStore', 'routing')(observer(HomePage));

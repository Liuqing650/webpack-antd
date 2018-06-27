import React from 'react';
import { Table, Button } from 'antd';
import styles from './index.less';

const TableCom = ({
  tableData,
  onRefresh,
  onGo
}) => {
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  }];
  return (
    <div className={styles.wrap}>
      <div>
        <Button type="primary" onClick={onRefresh}>刷新数据</Button>
        <Button type="primary" onClick={onGo}>跳转下一页</Button>
      </div>
      <Table
        dataSource={tableData || []}
        columns={columns}
        rowKey={record => record.key}
      />
    </div>
  );
};
export default TableCom;

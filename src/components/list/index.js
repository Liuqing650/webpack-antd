import React from 'react';
import { Button } from 'antd';
import styles from './index.less';

const ListCom = ({
  listData,
  onRefresh,
  onBack
}) => {
  return (
    <div className={styles.wrap}>
      <div>
        <Button type="primary" onClick={onRefresh}>刷新数据</Button>
        <Button type="primary" onClick={onBack}>跳转到主页</Button>
      </div>
      {
        listData.map((list, index) => (<p key={`list-${index}`}>{list}</p>))
      }
    </div>
  );
};
export default ListCom;

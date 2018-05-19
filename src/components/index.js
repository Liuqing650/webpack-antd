import React from 'react';
import { Button } from 'antd';
import ChildPage from './childPage';
import styles from './index.less';

const Example = () => {
  const onClick = () => {
    console.log(5665);
  };
  return (
    <div>
      <p className={styles.text}>Example</p>
      <Button onClick={onClick}>Click Button</Button>
      <Button type="primary" icon="search">Search</Button>
      <ChildPage />
    </div>
  );
};
export default Example;

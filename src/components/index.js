import React from 'react';
import ChildPage from './childPage';
import styles from './index.less';

const Example = () => {
  const onClick = () => {
    console.log(5665);
  };
  return (
    <div>
      <p className={styles.text}>Example</p>
      <button onClick={onClick}>Click Button</button>
      <ChildPage />
    </div>
  );
};
export default Example;

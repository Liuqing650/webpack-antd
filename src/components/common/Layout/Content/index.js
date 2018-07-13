import React from 'react';
import styles from './index.less';

const Content = (props) => {
  return (
    <div className={styles.wrap}>
      {props.children}
    </div>
  );
};
export default Content;

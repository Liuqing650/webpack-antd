import React from 'react';
import styles from './index.less';

function AnimateLoading({ animateCategory, height }) {
  if (animateCategory) {
    return (
      <div className={styles.animateLoading}>
        <div className={styles['sk-small-wave']}>
          <div
            className={`${styles['sk-small-rect']} ${styles['sk-small-rect1']}`}
          />
          <div
            className={`${styles['sk-small-rect']} ${styles['sk-small-rect2']}`}
          />
          <div
            className={`${styles['sk-small-rect']} ${styles['sk-small-rect3']}`}
          />
        </div>
      </div>
    );
  }
  const styleHeight = height ? { height } : {};
  return (
    <div className={styles.animateLoadingBox} style={styleHeight}>
      <div className={styles.animateLoading}>
        <div className={styles['sk-wave']}>
          <div className={`${styles['sk-rect']} ${styles['sk-rect1']}`} />
          <div className={`${styles['sk-rect']} ${styles['sk-rect2']}`} />
          <div className={`${styles['sk-rect']} ${styles['sk-rect3']}`} />
          <div className={`${styles['sk-rect']} ${styles['sk-rect4']}`} />
          <div className={`${styles['sk-rect']} ${styles['sk-rect5']}`} />
        </div>
      </div>
    </div>
  );
}
export default AnimateLoading;

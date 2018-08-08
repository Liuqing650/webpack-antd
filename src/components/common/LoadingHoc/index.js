import React from 'react';
import { Spin } from 'antd';

const LoadingHoc = (WrapComponent) => {
  const LoadingWrapper = (props) => {
    return (
      <Spin spinning={props.homeStore.loading}>
        <WrapComponent {...props} />
      </Spin>
    );
  };
  return LoadingWrapper;
};
export default LoadingHoc;

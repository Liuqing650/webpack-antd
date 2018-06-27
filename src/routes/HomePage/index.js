import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import TableCom from 'components/tables';
import hoc from 'components/common/LoadingHoc';

const HomePage = ({dispatch, location, home}) => {
  const { tableData } = home;

  const tabelProps = {
    tableData,
    onRefresh() {
      dispatch({
        type: 'home/getUsers',
      });
    },
    onGo() {
      dispatch(routerRedux.push('/list'));
    }
  };
  return (
    <div>
      <h2>HomePage</h2>
      <h4>path: {location.pathname}</h4>
      <h4>state: {home.msg}</h4>
      <TableCom {...tabelProps} />
    </div>
  );
};
export default connect(({home}) => ({home, loading: home.loading}))(hoc(HomePage));

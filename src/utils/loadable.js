import Loadable from 'react-loadable';
import LoadingComponent from 'components/common/Loading';

const loadable = (component) => {
  return Loadable({
    loader: component,
    loading: LoadingComponent
  });
};
export default loadable;

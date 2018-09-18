export default {
  host: __DEV__ || __PREVIEW__ ? `http://${__HOST__}:${__APIPORT__}` : '',
};

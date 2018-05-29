export const handleTitle = (urlObj) => {
  const {pathname} = urlObj;
  let title = '';
  switch (true) {
    case /^\/home$/.test(pathname):
      title = '首页';
      break;
    default:
      title = '页面丢失';
      break;
  }
  return title;
};

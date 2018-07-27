export const getUserInfo = () => {
  const localUser = sessionStorage.getItem('userInfo');
  if (!localUser) {
    return false;
  }
  return JSON.parse(localUser);
};

export const saveUserInfo = (userInfo) => {
  if (!userInfo) {
    return false;
  }
  let _userInfo = '';
  if (typeof userInfo === 'object') {
    _userInfo = JSON.stringify(userInfo);
  } else {
    _userInfo = userInfo;
  }
  sessionStorage.setItem('userInfo', _userInfo);
  return true;
};

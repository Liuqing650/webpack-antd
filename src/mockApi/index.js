import Mock from 'mockjs';

export const createUserMock = (config) => {
  const _config = {
    // 股东列表
    data: config && config.data || 'data|5-30',
  };
  const mockData = Mock.mock({
    [_config.data]: [{
      'key': `@id`,
      'name': '@cname',
      'age': `@natural(20,50)`,
      'address': '@city'
    }]
  });
  return mockData.data;
};

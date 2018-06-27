import Mock from 'mockjs';

// mock响应时间ms
Mock.setup({
  timeout: 1000
});

Mock.mock(/\/api\/getUser\?/, 'get', {
  'data|5-30': [{
    'key': `@id`,
    'name': '@cname',
    'age': `@natural(20,50)`,
    'address': '@city'
  }]
})

Mock.mock(/\/api\/list\?/, 'get', {
  'data|5-30': ['@cparagraph']
})

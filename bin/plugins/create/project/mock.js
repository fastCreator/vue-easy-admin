module.exports = {
  'get:/v1/apis/userInfo' (req) {
    return {
      code: 200,
      data: {
        name: '张三'
      }
    }
  },
  'get:/v1/apis/permission' (req) {
    return {
        code: 200,
        data: ['local/page1']
      }
  }
}

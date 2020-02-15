module.exports = {
  async 'get:/v1/apis/userInfo' (req, delay) {
    await delay(500)
    return {
      code: 200,
      data: {
        name: '张三'
      }
    }
  },
  'get:/v1/apis/permission' (req) {
    if (req.get('token') === 'token2') {
      return {
        code: '4001'
      }
    }
    if (req.get('token') === 'token3') {
      return {
        code: '4002'
      }
    }
    return {
      code: 200,
      data: ['page1']
    }
  },
  'get:/v1/apis/refreshToken' (req) {
    return {
      code: 200,
      data: 'token1'
    }
  }
}

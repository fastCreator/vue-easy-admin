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
    let token
    if (req.get) {
      token = req.get('token')
    } else {
      token = localStorage.token
    }
    if (token === 'token2') {
      return {
        code: '4001'
      }
    }
    if (token === 'token3') {
      return {
        code: '4002'
      }
    }
    return {
      code: 200,
      data: ['page1','root.root1']
    }
  },
  'get:/v1/apis/refreshToken' (req) {
    return {
      code: 200,
      data: 'token1'
    }
  }
}

module.exports = {
  async 'get:/v1/apis/userInfo' (req,delay) {
    await delay(4000)
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

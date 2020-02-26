var Mock = require('mockjs')
const { Random } = Mock
module.exports = {
  async 'get:/v1/apis/tableList' (req, delay) {
    await delay(200)
    let arr = new Array(req.query.pageSize - 0).fill(0)
    return {
      code: 200,
      data: {
        list: arr.map(it => ({
          id: Math.random(),
          name: Random.name(),
          age: Random.integer(10, 40),
          sex: Random.integer(0, 1),
          mother: Random.name(),
          father: Random.name(),
          birth: Random.integer(582532131587, 1582532131587),
          color: Random.rgb(),
          input: Random.word(),
          select: 'zhangsan',
          audio: 'http://m4a.inke.cn/sktv/ori/m4a_64/12/20/1000382_9605.m4a',
          header:
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3139953554,3011511497&fm=26&gp=0.jpg'
        })),
        pages: {
          allSize: 110
        }
      }
    }
  }
}

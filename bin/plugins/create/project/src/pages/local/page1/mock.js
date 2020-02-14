module.exports = {
  'get:/v1/apis/testData/{userName}' () {
    return {
      code: 200,
      data: [1, 2, 3, 4]
    }
  }
}

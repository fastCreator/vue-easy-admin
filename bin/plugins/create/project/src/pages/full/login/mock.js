module.exports = {
  'post:/v1/apis/login' (req) {
    return { code: 200, data: { token: 'xxxxxx' } }
  }
}

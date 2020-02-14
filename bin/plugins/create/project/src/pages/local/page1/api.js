export default {
  getTestData () {
    this.$net('get:/v1/apis/testData/{id}', { params: { id: 1 } })
  }
}

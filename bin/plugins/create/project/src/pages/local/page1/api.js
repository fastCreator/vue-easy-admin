export default {
  getTableData (params) {
    return this.$net('get:/v1/apis/tableList', { query: params })
  }
}

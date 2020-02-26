<template>
  <div class="elpand-header">
    <el-button type="primary" @click="open('https://fastcreator.github.io/vue-easy-admin-doc/')">文档</el-button>
    <el-button type="primary" @click="logout">退出</el-button>
  </div>
</template>
<script>
export default {
  name: 'elpand-header',
  created () {
  },
  methods: {
    open(url){
      window.open(url)
    },
    logout () {
      this.$service.permission.logout()
    }
  }
}
</script>
<style lang="less">
.elpand-header {
  flex: 1;
  text-align: right;
  margin-right:10px;
}
</style>

<template>
  <div class="elpand-header">
    <el-button type="primary" @click="logout">退出</el-button>自定义头部
  </div>
</template>
<script>
export default {
  name: 'elpand-header',
  created () {
  },
  methods: {
    logout () {
      this.$permission.logout()
    }
  }
}
</script>
<style lang="less">
.elpand-header {
  flex: 1;
  text-align: right;
}
</style>

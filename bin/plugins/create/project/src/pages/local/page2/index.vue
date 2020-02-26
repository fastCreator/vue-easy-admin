<template>
  <div class="page-tow">
    <h1>page2</h1>
    <el-button @click="$router.push({ path: '/local/page3', query: { id: 3 } })"
      >打开下一级页面</el-button
    >
    <el-input v-model="value"></el-input>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  created () {},
  methods: {}
}
</script>

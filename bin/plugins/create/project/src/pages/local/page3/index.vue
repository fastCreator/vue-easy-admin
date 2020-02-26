<template>
  <div class="page-three">
    <h1>page3</h1>
    <el-button @click="$router.push('/local/page4')">打开下一级页面</el-button>
    <el-input v-for="i in 30" :key="i" v-model="value" />
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

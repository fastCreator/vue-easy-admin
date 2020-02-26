<template>
  <div class="page-three">
    <h1>page4</h1>
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

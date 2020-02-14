<template>
  <div class="page-one">
    page-one
    <el-input v-model="value" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.$api.getTestData()
  },
  methods: {}
}
</script>

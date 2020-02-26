<template>
  <div class="page-one">
    <el-button @click="copy">复制</el-button>
    <el-input v-model="value" type="textarea"></el-input>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: '复制内容'
    }
  },
  created () {},
  methods: {
    copy(){
      this.$service.copy.copyText(this.value)
    }
  }
}
</script>

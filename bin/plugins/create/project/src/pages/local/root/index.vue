<template>
  <div class="page-one">
    <el-button :disabled="!$hasPermission('root.root1')">权限1</el-button>
    <el-button :disabled="!$hasPermission('root.root2')">权限2</el-button>
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
  methods: {},
  computed:{
  }
}
</script>

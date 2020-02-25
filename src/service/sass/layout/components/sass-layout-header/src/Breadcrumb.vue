<template>
  <el-breadcrumb separator="/" class="breadcrumb-container">
    <el-breadcrumb-item
      v-for="(it, i) in breadcrumb"
      :key="getKey(it)"
      :to="i !== breadcrumb.length - 1 && it.path"
      >{{ it.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    breadcrumb: {}
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    handlerToggle () {
      this.$emit('toggle')
    },
    getKey (o) {
      if (typeof o === 'object') {
        return JSON.stringify(o)
      }
      return o
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>

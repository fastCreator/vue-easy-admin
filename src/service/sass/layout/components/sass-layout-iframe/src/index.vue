<template>
  <iframe
    ref="iframe"
    class="iframe-container"
    v-bind="$route.meta.iframe"
    :frameborder="0"
    :style="{ height }"
    width="100%"
    height="calc(100vh - 50px)"
  />
</template>
<script>
export default {
  name:'sass-layout-iframe',
  data () {
    return {}
  },
  computed: {
    height () {
      let h = 54
      const header = this.$store.state.layout.header
      if (header.tagsView) {
        h += 35
      }
      return `calc(100vh - ${h}px)`
    }
  },
  beforeCreate () {
    this.$service.loading.open()
  },
  mounted () {
    let that = this
    var oFrm = this.$refs.iframe
    oFrm.onload = oFrm.onreadystatechange = function () {
      if (this.readyState && this.readyState != 'complete') return
      else {
        that.$service.loading.close()
      }
    }
  }
}
</script>

<template>
  <iframe
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
  }
}
</script>

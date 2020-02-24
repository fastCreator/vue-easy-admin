<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" v-if="show" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  props: {
    show: {},
    tags: {}
  },
  data () {
    return {}
  },
  watch: {},
  computed: {
    key () {
      return this.$route.path
    },
    cachedViews () {
      let arrPath = this.$route.path
      let path = '/'
      if (arrPath.slice(0, 9) === '/redirect') {
        path = arrPath.slice(9)
      }
      return this.tags
        .filter(it => !it.noCache && it.path !== path)
        .map(it => it.path.replace(/\//g, ''))
    }
  }
}
</script>

<style lang="less" scoped>
.app-main {
  width: 100%;
  position: relative;
}
</style>

<style lang="less">
.elpand-layout .app-main.tagsView > .page-container {
  padding: 10px;
  height: calc(100vh - 105px);
  overflow: auto;
}
.elpand-layout .app-main > .page-container {
  padding: 10px;
  height: calc(100vh - 85px);
  overflow: auto;
}
</style>

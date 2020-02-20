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
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="less">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

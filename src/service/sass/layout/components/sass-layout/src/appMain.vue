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
      let ret = []
      this.tags.forEach(tag => {
        let arr = [tag]
        if (tag.child) {
          for (let key in tag.child) {
            arr.push(tag.child[key])
          }
        }
        arr.forEach(it => {
          if (!it.noCache && it.path !== path) {
            ret.push(it.path.replace(/\//g, ''))
          }
        })
      })
      console.log(ret)
      return ret
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

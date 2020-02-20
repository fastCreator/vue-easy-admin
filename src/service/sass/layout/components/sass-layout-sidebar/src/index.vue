<template>
  <div class="sass-layout-sidebar">
    <logo v-if="logo.showLogo" v-bind="logo" :collapse="collapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="collapse"
        unique-opened
        v-bind="menu"
        @select="select"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route,index) in navs"
          :key="route.path"
          :item="route"
          :basePath="`${index}`"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import logo from './Logo'
import SidebarItem from './SidebarItem'
export default {
  name: 'sass-layout-sidebar',
  components: {
    logo,
    SidebarItem
  },
  props: {
    activeMenu: {},
    collapse: {},
    navs: {},
    logo: {},
    menu: {}
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {
    select (...args) {
      this.$emit('menuSelect', ...args)
    }
  }
}
</script>
<style lang="less">
.sass-layout-sidebar {
}
</style>

<template> 
  <app-link v-if="!item.children || !item.children.length" :to="item.link || item.code">
    <el-menu-item :index="item.link?null:`/local/${item.code}`">
      <item :icon="item.icon" :title="item.title" />
    </el-menu-item>
  </app-link> 
  <el-submenu v-else-if="!item.hidden" ref="subMenu" :index="basePath">
    <template slot="title">
      <item v-if="item.title" :icon="item.icon" :title="item.title" />
    </template>
    <sidebar-item
      v-for="(child,index) in item.children"
      :key="index"
      :item="child"
      :basePath="`${basePath}-${index}`"
      class="nest-menu"
    /> 
  </el-submenu>
</template>

<script>
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    basePath: {},
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
  }
}
</script>

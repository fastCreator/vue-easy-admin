<template>
  <div
    :class="{
      'elpand-layout': true,
      affixHeader: config.header.affixHeader,
      tagsView: config.header.tagsView,
      collapse: collapse
    }"
  >
    <sass-layout-sidebar
      v-bind="config.sidebar"
      :collapse="collapse"
      :navs="navs"
      :activeMenu="activeMenu"
      @menuSelect="menuSelect"
    />
    <div class="layoutRight">
      <div class="header-container">
        <sass-layout-header
          @toggle="toggleCollapse"
          :collapse="collapse"
          :breadcrumb="breadcrumb"
        ></sass-layout-header>
        <TagsView v-show="config.header.tagsView" @changeTag="changeTag" />
      </div>
      <app-main
        :class="{ tagsView: config.header.tagsView }"
        :show="show"
        :tags="tags"
      />
    </div>
    <sass-layout-setting v-if="config.setting.show" />
  </div>
</template>

<script>
import appMain from './appMain'
import TagsView from './TagsView/index'
export default {
  name: 'sass-layout',
  components: {
    appMain,
    TagsView
  },
  data () {
    return {
      activeMenu: null,
      breadcrumb: [],
      collapse: false,
      tags: [],
      show: true,
      selectRouter: null,
      affixHeader: false
    }
  },
  watch: {
    $route: {
      handler (n) {
        if (n.name !== 'redirect') {
          const {
            nav: { selectNav }
          } = n.meta
          this.activeMenu = selectNav ? `/local/${selectNav}` : n.path
        }
        if (this.device === 'mobile') {
          this.collapse = true
        }
      },
      immediate: true
    },
    device: {
      handler (v) {
        if (v === 'mobile') {
          this.collapse = true
        }
      },
      immediate: true
    }
  },
  computed: {
    device () {
      return this.resize.device
    },
    resize () {
      return this.$store.state.resize
    },
    config () {
      return this.$store.state.layout
    },
    navs () {
      return this.$store.getters._navs
    }
  },
  created () {},
  methods: {
    setBreadcrumb () {
      let ret = []
      let tagView = this.tags.find(it => it.path === this.activeMenu)
      if (tagView) {
        const match = this.$router.match(tagView.path)
        const { parents } = match.meta.nav
        if (parents) {
          ret = parents.map(it => ({ title: it }))
        }
        ret.push({ title: tagView.title, path: tagView.path })
        let child = []
        for (let key in tagView.child) {
          child.push(tagView.child[key])
        }
        child
          .sort((a, b) => a.i - b.i)
          .forEach(it => {
            const {
              fullPath,
              meta: {
                nav: { title }
              }
            } = it
            ret.push({ path: fullPath, title })
          })
      }
      this.breadcrumb = ret
    },
    getPreNavs (path) {
      const match = this.$router.match(path)
      if (match) {
        const { parents, title, selectNav } = match.meta.nav
        let ret = [{ title, path: match.path }]
        if (selectNav) {
          ret = ret.concat(this.getPreNavs(selectNav))
        } else if (parents) {
          ret = ret.concat(parents.map(it => ({ title: it })))
        }
        return ret
      } else {
        console.error(`配置错误，无法找到上一层${path}菜单`)
      }
    },
    handleClickOutside () {},
    toggleCollapse () {
      this.collapse = !this.collapse
    },
    changeTag (tags) {
      this.tags = tags
      this.setBreadcrumb()
    },
    menuSelect () {
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 0)
    }
  }
}
</script>

<style lang="less">
.elpand-layout {
  &.affixHeader {
    &.collapse {
      .header-container {
        width: calc(100% - 55px);
      }
    }
    .header-container {
      z-index: 200;
      position: fixed;
      top: 0;
      right: 0;
      width: calc(100% - 210px);
      transition: width 0.28s;
    }
    .app-main {
      padding-top: 50px;
      &.tagsView {
        padding-top: 85px;
      }
    }
  }
  &.collapse {
    .sass-layout-sidebar {
      width: 54px;
    }
    .layoutRight {
      margin-left: 54px;
    }
  }
  .sass-layout-sidebar-wrap {
    width: 210px;
  }
  .sass-layout-sidebar {
    z-index: 99;
    position: fixed;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    transition: all 0.28s;
    background-color: rgb(84, 92, 100);
    width: 210px;
    .el-scrollbar {
      flex: 1;
      .scrollbar-wrapper {
        overflow-x: hidden;
        .el-scrollbar__view {
          height: 100%;
          > .el-menu {
            height: 100%;
            width: 100%;
            border: none;
            a {
              text-decoration: none;
            }
          }
        }
      }
    }
  }
  .sass-layout-header {
    height: 50px;
  }
  .layoutRight {
    transition: all 0.28s;
    position: relative;
    height: 100vh;
    margin-left: 210px;
  }
}
</style>

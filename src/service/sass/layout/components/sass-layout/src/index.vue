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
          @toggle="handlerToggle"
          :collapse="collapse"
          :selectRouter="selectRouter"
        ></sass-layout-header>
        <TagsView
          v-show="config.header.tagsView"
          @changeTag="changeTag"
          :selectRouter="selectRouter"
        />
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
        if (n.path.slice(0, 6) === '/local' && !n.meta.nav.hide) {
          this.selectRouter = n
        }
      },
      immediate: true
    }
  },
  computed: {
    resize () {
      return this.$service.resize.state
    },
    config () {
      return this.$store.state.layout
    },
    activeMenu () {
      return this.$route.path
    },
    navs () {
      return this.$store.getters._navs
    }
  },
  created () {},
  methods: {
    handleClickOutside () {},
    handlerToggle () {
      this.collapse = !this.collapse
    },
    changeTag (tags) {
      this.tags = tags
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
        width: calc(100% - 54px);
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

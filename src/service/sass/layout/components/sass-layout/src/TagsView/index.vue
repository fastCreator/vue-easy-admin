<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{
          path: tag.show.path,
          query: tag.show.query,
          fullPath: tag.show.fullPath
        }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="
          !isAffix(tag.show) ? closeSelectedTag(tag.show) : ''
        "
        @contextmenu.prevent.native="openMenu(tag.show, $event)"
      >
        {{ tag.show.title }}
        <span
          v-if="!isAffix(tag.show)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      class="contextmenu"
      :style="{ left: left + 'px', top: top + 'px' }"
    >
      <li @click="refreshSelectedTag(selectedTag)">{{ lang.refresh }}</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        {{ lang.close }}
      </li>
      <li @click="closeOthersTags">{{ lang.closeOthers }}</li>
      <li @click="closeAllTags(selectedTag)">{{ lang.closeAll }}</li>
    </ul>
  </div>
</template>

<script>
import lang from './lang.json'
import ScrollPane from './ScrollPane'
import path from 'path'

export default {
  components: { ScrollPane },
  props: {},
  data () {
    this.lang = lang
    return {
      activeTagPath: '',
      top: 0,
      left: 0,
      visible: false,
      selectedTag: {},
      visitedViews: []
    }
  },
  computed: {},
  watch: {
    $route: {
      handler (n, o) {
        this.dealVisitedViews(n)
      },
      immediate: true
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted () {},
  methods: {
    isAffix (n) {
      return n.affix || this.visitedViews.length === 1
    },
    getActiveTagPath (n) {
      if (!n) {
        return false
      }
      const {
        path,
        meta: {
          nav: { selectNav }
        }
      } = n
      return selectNav ? `/local/${selectNav}` : n.path
    },
    dealVisitedViews (n) {
      const { path } = n
      if(path.slice(0,7) !== '/local/'){
        return false
      }
      const activeTagPath = this.getActiveTagPath(n)
      let tagView = this.visitedViews.find(it => it.path === activeTagPath)
      if (!tagView) { // 添加根tagView
        const matchRoute = this.$router.match(activeTagPath)
        tagView = this.getTagInfo(matchRoute)
        this.visitedViews.push(tagView)
      }
      if (path !== activeTagPath) { // 子页面切换操作
        const nowTagChild = tagView.child[path]
        if (!nowTagChild) {  // 添加子页面
          tagView.child[path] = { ...n, i: Object.keys(tagView.child).length }
          tagView.show = this.getTagInfo(n)
        } else {  // 选中到某个子页面，删除后面页面
          let index = nowTagChild.i
          for (let key in tagView.child) {
            if (tagView.child[key].i > index) {
              delete tagView.child[key]
            }
          }
          tagView.show = this.getTagInfo(nowTagChild)
        }
      } else { // 回到根tagView
        tagView.child = {}
        tagView.show = tagView
      }
      this.activeTagPath = activeTagPath
      this.$emit('changeTag', this.visitedViews)
    },
    getTagInfo (route) {
      const {
        path,
        fullPath,
        query,
        meta: {
          nav: { title, noCache, selectNav }
        }
      } = route
      return { title, path, fullPath, query, noCache, affix: false, child: {} }
    },
    isActive (route) {
      return route.path === this.activeTagPath
    },
    refreshSelectedTag (view) {
      this.$router.replace({
        path: '/redirect' + view.fullPath
      })
    },
    closeSelectedTag (view) {
      for (let i = 0; i < this.visitedViews.length; i++) {
        if (view.path === this.visitedViews[i].path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
      if (view.path === this.$route.path) {
        this.$router.replace({
          path: this.visitedViews[0].path
        })
      }
    },
    closeOthersTags () {
      this.$router.push(this.selectedTag)
      this.visitedViews = this.visitedViews.filter(
        it => it.affix || this.selectedTag.path === it.path
      )
    },
    closeAllTags (view) {
      let arr = this.visitedViews.filter(it => it.affix)
      if (arr.length) {
        this.visitedViews = arr
      } else {
        this.visitedViews = [this.selectedTag]
      }
      this.$router.push(this.visitedViews[0])
    },
    openMenu (tag, e) {
      this.left = e.clientX + 5
      this.top = e.clientY + 5
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu () {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: fixed;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="less">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>

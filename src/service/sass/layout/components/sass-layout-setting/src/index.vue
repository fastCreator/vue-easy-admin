<template>
  <div class="sass-layout-setting">
    <div v-if="mask" class="mask" @click="toggleMask"></div>
    <div :class="{ rightPanel: true, hasMask: mask }">
      <div class="icon" @click="toggleMask">
        <i :class="mask ? 'el-icon-close' : 'el-icon-setting'"></i>
      </div>
      <div class="drawer-container">
        <div>
          <h3 class="drawer-title">{{ title }}</h3>

          <div class="drawer-item" v-for="(it, i) in settingList" :key="i">
            <span>{{ it.label }}</span>
            <el-select
              v-if="it.type === 'select'"
              v-model="it.value"
              @change="it.change"
            >
              <el-option
                v-for="item in it.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-switch
              v-else-if="it.type === 'switch'"
              :value="it.value"
              @change="it.change"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'sass-layout-setting',
  data () {
    let that = this
    this.title = {
      'zh-CN': '设置',
      en: 'setting'
    }
    return {
      mask: false,
      settingList: [
        that.getTheme(),
        that.setlang(),
        that.getTagsView(),
        that.getAffixHeader(),
        that.getLogo(),
        ...that.getUserSetting()
      ]
    }
  },
  created () {},
  methods: {
    toggleMask () {
      this.mask = !this.mask
    },
    changeSetting (name, v) {
      this.$store.commit('setLayoutsetting', {
        ...this.layout.setting,
        [name]: v
      })
    },
    getTheme () {
      let theme = this.$service.theme
      let o = {
        type: 'select',
        label: {
          'zh-CN': '主题',
          en: 'theme'
        },
        value: theme.selectTheme,
        change (v) {
          theme.setTheme(v)
          o.value = v
        },
        options: theme.config.list
      }
      return o
    },
    setlang () {
      let lang = this.$service.language
      let o = {
        type: 'select',
        label: {
          'zh-CN': '语言',
          en: 'language'
        },
        value: lang.i18n.locale,
        change (v) {
          lang.setLang(v)
          o.value = v
        },
        options: lang.config.list
      }
      return o
    },
    getTagsView () {
      let config = this.$service.layout.config
      let o = {
        type: 'switch',
        label: {
          'zh-CN': '显示标签',
          en: 'tagsView'
        },
        value: config.header.tagsView,
        change: v => {
          o.value = v
          this.$store.commit('setlayout-header', {
            ...config.header,
            tagsView: v
          })
        }
      }
      return o
    },
    getAffixHeader () {
      let config = this.$service.layout.config
      let o = {
        type: 'switch',
        label: {
          'zh-CN': '固定头部',
          en: 'fixedHeader'
        },
        value: config.header.affixHeader,
        change: v => {
          o.value = v
          this.$store.commit('setlayout-header', {
            ...config.header,
            affixHeader: v
          })
        }
      }
      return o
    },
    getLogo () {
      let config = this.$service.layout.config
      let o = {
        type: 'switch',
        label: {
          'zh-CN': '头部',
          en: 'logo'
        },
        value: config.sidebar.logo.showLogo,
        change (v) {
          o.value = v
          config.sidebar.logo.showLogo = v
        }
      }
      return o
    },
    getUserSetting () {
      return this.$service.layout.config.setting.list || []
    }
  },
  computed: {}
}
</script>
<style lang="less">
.sass-layout-setting {
  .mask {
    z-index: 300;
    position: fixed;
    align-items: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
  }
  .rightPanel {
    display: flex;
    z-index: 400;
    position: fixed;
    align-items: center;
    top: 0;
    right: -260px;
    transition: right 0.3s;
    &.hasMask {
      right: 0px;
    }
    .icon {
      background-color: rgb(24, 144, 255);
      cursor: pointer;
      width: 48px;
      height: 48px;
      border-radius: 6px 0 0 6px;
      color: #ffffff;
      line-height: 48px;
      font-size: 24px;
      text-align: center;
    }
    .drawer-container {
      width: 260px;
      height: 100vh;
      overflow: auto;
      background: #ffffff;
      padding: 24px;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
      box-sizing: border-box;
      .drawer-title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        line-height: 22px;
      }
      .drawer-item {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        padding: 12px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-select {
          width: 140px;
        }
      }
    }
  }
}
</style>

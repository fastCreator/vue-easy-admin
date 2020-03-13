import VueI18n from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'
export default {
  init ({ store }) {
    this.store = store
    const { defalut } = this.config
    const locale = localStorage.locale || defalut
    this._setmessages()
    this.Vue.use(VueI18n)
    this.i18n = new VueI18n({ messages: this.messages, locale })
    this.vueRoot = { i18n: this.i18n }
    ElementLocale.i18n((key, value) => this.i18n.t(key, value))
    this._setVueRenderString()
    this._setVueMixin()
    this._initRegisterStore(store)
  },
  setLang (lang) {
    localStorage.locale = lang
    this.i18n.locale = lang
    this.store.store.commit('setLangLang', lang)
  },
  getLang (v) {
    if (typeof v === 'object') {
      return v[this.i18n.locale]
    }
    return v
  },
  _initRegisterStore (store) {
    store.registerState('lang', {
      lang: this.i18n.locale
    })
  },
  _setVueRenderString () {
    const i18n = this.i18n
    this.Vue.prototype._s = function (val) {
      if (val == null) {
        return ''
      }
      if (Array.isArray(val)) {
        return JSON.stringify(val, null, 2)
      }
      if (typeof val === 'object') {
        let nowLang = val[i18n.locale]
        if (nowLang) {
          return nowLang
        }
      }
      return String(val)
    }
  },
  _setVueMixin () {
    this.Vue.mixin({
      computed: {
        $lang () {
          const locale = this.$i18n.locale
          const lang = this.$options._files.lang
          const ret = {}
          for (let key in lang) {
            ret[key] = lang[key][locale]
          }
          return ret
        },
        $globLang () {
          return this.$t('glob')
        }
      }
    })
  },
  _setmessages () {
    this.messages = {}
    this._setElementmessages()
    this._setUserGlobmessagesmessages()
  },
  _setElementmessages () {
    const { list } = this.config
    const importAllLang = require.context(
      'element-ui/lib/locale/lang',
      false,
      /.js$/
    )
    list.forEach(({ value }) => {
      this.messages[value] = {
        ...this.messages[value],
        ...importAllLang(`./${value}.js`).default
      }
    })
  },
  _setUserGlobmessagesmessages () {
    this._setModulemessagesFuc('glob', this.config.glob)
  },
  _setModulemessagesFuc (moduleName, langs) {
    for (let key in langs) {
      for (let key2 in langs[key]) {
        if (!this.messages[key2]) {
          this.messages[key2] = {}
        }
        if (!this.messages[key2][moduleName]) {
          this.messages[key2][moduleName] = {}
        }
        this.messages[key2][moduleName][key] = langs[key][key2]
      }
    }
  }
}

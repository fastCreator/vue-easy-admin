const NAVS = require.context(
  `${process.env.cwdDir}/src/pages`,
  false,
  /config.json$/
)('./config.json')

export default {
  init ({ store }) {
    this.store = store
    this._initRegisterStore(store)
    this.dealNavs = []
  },
  registerDealNavs (fn) {
    this.dealNavs.push(fn)
  },
  _getNavs (store) {
    const lang = store.state.lang.lang
    const navs = JSON.parse(JSON.stringify(NAVS))
    const mapNavs = navs2Map(navs, lang)
    const importAllConfig = require.context(
      process.env.localDir,
      true,
      /config.json$/
    )
    const configs = importAllConfig.keys().map(_ => {
      const config = importAllConfig(_)
      config.key = _
      return config
    })
    // nav插入到菜单
    configs.forEach(config => {
      let nav = config.nav
      // 设置code码
      let arrKey = config.key.split('/')
      const code = arrKey[arrKey.length - 2]
      if (!nav.hide) {
        // 判断权限
        if (!nav.isWhite && !store.state.permission.permission.includes(code)) {
          return false
        }
        nav.code = code
        // 设置标题
        if (typeof nav.title === 'object') nav.title = nav.title[lang]
        if (nav.parentCode) {
          let item = mapNavs[nav.parentCode]
          item.children.push(nav)
        } else {
          navs.push(nav)
        }
      }
    })
    return sortByPriority(navs)
  },
  _initRegisterStore ({ store }) {
    let that = this
    store.registerModule('navs', {
      getters: {
        _navs: state => {
          return that._getNavs(store)
        }
      }
    })
  }
}

function sortByPriority (arr) {
  let ret = arr.sort((a, b) => (a.sort || 0) - (b.sort || 0))
  if (arr.children) {
    ret.children = sortByPriority(arr.children)
  }
  return ret
}

function navs2Map (navs, lang) {
  const map = {}
  navs.forEach(c => {
    if (typeof c.title === 'object') c.title = c.title[lang]
    if (c.code) {
      map[c.code] = c
    } else {
      console.error(`请设置菜单${JSON.stringify(c)}的code码`)
    }
    if (c.children) {
      Object.assign(map, navs2Map(c.children))
    } else {
      c.children = []
    }
  })
  return map
}

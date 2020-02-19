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
    let that = this
    let navs = []
    const importAllConfig = require.context(
      process.env.localDir,
      true,
      /config.json$/
    )
    const configs = importAllConfig
      .keys()
      .map(_ => {
        const config  =importAllConfig(_)
        config.key = _
        return config
      })
      .sort((a, b) => {
        let pa = a.nav.priority
        let pb = b.nav.priority
        return pa - pb
      })
    configs.forEach(config => {
      let nav = config.nav
      let parents = nav.parents || []
      let p = navs
      let child = null
      try {
        let arrKey = config.key.split('/')
        const code = arrKey[arrKey.length - 2]
        if (!nav.hide) {
          if (
            !nav.isWhite &&
            !store.state.permission.permission.includes(code)
          ) {
            return false
          }
          for (let i = 0; i < parents.length; i++) {
            let title = parents[i]
            if (typeof title === 'object') {
              title = title[store.state.lang.lang]
            }
            child = p.find(it => it.title === parents[i])
            if (!child) {
              child = {
                title,
                children: []
              }
              p.push(child)
            }
            p = child.children
          }
          let title = nav.title[store.state.lang.lang] || nav.title
          let o = {
            title: title,
            icon: nav.icon,
            code
          }
          if (config.link) {
            o.link = config.link
          }
          p.push(o)
        }
      } catch (error) {
        console.log(error)
        console.log(`菜单异常:${config.key}`)
      }
    })
    that.dealNavs.forEach(fn => {
      fn(navs)
    })
    return navs
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

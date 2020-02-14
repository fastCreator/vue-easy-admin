export default {
  init ({ store }) {
    this.store = store
    this._initRegisterStore()
    this.navsFilter = []
    this.dealNavs = []
  },
  registerNavsFilter (fn) {
    this.navsFilter.push(fn)
  },
  registerDealNavs (fn) {
    this.dealNavs.push(fn)
  },
  setNavs () {
    let that = this
    let navs = []
    const importAllConfig = require.context(
      process.env.localDir,
      true,
      /config.json$/
    )
    importAllConfig.keys().forEach(key => {
      let nav = importAllConfig(key).nav
      let parents = nav.parents
      let p = navs
      let child = null
      try {
        let arrKey = key.split('/')
        const code = arrKey[arrKey.length - 2]
        if (!nav.hide) {
          for (let i = 0; i < that.navsFilter.length; i++) {
            if (that.navsFilter[i](code, nav) === false) {
              return false
            }
          }
          for (let i = 0; i < parents.length; i++) {
            let title = parents[i]
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
          nav.code = code
          p.push(nav)
        }
      } catch (error) {
        console.log(error)
        console.log(`菜单异常:${key}`)
      }
    })
    that.dealNavs.forEach(fn => {
      fn(navs)
    })
    this.store.store.commit('setNavsNavs', navs)
    
    console.log(navs)
  },
  _initRegisterStore () {
    this.store.registerState('navs', {
      navs: []
    })
  }
}

import layout from './layout.vue'

export default {
  init () {
    this.navs = this._getNav()
    const data = { config: this.config, navs: this.navs }
    layout.data = function () { return data }
    this.Vue.component('sass-layout', layout)
  },
  _getNav () {
    let navs = []
    const importAllConfig = require.context(
      process.env.localDir,
      true,
      /config.json$/
    )
    importAllConfig.keys().map(key => {
      let nav = importAllConfig(key).nav
      let parents = nav.parents
      let p = navs
      let child = null
      try {
        if (!nav.hide) {
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
          let arrKey = key.split('/')
          nav.code = arrKey[arrKey.length - 2]
          p.push(nav)
        }
      } catch (error) {
        console.log(error)
        console.log(`菜单异常:${key}`)
      }
    })
    return navs
  }
}

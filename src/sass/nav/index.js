import router from 'iass/router'
import store from 'iass/store'
import userConfig from '_src/utils/userConfig'
let navs = getNav()
setRouter()
setStore()
export default navs

function setRouter () {
  router.register(
    'beforeEach',
    async (to, from) => {
      document.title = `${
        to.meta.nav && to.meta.nav.title ? to.meta.nav.title : ''
      }-${process.env.title}`
    },
    'end'
  )
  router.register(
    'beforeEach',
    async (to, from) => {
      document.title = `${
        to.meta.nav && to.meta.nav.title ? to.meta.nav.title : ''
      }-${process.env.title}`
    },
    'end'
  )
}

function setStore () {
  store.registerModule('navs', {
    state: {
      navs: navs
    }
  })
}

function getNav () {
  let navs = []
  const importAllConfig = require.context(
    process.env.pagesDir,
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
      console.log(`菜单异常:${key}`)
    }
  })
  return navs
}

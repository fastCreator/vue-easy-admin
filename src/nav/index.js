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
    p.push(nav)
  } catch (error) {
    console.log(`菜单异常:${key}`)
  }
})

export default navs

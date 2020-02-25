export default {
  init ({ router, store }) {
    this._initRegisterRouter(router, store)
  },
  _initRegisterRouter (router, { store }) {
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
        if (to.name !== 'redirect') {
          let nav = to.meta.nav
          let title = nav.title[store.state.lang.lang] || nav.title
          document.title = `${title}-${process.env.title}`
        }
      },
      'end'
    )
  }
}

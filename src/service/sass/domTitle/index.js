export default {
  init ({ router }) {
    this._initRegisterRouter(router)
  },
  _initRegisterRouter (router) {
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
}

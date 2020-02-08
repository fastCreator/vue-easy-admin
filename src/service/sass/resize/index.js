const WIDTH = 991
const { body } = document

export default {
  init ({ store }) {
    this._initRegisterStore(store)
    this._addEventListener(store)
  },
  _addEventListener (store) {
    window.addEventListener('resize', () => {
      if (!document.hidden) {
        store.store.commt('setResizeViewSize', this._getViewResize())
      }
    })
  },
  _initRegisterStore (store) {
    store.registerState('resize', { viewSize: this._getViewResize() })
  },
  _getViewResize () {
    const rect = body.getBoundingClientRect()
    return {
      ...rect,
      device: rect.width < WIDTH ? 'mobile' : 'desktop'
    }
  }
}


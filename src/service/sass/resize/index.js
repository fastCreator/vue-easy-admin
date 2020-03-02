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
        const { width, height, device } = this._getViewResize()
        store.store.commit('setResizeWidth', width)
        store.store.commit('setResizeHeight', height)
        store.store.commit('setResizeDevice', device)
      }
    })
  },
  _initRegisterStore (store) {
    store.registerState('resize', { ...this._getViewResize() })
    this.state = store.store.state.resize
  },
  _getViewResize () {
    const { width, height } = body.getBoundingClientRect()
    return {
      width,
      height,
      device: width < WIDTH ? 'mobile' : 'desktop'
    }
  }
}

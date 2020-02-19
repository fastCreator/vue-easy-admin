export default {
  init () {
    this._setEL()
  },
  _setEL () {
    const loadNode = document.createElement('textarea')
    loadNode.style.resize = 'none'
    loadNode.style.width = 0
    loadNode.style.height = 0
    loadNode.style.border = 'none'
    loadNode.style.position = 'fixed'
    loadNode.style.zIndex = -1
    document.body.appendChild(loadNode)
    this.el = loadNode
  }, 
  copyText (v, cb) {
    if (v) {
      this.el.value = v
      this.el.select()
      document.execCommand('copy')
      cb && cb()
    }
  }
}

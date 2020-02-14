import './loading.less'

const loadNode = document.createElement('div')
loadNode.id = 'loading-wrap'
loadNode.innerHTML = `<img src="./public/loading.svg">`
document.body.appendChild(loadNode)

export default class {
  constructor (timeout) {
    this.timeout = timeout
    this.count = 1
    this.loadingInstance = null
    this.t = null
  }
  open () {
    loadNode.style.display = null
    this.count++
    this.endTime === Date.now()
    this.t && clearTimeout(this.t)
    this.t = setTimeout(this.closeAll.bind(this), this.timeout)
  }
  close () {
    this.count--
    if (this.count <= 0) {
      this.count = 0
      loadNode.style.display = 'none'
    }
  }
  closeAll () {
    this.count = 0
    loadNode.style.display = 'none'
  }
}

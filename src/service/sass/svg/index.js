import SvgIcon from './SvgIcon'

const requireAll = require.context(process.env.svgDir, false, /\.svg$/)
requireAll.keys().map(requireAll)

export default {
  init () {
    // this._getAllSvg()
    this.Vue.component('svg-icon', SvgIcon)
  }
  // _getAllSvg () {
  //   const requireAll = require.context(process.env.svgDir, false, /\.svg$/)
  //   requireAll.keys().map(requireAll)
  // }
}

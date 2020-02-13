import SvgIcon from './SvgIcon'


export default {
  init () {
    this._getAllSvg()
    this.Vue.component('svg-icon', SvgIcon)
  },
  _getAllSvg () {
    const req = require.context(process.env.svgDir, false, /\.svg$/)
    console.log(req.keys())
    const requireAll = requireContext => requireContext.keys().map(requireContext)
    requireAll(req)
  }
}


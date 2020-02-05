import Vue from 'vue'
import SvgIcon from './SvgIcon'

Vue.component('svg-icon', SvgIcon)

const req = require.context(process.env.svgDir, false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

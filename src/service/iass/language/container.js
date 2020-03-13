const path = require('path')
const cwd = process.cwd()
const resolve = path.resolve

module.exports = {
  loadFile: [{ path: 'lang.json', name: 'lang' }]
}

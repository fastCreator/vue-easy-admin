const utils = require('loader-utils')
const path = require('path')
const fs = require('fs')
module.exports = function (source) {
  const FileList = utils.getOptions(this).FileList
  const dir = path.dirname(this.resourcePath)
  const importFile = loaderFile(FileList, dir)
  source = source.replace(
    '<script>',
    `<script>
    ${importFile.map(it => it.file + '\n').join('\n')}
    `
  )
  source = source.replace(
    'export default {',
    `export default {
       _files:{${importFile.map(it => it.name).join(',')}},
    `
  )
  return source
}

function loaderFile (FileList, dir) {
  let ret = []
  FileList.forEach(it => {
    if (fs.existsSync(path.resolve(dir, it.path))) {
      ret.push({ name: it.name, file: `import ${it.name} from './${it.path}'` })
    }
  })
  return ret
}

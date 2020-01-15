const path = require('path')
const fs = require('fs')
const Service = require('@vue/cli-service/lib/Service')
const rootdir = path.resolve(__dirname, '../')
const cwd = process.cwd()

if (!fs.statSync(path.resolve(cwd, 'config.json'))) {
  console.error('请在运行根目录添加config.json')
  process.exit(1)
}

module.exports = rawArgv => {
  const service = new Service(rootdir)
  const args = require('minimist')(rawArgv, {
    boolean: [
      // build
      'modern',
      'report',
      'report-json',
      'inline-vue',
      'watch',
      // serve
      'open',
      'copy',
      'https',
      // inspect
      'verbose'
    ]
  })
  const command = args._[0]

  service.run(command, args, rawArgv).catch(err => {
    console.error(err)
    process.exit(1)
  })
}

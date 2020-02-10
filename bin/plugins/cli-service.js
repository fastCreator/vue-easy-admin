const fs = require('fs')
const path = require('path')
const rootdir = path.resolve(__dirname, '../../')
const cwd = process.cwd()
const Service = require('@vue/cli-service/lib/Service')

module.exports = {
  cmd: 'run',
  script: rawArgv => {
    copyEslintrc()
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
  },
  helpInfo: 'run ***          [运行vue-cli 命令]'
}

function copyEslintrc () {
  const fileName = '.eslintrc.js'
  fs.copyFile(
    path.resolve(rootdir, fileName),
    path.resolve(cwd, fileName),
    err => {
      if (err) throw err
    }
  )
}

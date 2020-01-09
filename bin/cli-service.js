const path = require('path')
const Service = require('@vue/cli-service/lib/Service')
const rootdir = path.resolve(__dirname, '../')
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

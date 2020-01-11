const path = require('path')
const Service = require('@vue/cli-service/lib/Service')
const rootdir = path.resolve(__dirname, '../')
// process.env.VUE_CLI_SERVICE_CONFIG_PATH = path.resolve(rootdir,'vue.config.js')
module.exports = rawArgv => {
  const service = new Service(rootdir)
  console.log(service.loadUserOptions)
  console.log(service.loadUserOptions)
  // let loadUserOptions = service.loadUserOptions
  // service.loadUserOptions = function(){
  //   this.context = rootdir
  //   loadUserOptions.call(this)
  //   this.context = path.resolve(process.cwd())
  // }
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

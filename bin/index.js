#!/usr/bin/env node
const Package = require('../package.json')

const plugins = require('./plugins')
function run (argv) {
  let arg0 = argv[0]
  if (arg0 === '-v' || arg0 === '--version') {
    console.log(Package.version)
  } else if (arg0 === '-h' || arg0 === '--help') {
    logHelp()
  } else {
    let plugin = plugins.find(it => it.cmd === arg0)
    if (plugin) {
      console.log(argv)
      console.log(argv.slice(1))
      plugin.script(argv.slice(1))
    } else {
      logHelp()
    }
  }
}

run(process.argv.slice(2))

function logHelp () {
  console.log('  usage:')
  console.log('  -v --version     [查看版本]')
  plugins.forEach(it => {
    console.log(`  ${it.helpInfo}`)
  })
}

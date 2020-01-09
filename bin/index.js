#!/usr/bin/env node

const cliService = require('./cli-service')
const Package = require('../package.json')

function run (argv) {
  let arg0 = argv[0]
  if (arg0 === '-v' || arg0 === '--version') {
    console.log(Package.version)
  } else if (arg0 === '-h' || arg0 === '--help') {
    console.log('  usage:\n')
    console.log('  -v --version [show version]')
    console.log('  run **       [运行vue-cli 命令]')
  } else if (arg0 === 'run') {
    cliService(process.argv.slice(3))
  }
}

run(process.argv.slice(2))

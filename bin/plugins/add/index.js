const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const fse = require('fs-extra')
const cwd = process.cwd()
const resolve = path.resolve
const logRed = _ => console.log(chalk.red(_))
const RootRsolve = (a, b) => resolve(cwd, 'src/pages', a, b)
module.exports = {
  cmd: 'add',
  script: async args => {
    const type = args[0]
    const projectName = args[1]
    if (!projectName || !type || type !== 'full' || type !== 'local') {
      logRed('请输入正确脚本')
      return false
    }
    const projectDir = RootRsolve(type, projectName)
    fse.mkdirpSync(projectDir)
    if (fs.readdirSync(projectDir).length) {
      logRed('页面名称已存在，请手动删除后添加')
      return false
    }
    fse.copySync(resolve(__dirname, './page'), projectDir)
  },
  helpInfo: 'create ProjectName  [初始化项目]'
}

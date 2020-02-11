const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { prompt } = require('enquirer')
const fse = require('fs-extra')
const cwd = process.cwd()
const resolve = path.resolve
const logRed = _ => console.log(chalk.red(_))
const RootRsolve = _ => resolve(cwd, _)
const RootExistsSync = _ => fs.existsSync(RootRsolve(_))
const YON = ['Y', 'N']
module.exports = {
  cmd: 'create',
  script: async args => {
    const projectName = args[0]
    if (!projectName) {
      logRed('请输入项目名称')
      return false
    }
    const projectDir = RootRsolve(projectName)
    fse.mkdirpSync(projectDir)
    if (fs.readdirSync(projectDir).length) {
      const isCover = await prompt({
        type: 'confirm',
        name: 'isCover',
        message: `${projectName}文件夹不为空是否覆盖`
      })
      if (!isCover.isCover) {
        return false
      }
    }
    fse.copySync(resolve(__dirname, './project'), projectDir)
  },
  helpInfo: 'create ProjectName  [初始化项目]'
}

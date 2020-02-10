const importAllVue = require.context(process.env.themeDir, true, /index.css$/)

export default {
  init () {
    const { defalut } = this.config
    this._themeMap = {}
    this.setTheme(localStorage.theme || defalut)
  },
  setTheme (theme) {
    if (this.selectTheme) {
      this._themeMap[this.selectTheme].unuse()
    }
    this.selectTheme = theme
    localStorage.selectTheme = theme
    if (!this._themeMap[theme]) {
      this._themeMap[theme] = importAllVue(`./${theme}/index.css`)
    }
    this._themeMap[theme].use()
  }
}

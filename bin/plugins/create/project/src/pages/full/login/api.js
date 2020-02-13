export default {
  login () {
    return this.$net('basic.login', { body: this.loginForm })
  }
}

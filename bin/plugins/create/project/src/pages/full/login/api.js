export default {
  login () {
    return this.$net('post:/v1/apis/login', { body: this.loginForm })
  }
}

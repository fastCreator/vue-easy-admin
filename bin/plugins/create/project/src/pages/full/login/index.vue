<template>
  <div class="page-login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $lang.loginForm }}</h3>
        <el-dropdown @command="selectLag">
          <span class="el-dropdown-link">
            <svg-icon iconClass="language" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="{ label, value } in languageList"
              :key="value"
              :disabled="lang === value"
              :command="value"
            >
              {{ label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="直接点击登录按钮" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="直接点击登录按钮"
        />
      </el-form-item>

      <el-button type="primary" @click="handleLogin">{{
        $lang.login
      }}</el-button>
    </el-form>
  </div>
</template>

<script>
import service from '@service'
const { language } = service
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      let data = await this.$api.login()
      this.$service.permission.login(data.token)
      location.reload()
    },
    selectLag (v) {
      this.lang = v
    }
  },
  computed: {
    languageList () {
      return language.config.list
    },
    lang: {
      get () {
        return this.$store.state.lang.lang
      },
      set (v) {
        this.$store.commit('setLangLang', v)
        this.$forceUpdate()
      }
    }
  }
}
</script>

<style lang="less">
.page-login {
  height: 100vh;
  width: 100vw;
  background-color: #2d3a4b;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .title-container {
      position: relative;
      font-size: 26px;
      color: #eee;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: 700;
      .el-dropdown {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 20px;
        color: #ffffff;
        margin-top: 8px;
      }
    }
    .el-form-item {
      border: 1px solid hsla(0, 0%, 100%, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $lang.loginForm }}</h3>
      </div>

      <el-form-item prop="username">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" />
      </el-form-item>
      

      <el-button type="primary" @click="handleLogin">{{
        $lang.login
      }}</el-button>
    </el-form>
  </div>
</template>

<script>
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
      this.$permission.login(data.token)
      location.reload()
    }
  },
  computed: {
  }
}
</script>

<style lang="less"></style>

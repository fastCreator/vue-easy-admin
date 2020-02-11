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
        <h3 class="title">{{ $l('loginForm') }}</h3>
      </div>

      <el-form-item prop="username">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="lang"
          placeholder="请选择语言"
        >
          <el-option
            v-for="item in langList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="theme"
          placeholder="请选择主题"
        >
          <el-option
            v-for="item in themeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-button type="primary" @click="handleLogin">{{
        $l('login')
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
      let token = await this.$net('basic.login', { body: this.loginForm })
      this.$permission.token.set(token.token)
      location.reload()
    }
  },
  computed: {
    lang: {
      get () {
        return this.$store.state.lang.locale
      },
      set (v) {
        this.$store.commit('setLang', v)
      }
    },
    langList () {
      return this.$store.state.lang.list
    },
    theme: {
      get () {
        return this.$store.state.theme.theme
      },
      set (v) {
        this.$store.commit('setTheme', v)
      }
    },
    themeList () {
      return this.$store.state.theme.list
    }
  }
}
</script>

<style lang="less"></style>

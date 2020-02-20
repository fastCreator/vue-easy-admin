<template>
<div class="sass-layout-header">
    <Hamburger @toggle="handlerToggle" :isActive="!collapse"/>
    <Breadcrumb :nav="selectNav"/>
    <elpand-header/>
</div>
</template>
<script>
import Hamburger from './Hamburger'
import Breadcrumb from './Breadcrumb'
export default {
  name: 'sass-layout-header',
  components: {
    Hamburger,
    Breadcrumb
  },
  props: {
    collapse: {},
    selectRouter: {}
  },
  data () {
    return {

    }
  },
  created () {
  },
  computed: {
    selectNav () {
      return (this.selectRouter && this.selectRouter.meta) ? this.selectRouter.meta.nav : []
    }
  },
  methods: {
    handlerToggle () {
      this.$emit('toggle')
    }
  }
}
</script>
<style lang="less">
.sass-layout-header {
  height: 50px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background: #ffffff;
}
</style>

<template>
  <div>
    pages
    {{ nav }}
    <router-view />
  </div>
</template>

<script>
import nav from '../../nav'
export default {
  data () {
    return {
      nav
    }
  }
}
</script>

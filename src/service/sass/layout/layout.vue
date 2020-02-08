<template>
    <elpand-layout :config="config" :navs="navs"></elpand-layout>
</template>
<script>
export default {
    created () {
        console.log(this)
        console.log(this.config)
    }
}
</script>

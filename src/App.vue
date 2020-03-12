<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
html,
body {
  padding: 0;
  margin: 0;
  background: #f2f2f2;
  color: #666;
}
.elpand-layout {
  /*修改滚动条样式*/
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    /**/
  }
  ::-webkit-scrollbar-track {
    background: rgb(239, 239, 239);
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background: #bfbfbf;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #333;
  }
  ::-webkit-scrollbar-corner {
    background: #179a16;
  }
}
</style>

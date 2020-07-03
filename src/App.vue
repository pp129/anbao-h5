<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<style lang="less">
  html,body{
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  background: #f7f8fa;
  /*text-align: center;*/
  /*color: rgba(69, 90, 100, 0.6);;*/
}
</style>

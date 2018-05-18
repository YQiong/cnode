<template>
  <div id="app">
    <c-header></c-header>
    <router-view name="main"></router-view>
    <router-view name="sidebar"></router-view>
  </div>
</template>

<script>
  import CHeader from '@/components/Header'
  export default {
    name: "App",
    components:{
      CHeader
    }
  }
</script>

<style>
body{
  margin: 0;
  padding: 0;
  background: #e1e1e1;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 960px;
}
</style>

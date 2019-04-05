<template>
  <div id="app">
    <cm-header></cm-header>
    <router-view class="app-middle"></router-view>
  </div>
</template>

<script>
  import CmHeader from './components/cm-header'
  import store from './store/index.js'

  export default {
    name: 'app',
    components: {
      CmHeader
    },
    created () {
      store.dispatch('getUser')
    }
  }
</script>

<style lang="scss" scoped>
.app-middle{
  width: 800px;
  margin: 80px auto 20px;
}
</style>


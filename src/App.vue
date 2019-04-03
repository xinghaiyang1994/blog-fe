<template>
  <div id="app">
    <cm-header></cm-header>
    <router-view class="app-middle"></router-view>
  </div>
</template>

<script>
import CmHeader from './components/cm-header'

export default {
  name: 'app',
  components: {
    CmHeader
  },
  created () {
  
  }
}
</script>

<style lang="scss" scoped>
.app-middle{
  width: 1000px;
  margin: 80px auto 20px;
}
</style>


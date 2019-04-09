<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: this.$route.path
      }
    },
    watch: {
      '$route'() {
        this.activeName = this.$route.path
      }
    }
  }
</script>

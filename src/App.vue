<template>
  <v-app>
    <!-- display nav bar -->
    <nav-bar></nav-bar>
    <router-view style="margin-top:15%"></router-view>
  </v-app>
</template>
<script>
import NavBar from '@/views/NavBar'
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>
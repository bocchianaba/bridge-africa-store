<template>
    <!-- display the navigation bar -->
    <v-app-bar
     translate=""
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/logo.png"
          transition="scale-transition"
          width="40"
        />
        <span class="hidden-xs-only">{{title}}</span>
        
      </div>
      <v-spacer></v-spacer>
<!-- navigation bar links -->
      <v-toolbar-items  v-if="!userLogedIn">
        <v-btn color="green darken-3"  v-for="item in itemsNotlogin" :key="item.title" :to="item.link">
          <v-icon left>{{item.icon}}</v-icon><span>{{item.title}}</span>
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar-items>
      <v-toolbar-items  v-else>
        <v-btn color="green darken-3"  v-for="item in itemslogin" :key="item.title" :to="item.link">
          <v-icon left>{{item.icon}}</v-icon><span class="hidden-sm-and-down">{{item.title}}</span>
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar-items>
      <!-- sign out button -->
      <v-toolbar-items  @click='logout' v-if="userLogedIn" >
        <v-btn  color="green darken-3"        
          >
          <v-icon left>mdi-account-lock</v-icon><span class="hidden-sm-and-down">Logout</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
</template>
<script>
export default {
    title:process.env.VUE_APP_TITLE,
    data(){
      return {title:process.env.VUE_APP_TITLE}
    },
    computed: {
        itemsNotlogin() {
          let menuItems =  [
            {
              title: 'Register',
              icon: 'mdi-account-plus-outline',
              link: '/register'
            },
            {
              title: 'Login',
              icon: 'mdi-account-key',
              link: '/login'
            }
          ]
          return menuItems
        },
        itemslogin() {
          let menuItems =  [
            {
              title: 'Home',
              icon: 'mdi-home',
              link: '/home'
            },
            {
              title: 'My Cars',
              icon: 'mdi-car',
              link: `/myproduct`
            }
          ] 
          return menuItems
        },
        userLogedIn(){
          return this.$store.getters.user
        }
    },
    methods:{
      logout(){
        this.$store.dispatch('logoutAction')
        this.$router.push('/login')
      }
    },
    created () {
      this.$store.dispatch('initAction')
    },
}
</script>
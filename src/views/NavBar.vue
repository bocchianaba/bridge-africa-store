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
        <span class="hidden-xs-only">Bridge Africa Store</span>
        
      </div>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
<!-- navigation bar links -->
      <v-toolbar-items  v-if="!userLogedIn">
        <v-btn flat v-for="item in itemsNotlogin" :key="item.title" :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>{{item.title}}
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar-items>
      <v-toolbar-items  v-else>
        <v-btn flat v-for="item in itemslogin" :key="item.title" :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>{{item.title}}
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar-items>
      <!-- sign out button -->
      <v-toolbar-items  @click='logout' v-if="userLogedIn" >
        <v-btn
          flat
          >
          <v-icon left>mdi-account-lock</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
</template>
<script>
export default {
    title:process.env.VUE_APP_TITLE,
    computed: {
        itemsNotlogin() {
        let menuItems =  [
            {
            title: 'Register',
            icon: 'mdi-account-circle',
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
            title: 'My Products',
            icon: 'mdi-cart',
            link: `/myproduct/${this.$store.getters.user}`
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
    }
}
</script>
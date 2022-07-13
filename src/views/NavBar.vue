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
      <!-- <v-toolbar-items class="hidden-md-and-down">        
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              color="green darken-3" 
              dark
              v-bind="attrs"
              v-on="on">
              <v-icon>mdi-account-cog</v-icon>
              My account
            </v-btn>
          </template>
          <v-list color="green darken-3" dark>
            <v-list-item link :to="item.link" v-for="item in account_items" :key="item.key">
              <v-list-item-action>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-item-action>
              <v-list-item-title>
                {{ item.label }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items> -->
      <!-- sign out button -->
      <v-toolbar-items  @click='logout' v-if="userLogedIn" >
        <v-btn  color="green darken-3">
          <v-icon left>mdi-logout</v-icon><span class="hidden-sm-and-down">Logout</span>
        </v-btn>
      </v-toolbar-items>
      <!-- <v-toolbar-items class="hidden-lg-and-up">
        <v-btn color="primary" @click="drawer=!drawer">
          <v-icon>mdi-application</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar-items> -->
      <!-- <v-navigation-drawer v-show="drawer" right stateless permanent floating value="true">
        <v-list v-if="userLogedIn" dense class="pt-0">
          <v-list-item v-for="item in itemslogin" :key="item.key" :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer> -->
    </v-app-bar>
</template>
<script>
export default {
    title:process.env.VUE_APP_TITLE,
    data(){
      return {
        title:process.env.VUE_APP_TITLE,
        drawer: false
      }
    },
    computed: {
        account_items(){
          let items=[
            {
              key: 1,
              label: "My Profile",
              link: "/profile",
              icon: "mdi-account-cog"
            },
            {
              key: 2,
              label: "My wishlist",
              link: "/wishlist",
              icon: "mdi-star-shooting"
            },
            {
              key: 3,
              label: "My settings",
              link: "/setting",
              icon: "mdi-cog"
            },
            // {
            //   key: 4,
            //   label: "Log Out",
            //   link: "/logout",
            //   icon: "mdi-logout"
            // },
          ]
          return items
        },
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
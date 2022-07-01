<template>
  <v-container>
    <v-row>
      <v-col
      cols="12"
      lg="12"
      md="12">
        <h2 style="text-align:center">Welcome to your best online sales application destinated for car</h2>
      </v-col> 
       <v-col 
        cols="12"
        md="12"
        sm="12"
        xs="12">
        <v-img
          src="./../assets/logo.png"
          height="200px"
          contain
        ></v-img>
      </v-col>
      <v-col
      cols="12"
      lg="12"
      md="12">
        <h2 style="text-align:center;color: blue">{{title}}</h2>
      </v-col>
    </v-row>  
    <v-row justify="center">
      <v-col 
        cols="12"
        md="4"
        sm="6"
        xs="8"
        v-for="item in visibleProducts" :key="item.id">
        <v-card>
          <v-img
            :src="item.image"
            height="200px"
            contain
          ></v-img>

          <v-card-title>
            {{item.label}}
          </v-card-title>

          <v-card-subtitle>
            {{item.price}} $
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              link
              :to="item.link"
            >
              Pourchase
            </v-btn>

            <v-spacer></v-spacer>
            <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
            <v-badge
              color="primary"
              :content="item.like.length"
              v-bind="attrs"
              v-on="on"
            >                               
              <v-btn
                color="primary"
                icon
                :to="item.link"
              >
                <v-icon>{{(item.like.findIndex(l=>user.id==l)!=-1)?'mdi-thumb-up':'mdi-thumb-up-outline'}}</v-icon>
              </v-btn>
            </v-badge>
            </template>
            <span>Aimer</span>
            </v-tooltip>

            <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
            <v-badge
              color="primary"
              :content="item.dislike.length"
              v-bind="attrs"
              v-on="on"
            > 
            <v-btn
              color="primary"
              icon
            >
              <v-icon>{{(item.dislike.findIndex(l=>user.id==l)!=-1)?'mdi-thumb-down':'mdi-thumb-down-outline'}}</v-icon>
            </v-btn>
            </v-badge>
            </template>
            <span>Ne pas aimer</span>
            </v-tooltip>

            <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
            <v-badge
              color="primary"
              :content="item.love.length"
              v-bind="attrs"
              v-on="on"
            > 
            <v-btn
              color="primary"
              icon
            >
              <v-icon>{{(item.love.findIndex(l=>user.id==l)!=-1)?'mdi-heart':'mdi-heart-outline'}}</v-icon>
            </v-btn>
            </v-badge>
            </template>
            <span>Adorer</span>
            </v-tooltip>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="item.show = !item.show"
            >
              <v-icon>{{ item.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="item.show">
              <v-divider></v-divider>

              <v-card-text>
                {{item.description}}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col> 
     </v-row> 
    <v-row
      v-if="products.length">
      <v-col>
          <div class="text-center">
              <v-pagination
              :value="page"
              @input="update_page"
              :length="Math.ceil(products.length/perPage)"
              circle
              color="green darken-3"
              ></v-pagination>
          </div>
      </v-col>
    </v-row>   
  </v-container>
</template>
<script>

import { mapGetters } from 'vuex'


  export default {
    data: () => ({
      show: false,
      title: process.env.VUE_APP_TITLE
    }),
    async created(){
      await this.$store.dispatch('productsAction')
    },
    computed:{
      ...mapGetters([
        'visibleProducts',
        'user',
        'products',
        'page',
        'perPage'
      ])
    },
    methods:{
      update_page(number) {
        this.$store.commit("SET_PAGE", number);
      },
    }
  }
</script>
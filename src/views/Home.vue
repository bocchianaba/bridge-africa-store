<template>
  <v-container>
    <v-row>
      <v-col
      cols="12"
      lg="12"
      md="12">
        <h2 style="text-align:center">Welcome to your best online sales application</h2>
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
        <h2 style="text-align:center;color: blue">Bridge Africa Store</h2>
      </v-col>
    </v-row>     
    <v-row>
      <v-col 
        cols="12"
        md="4"
        sm="6"
        xs="8"
        v-for="item in products" :key="item.key" :to="item.link">
        <v-card>
          <v-img
            :src="item.imageUrl"
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
              text
            >
              pourchase
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="show = !show"
            >
              <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                {{item.description}}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col> 
     </v-row> 
  </v-container>
</template>
<script>
  import {db} from "../main"
  export default {
    data: () => ({
      show: false,
      products: [],
    }),
    created () {
      db.collection('products').onSnapshot((snapshotChange) => {
                this.products = [];
                snapshotChange.forEach((doc) => {
                    this.products.push({
                        key: doc.id,
                        available: doc.data().available,
                        date: doc.data().date,
                        imageUrl: doc.data().imageUrl,
                        description: doc.data().description,
                        label: doc.data().label,
                        price: doc.data().price,
                        userId: doc.data().userId
                    });
                    console.log(doc.id,"=>",doc.data())
                });
                return this.products
            })
            .catch((error)=>{
              console.log(error.message)
            })
    },
  }
</script>
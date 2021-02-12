<template>
    <v-container fluid fill-height class="home-hero" style="max-height: 100vh;">
        <v-layout row wrap>
          <v-flex  class="text-lg-center" mt-5>
            <h1>Your products List</h1>
          </v-flex>
          <v-btn flat color="primary">
            <v-icon left>mdi-plus</v-icon>
            Ajouter un produits</v-btn>
            <v-data-table
                :headers="headers"
                :items="products"
                :items-per-page="5"
                class="elevation-1"
            ></v-data-table>
        </v-layout>      
    </v-container>
</template>

<script>
import {db} from "../main.js"
  export default {
    data () {
      return {
        products: [],
        headers: [
          {
            text: 'Label',
            align: 'start',
            value: 'label',
          },
          { text: 'Price(FCFA)', value: 'price' },
          { text: 'Description', value: 'description' },
          { text: 'Available', value: 'available' },
          { text: 'Date', value: 'date' }
        ]
      }
    },
   created() {
            db.collection('products').where("userId","==",this.$store.getters.user).onSnapshot((snapshotChange) => {
                this.products = [];
                snapshotChange.forEach((doc) => {
                    this.products.push({
                        key: doc.id,
                        available: doc.data().available,
                        date: doc.data().date.toDate(),
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
        }
  }
</script>
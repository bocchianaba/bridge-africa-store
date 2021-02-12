<template>
  <v-data-table
    :headers="headers"
    :items="products"
    sort-by="date"
    class="elevation-1"
  >
    <template v-slot:bottom>
      <v-col
        cols="12"
        sm="8"
        md="6">
        <v-btn block color="danger" to="/logout" dark>Logout</v-btn>
      </v-col>
    </template>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>List of Products</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.label"
                      label="Label"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.price"
                      label="Prices"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-checkbox
                    v-model="editedItem.available"
                    label="Available"
                    color="success"
                      disabled
                  ></v-checkbox>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  ><template>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                      disabled
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.date"
                          label="Date created"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="editedItem.date"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        @change="saveDate"
                      disabled
                      ></v-date-picker>
                    </v-menu>
                  </template>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="close"
              >
                ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon color="primary"
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-eye
      </v-icon>
    </template>
  </v-data-table>
</template>


<script>
import {db} from "../main.js"
  export default {
    data: () => ({
      date: null,
      menu: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Label',
          align: 'start',
          sortable: false,
          value: 'label',
        },
        { text: 'Price(FCFA)', value: 'price' },
        { text: 'Description', value: 'description' },
        { text: 'Show details', value: 'actions', sortable: false },
      ],
      products: [],
      editedIndex: -1,
      editedItem: {
        label: '',
        price: '',
        description: '',
        available: '',
        date: ''
      },
      defaultItem: {
        label: '',
        price: '',
        description: '',
        available: '',
        date: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Product' : 'Product Details'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },

    created () {
      db.collection('products').onSnapshot((snapshotChange) => {
                this.products = [];
                snapshotChange.forEach((doc) => {
                    this.products.push({
                        key: doc.id,
                        available: doc.data().available,
                        date: doc.data().date,
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
    methods:{
      editItem (item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedkey = this.products[this.editedIndex].key
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedkey=this.products[this.editedIndex].key
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.products.splice(this.editedIndex, 1)
        this.closeDelete()
        db.collection("products")
        .doc(this.editedkey)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.products[this.editedIndex], this.editedItem)
          //update product
          db.collection("products")
          .doc(this.editedkey)
          .update({
            available: this.editedItem.available,
            date: this.editedItem.date,
            description: this.editedItem.description,
            label: this.editedItem.label,
            price: this.editedItem.price
          })
          .then(() => {
            console.log("product successfully updated!");
          })
          .catch((error) => {
            console.error("Error updating product: ", error);
          });
        } else {
          //createProduct
          db.collection("products")
          .add({ 
            date: this.editedItem.date,
            label: this.editedItem.label,
            description: this.editedItem.description,
            price: this.editedItem.price,
            userId: this.$store.getters.user,
            available: this.editedItem.available
            })
          .then(() => {
            console.log("Collection successfully written!");
          })
          .catch((error) => {
            console.error("Error writing collection: ", error);
          })
          this.products.push(this.editedItem)
        }
        this.close()
      },
      saveDate (date) {
        this.$refs.menu.save(date)
      },
      createProduct(label, price, description, available, date) {
        db.collection("products")
          .add({ 
            date: date,
            label: label,
            description: description,
            price: price,
            userId: this.$store.getters.user,
            available: available
            })
          .then(() => {
            console.log("Collection successfully written!");
          })
          .catch((error) => {
            console.error("Error writing collection: ", error);
          })
    }
    }
    }
</script>
<template>
  <v-data-table
    :headers="headers"
    :items="myproducts"
    sort-by="date_updated"
    class="elevation-1"
  ><template v-slot:item.available="{ item }">
        <v-simple-checkbox
          v-model="item.available"
          disabled
        ></v-simple-checkbox>
      </template>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title><span>Your List of Cars</span></v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
            <v-icon>mdi-plus</v-icon>
              <span class="hidden-sm-and-down">NEW CAR</span>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.label"
                      label="Label"
                      :rules="[value => !!value || 'Required.',v => (v && v.length <= 10) || 'Name must be less than 10 characters']"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.price"
                      label="Price" 
                      suffix="$"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="5"
                  >
                  <v-btn 
                  color="info" 
                  @click="onPickFile">
                    <v-icon>mdi-camera</v-icon>
                    upload image
                  </v-btn>
                  <input
                   color="primary"
                   type="file" 
                   style="display:none" 
                   ref="fileInput" 
                   accept="image/*"
                   @change="onFilePicked" />
                  </v-col>
                  <v-col class="img-wrap"
                  cols="12"
                  sm="6"
                  md="4"
                  >
                    <v-img  
                    :src="(editedIndex>-1)?editedItem.image:editedItem.imageUrl"
                    max-height="125"
                    aspect-ration="1.7"
                    contain ></v-img>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="8"
                  >
                    <v-textarea
                      outlined
                      v-model="editedItem.description"
                      label="Description"
                    ></v-textarea>
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
                  ></v-checkbox>
                  </v-col>
                  <!-- <v-col
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
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.date_updated"
                          label="Date updated"
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
                      ></v-date-picker>
                    </v-menu>
                  </template>
                  </v-col> -->
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red"
                text
                @click="close"
              >
                <v-icon color="red">mdi-close-outline</v-icon>
                Cancel
              </v-btn>
              <v-btn
                color="success"
                text
                @click="save"
              >
                <v-icon color="success">mdi-check-outline</v-icon>
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="closeDelete">
                <v-icon color="red">mdi-close-outline</v-icon>
                Cancel
              </v-btn>
              <v-btn color="success" text @click="deleteItemConfirm">
                <v-icon color="success">mdi-check-outline</v-icon>
                OK
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon color="warning"
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon color="red"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>


<script>
// import {db} from "../main.js"

import { mapGetters } from 'vuex'

// import firebase from "firebase"
  export default {
    data: () => ({
      date: null,
      menu: false,
      dialog: false,
      search: '',
      dialogDelete: false,
      headers: [
        {
          text: 'Label',
          align: 'start',
          value: 'label',
        },
        { text: 'Price($)', value: 'price' },
        { text: 'Available', value: 'available', sortable: false, align: 'center' },
        { text: 'Date Updated', value: 'date_updated', align: 'center' },
        { text: 'Date Created', value: 'date_created', align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        label: '',
        price: 0,
        imageUrl: null,
        image: null,
        description: '',
        available: false,
        date: ''
      },
      defaultItem: {
        label: '',
        price: 0,
        image: null,
        imageUrl: null,
        description: '',
        available: false,
        date: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Car' : 'Edit Car'
      },
      ...mapGetters([
        'myproducts',
        'user'
      ])
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

    async created () {
      await this.$store.dispatch("myProductsAction")
    },
    methods:{
      onPickFile(){
        this.$refs.fileInput.click()
      },
      onFilePicked(event){
        const files=event.target.files
        let filename = files[0].name
        if(filename.lastIndexOf('.') <=0){
          return alert('Please add a valid file')
        }
        const fileReader= new FileReader()
        fileReader.addEventListener('load', ()=>{
          this.editedItem.imageUrl =fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        // this.editedItem.image=files[0]
        this.editedItem.image=this.editedItem.imageUrl
        this.editedItem.image_changed=true
      },
      editItem (item) {
        this.editedIndex = this.myproducts.indexOf(item)
        this.editedkey = this.myproducts[this.editedIndex].key
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.myproducts.indexOf(item)
        this.editedkey=this.myproducts[this.editedIndex].key
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.myproducts.splice(this.editedIndex, 1)
        this.closeDelete()
        // db.collection("products")
        // .doc(this.editedkey)
        // .delete()
        // .then(() => {
        //   console.log("Document successfully deleted!");
        // })
        // .catch((error) => {
        //   console.error("Error removing document: ", error);
        // });

        //action to delete item from backend
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

      async save () {
        if (this.editedIndex > -1) {
          this.editedItem.created_by=this.user.id
          const response=await this.$store.dispatch("updateProducts",this.editedItem)
          Object.assign(this.myproducts[this.editedIndex], this.editedItem)
          console.log("car edited ",response.data)
          // let imageUrl
          // let key=this.editedkey
          //update product
          // db.collection("products")
          // .doc(this.editedkey)
          // .update({
          //   available: this.editedItem.available,
          //   date: this.editedItem.date,
          //   imageUrl: this.editedItem.imageUrl,
          //   description: this.editedItem.description,
          //   label: this.editedItem.label,
          //   price: this.editedItem.price
          // })
          // .then(()=>{
          //   const filename=this.editedItem.image.name
          //   const ext=filename.slice(filename.lastIndexOf('.'))
          //   firebase.storage().ref('products/'+key+ext).put(this.editedItem.image)
          //   imageUrl =firebase.storage().ref('products/'+key+ext).getDownloadURL()
          //   firebase.firestore().collection('products').doc(key).update({imageUrl: imageUrl})
          //   console.log("product successfully updated!");
          // })
          // .catch((error) => {
          //   console.error("Error updating product: ", error);
          // });
        } else {
          this.editedItem.created_by=this.user.id
          const response=await this.$store.dispatch("createProducts",this.editedItem)
          console.log("car created ",response.data)
          //createProduct
          // let key
          // let imageUrl
          // db.collection("products")
          // .add({ 
          //   date: this.editedItem.date,
          //   label: this.editedItem.label,
          //   description: this.editedItem.description,
          //   imageUrl:this.editedItem.imageUrl,
          //   price: this.editedItem.price,
          //   userId: this.$store.getters.user,
          //   available: this.editedItem.available
          //   })
          // .then((doc) => {
          //   key=doc.id
          //   const filename=this.editedItem.editedItem.image.name
          //   const ext=filename.slice(filename.lastIndexOf('.'))
          //   firebase.storage().ref('products/'+key+ext).put(this.editedItem.image)
          //   imageUrl =firebase.storage().ref('products/'+key+ext).getDownloadURL()
          //   firebase.firestore().collection('products').doc(key).update({imageUrl: imageUrl})
          //   console.log("product successfully updated!");
          //   console.log("Collection successfully written!");
          // })
          // .catch((error) => {
          //   console.error("Error writing collection: ", error);
          // })
          this.myproducts.push(this.editedItem)
        }
        this.close()
      },

      saveDate (date) {
        this.$refs.menu.save(date)
      },

      // createProduct(label, price, description, available, date) {
      //   // db.collection("products")
      //   //   .add({ 
      //   //     date: date,
      //   //     label: label,
      //   //     description: description,
      //   //     price: price,
      //   //     userId: this.$store.getters.user,
      //   //     available: available
      //   //     })
      //   //   .then(() => {
      //   //     console.log("Collection successfully written!");
      //   //   })
      //   //   .catch((error) => {
      //   //     console.error("Error writing collection: ", error);
      //   //   })

      //   // create a product action
      // }
    }
    }
</script>
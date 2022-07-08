<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6" sm="8" class="text-center">
                <h1 class="text-h3">{{ product.label }}</h1>
                <v-img
                :src="product.image"
                class="my-5"
                containerful
                ></v-img>
                <div>
                    <v-spacer></v-spacer>
                    <v-badge
                    bordered
                    overlap
                    color="primary"
                    :content="product.like.length"
                    >   
                    <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">                            
                    <v-btn
                        color="primary"
                        icon
                        @click="like({payload: product, id: $store.getters.user.id})"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>{{(product.like.findIndex(l=>user.id==l)!=-1)?'mdi-thumb-up':'mdi-thumb-up-outline'}}</v-icon>
                    </v-btn>
                    </template>
                    <span>{{(product.like.findIndex(l=>user.id==l)!=-1)?'You liked this car !':'Like ?'}}</span>
                    </v-tooltip>
                    </v-badge>

                    <v-badge
                    bordered
                    overlap
                    color="primary"
                    :content="product.dislike.length"
                    >   
                    <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">                            
                    <v-btn
                        color="primary"
                        icon
                        @click="dislike({payload: product, id: $store.getters.user.id})"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>{{(product.dislike.findIndex(l=>user.id==l)!=-1)?'mdi-thumb-down':'mdi-thumb-down-outline'}}</v-icon>
                    </v-btn>
                    </template>
                    <span>{{(product.dislike.findIndex(l=>user.id==l)!=-1)?'You disliked this car !':'Dislike ?'}}</span>
                    </v-tooltip>
                    </v-badge>

                    <v-badge
                    bordered
                    overlap
                    color="primary"
                    :content="product.love.length"
                    >   
                    <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">                            
                    <v-btn
                        color="primary"
                        icon
                        @click="love({payload: product, id: $store.getters.user.id})"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>{{(product.love.findIndex(l=>user.id==l)!=-1)?'mdi-heart':'mdi-heart-outline'}}</v-icon>
                    </v-btn>
                    </template>
                    <span>{{(product.love.findIndex(l=>user.id==l)!=-1)?'You loved this car !':'Love ?'}}</span>
                    </v-tooltip>
                    </v-badge>
                    <v-spacer></v-spacer>
                </div>
                <p class="text-h6"> cost : <span class="primary--text">{{ product.price }} $</span></p>
                <div>
                <v-btn v-if="$store.getters.cart_ids.findIndex(id=>id=product.id)==-1" class="mx-5" outlined color="orange darken-2" @click="addToCart(product)"> <v-icon>mdi-cart</v-icon> Add to cart</v-btn>
                <v-btn v-else class="mr-5" outlined color="orange darken-2" @click="removeToCart(product.id)"> <v-icon>mdi-close</v-icon> Remove to cart</v-btn>
                <v-btn class="ml-5" disabled outlined color="success darken-2" @click="buy"> <v-icon>mdi-credit-card-outline</v-icon> Buy this car</v-btn>
                </div>
            </v-col>
            <v-col cols="12" md="6" sm="8" class="text-center" align-self="center">
                <h3>Description</h3>
                <p class="text-justify">{{ product.description }}</p>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Product',
    async mounted(){
        await this.$store.dispatch("productAction", this.$route.params.id)
        console.log(this.$store.state.product)
    },
    computed:{
        ...mapGetters({
            products: 'products',
            user: 'user',
            product: 'product',
        }),
    },
    methods:{
        ...mapActions({
            like: 'likeAction',
            dislike: 'dislikeAction',
            love: 'loveAction',
            addToCart: 'addProductCart',
            buy: 'buyAction',
            removeToCart: 'RemoveProductCart'
        }),
    },
}
</script>
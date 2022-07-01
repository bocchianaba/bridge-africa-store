const baseURL=process.env.VUE_APP_BACKEND

import axios from "axios"

const state={
    products: [],
    myproducts:[],
    product:null,
    status:null,
    event:null,
    error:null,
    page: 1,
    perPage: 6
}

const getters={
    products:()=>{
        state.products.forEach(p=>{
            p.link="/car/"+p.id
            p.show=false
        })
        console.log("products state ",state.products)
        return state.products
    },
    myproducts:()=>state.myproducts,
    product:()=>state.product,
    product_status:()=>state.status,
    event:()=>state.event,
    visibleProducts(){
        if(state.products && state.products.length>state.perPage)
            return state.products.slice((state.page - 1) * state.perPage, state.page * state.perPage);
        else
            return state.products
    },
    perPage(state){
        return state.perPage
    },
    page(state){
        return state.page
    },
}

const mutations={
    SET_PRODUCTS(state, payload){
        console.log("payload ",payload)
        state.products=payload
    },
    SET_MYPRODUCTS(state, payload){
        state.myproducts=payload
    },
    SET_PRODUCT(state, payload){
        state.product=payload
    },
    SET_STATUS(state, payload){
        state.status=payload
    },
    SET_EVENT(state, payload){
        state.event=payload
    },
    SET_ERROR(state, payload){
        state.error=payload
    }, 
    SET_PAGE(state, payload){
        state.page = payload
    },
}

const actions={
    async productsAction({commit}){
        try {
            commit('SET_EVENT','product')
            commit('SET_STATUS','loading')
            const response= await axios.get(`${baseURL}/api/v1/products`)
            const products = response.data
            console.log("products ",products)
            commit('SET_PRODUCTS',products)
            commit('SET_STATUS','success')
        } catch (error) {
            console.error(error)    
            commit('SET_STATUS','failure')   
            commit('SET_ERROR',error)        
        }
    }
}

const productModule={
    state,
    getters,
    mutations,
    actions
}

export default productModule
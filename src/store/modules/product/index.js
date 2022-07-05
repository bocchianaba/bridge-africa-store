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
    SET_MY_PRODUCTS(state, payload){
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
    },
    async myProductsAction({commit}){
        try {
            commit('SET_EVENT','my_product')
            commit('SET_STATUS','loading')
            const response= await axios.get(`${baseURL}/api/v1/myproducts`)
            const products = response.data
            console.log("myproducts ",products)
            commit('SET_MY_PRODUCTS',products)
            commit('SET_STATUS','success')
        } catch (error) {
            console.error(error)    
            commit('SET_STATUS','failure')   
            commit('SET_ERROR',error)        
        }
    },async updateProducts({commit},payload){
        try {
            commit('SET_EVENT','update_product')
            commit('SET_STATUS','loading')
            let data=payload
            let products
            if(typeof(data.image)!==File || data.image.name.indexOf("http://") != -1){
                delete data["image"]
                const response= await axios.put(`${baseURL}/api/v1/myproducts/${data.id}`,data)
                products = await response.data
            }
            else{
                const config={
                    headers:{"content-type": "multipart/form-data"}
                }
                let formData = new FormData()
                for(let d in data){
                    formData.append(d, data[d])
                }
                console.log("form data ",formData)
                const response= await axios.put(`${baseURL}/api/v1/myproducts/${payload.id}`,formData,config)
                products = await response.data
            }
            console.log("products ",products)
            commit('SET_STATUS','success')
            return products
        } catch (error) {
            console.error(error)    
            commit('SET_STATUS','failure')   
            commit('SET_ERROR',error)        
        }
    },async createProducts({commit},payload){
        try {
            commit('SET_EVENT','create_product')
            commit('SET_STATUS','loading')
            let data=payload
            console.log("data image ",data.image)
            if(data.image.name.indexOf("http://") != -1){
                delete data["image"]
            }
            const config={
                headers:{"content-type": "multipart/form-data"}
            }
            let formData = new FormData()
            for(let d in data){
                formData.append(d, data[d])
            }
            const response= await axios.post(`${baseURL}/api/v1/myproducts`,formData,config)
            const products = await response.data
            console.log("products ",products)
            commit('SET_STATUS','success')
            return products
        } catch (error) {
            console.error(error)    
            commit('SET_STATUS','failure')   
            commit('SET_ERROR',error)        
        }
    },async deleteProducts({commit},id){
        try {
            commit('SET_EVENT','delete_product')
            commit('SET_STATUS','loading')
            await axios.delete(`${baseURL}/api/v1/myproducts/${id}`)
            console.log("deleted ")
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
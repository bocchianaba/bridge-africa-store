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
    perPage: 6,
    cart: [],
    cart_ids: []
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
    cart:()=>state.cart,
    cart_ids:()=>state.cart_ids,
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
    REMOVE_LIKE(state, index){
        state.product.like.splice(index,1)
    },
    REMOVE_DISLIKE(state, index){
        state.product.dislike.splice(index,1)
    },
    REMOVE_LOVE(state, index){
        state.product.love.splice(index,1)
    },
    PUSH_LIKE(state, id){
        state.product.like.push(id)
    },
    PUSH_DISLIKE(state, id){
        state.product.dislike.push(id)
    },
    PUSH_LOVE(state, id){
        state.product.love.push(id)
    },
    PUSH_CART(state, payload){
        state.cart.push(payload)
        state.cart_ids.push(payload.id)
    },
    REMOVE_CART(state, id){
        const index = state.cart.findIndex(p=>p.id==id)
        state.cart.splice(index,1)
        state.cart_ids.splice(index,1)
    }
}

const actions={
    async productsAction({commit}){
        try {
            commit('SET_EVENT','products')
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
    },async productAction({dispatch, commit},id){
        try {
            commit('SET_EVENT','product')
            commit('SET_STATUS','loading')
            await dispatch('productsAction')
            const product = state.products.find(p=> p.id==id)
            console.log("product ",product)
            commit('SET_PRODUCT',product)
            commit('SET_STATUS','success')
        } catch (error) {
            console.error(error)    
            commit('SET_STATUS','failure')   
            commit('SET_ERROR',error)        
        }
    },async myProductsAction({commit}){
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
            const response_data= await axios.get(`${baseURL}/api/v1/myproducts/${products.id}`)
            const product = await response_data.data
            console.log("product ",product)
            commit('SET_STATUS','success')
            return product
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
            const response_data= await axios.get(`${baseURL}/api/v1/myproducts/${products.id}`)
            const product = await response_data.data
            console.log("product ",product)
            commit('SET_STATUS','success')
            return product
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
    },async likeAction({commit},{payload, id}){
        commit("SET_PRODUCT", payload)
        console.log("finish set product", state.product,id)
        if(state.product.like.findIndex(user_id=> user_id==id)==-1){
            var index = state.product.dislike.findIndex(user_id=> user_id==id)
            if(index != -1){
                try{
                    commit("REMOVE_DISLIKE",index)
                    const response= await axios.put(`${baseURL}/api/v1/product/dislike/pop/${state.product.id}`,state.product)
                    console.log(response.data)
                }catch(err){
                    commit('SET_ERROR', err.message)
                    console.log("error " + err.message)
                }
            }
            index = state.product.love.findIndex(user_id=> user_id==id)
            if(index!=-1){
                // request must be here
                try{
                    commit("REMOVE_LOVE",index)
                    const response= await axios.put(`${baseURL}/api/v1/product/love/pop/${state.product.id}`,state.product)
                    console.log(response.data)
                }catch(err){
                    commit('SET_ERROR', err.message)
                    console.log("error " + err.message)
                }
            }
            // request must be here
            try{
                commit("PUSH_LIKE",id)
                console.log("produit apprécié ",state.product)
                const response= await axios.put(`${baseURL}/api/v1/product/like/push/${state.product.id}`,state.product)
                console.log(response.data)
            }catch(err){
                commit('SET_ERROR', err.message)
                console.log("error " + err.message)
            }
        }
    },async dislikeAction({commit},{payload, id}){
        commit("SET_PRODUCT", payload)
        console.log("finish set product", state.product,id)
        if(state.product.dislike.findIndex(user_id=> user_id==id)==-1){
            var index = state.product.like.findIndex(user_id=> user_id==id)
            if(index != -1){
                try{
                    commit("REMOVE_LIKE",index)
                    const response= await axios.put(`${baseURL}/api/v1/product/like/pop/${state.product.id}`,state.product)
                    console.log(response.data)
                }catch(err){
                    commit('SET_ERROR', err.message)
                    console.log("error " + err.message)
                }
            }
            index = state.product.love.findIndex(user_id=> user_id==id)
            if(index!=-1){
                // request must be here
                try{
                    commit("REMOVE_LOVE",index)
                    const response= await axios.put(`${baseURL}/api/v1/product/love/pop/${state.product.id}`,state.product)
                    console.log(response.data)
                }catch(err){
                    commit('SET_ERROR', err.message)
                    console.log("error " + err.message)
                }
            }
            // request must be here
            try{
                commit("PUSH_DISLIKE",id)
                console.log("produit apprécié ",state.product)
                const response= await axios.put(`${baseURL}/api/v1/product/dislike/push/${state.product.id}`,state.product)
                console.log(response.data)
            }catch(err){
                commit('SET_ERROR', err.message)
                console.log("error " + err.message)
            }
        }
    },async loveAction({commit},{payload, id}){
        commit("SET_PRODUCT", payload)
        console.log("finish set product", state.product,id)
        if(state.product.love.findIndex(user_id=> user_id==id)==-1){
            var index = state.product.dislike.findIndex(user_id=> user_id==id)
            if(index != -1){
                try{
                    commit("REMOVE_DISLIKE",index)
                    const response= await axios.put(`${baseURL}/api/v1/product/dislike/pop/${state.product.id}`,state.product)
                    console.log(response.data)
                }catch(err){
                    commit('SET_ERROR', err.message)
                    console.log("error " + err.message)
                }
            }
            index = state.product.like.findIndex(user_id=> user_id==id)
            if(index!=-1){
                // request must be here
                try{
                    commit("REMOVE_LIKE",index)
                    const response= await axios.put(`${baseURL}/api/v1/product/like/pop/${state.product.id}`,state.product)
                    console.log(response.data)
                }catch(err){
                    commit('SET_ERROR', err.message)
                    console.log("error " + err.message)
                }
            }
            // request must be here
            try{
                commit("PUSH_LOVE",id)
                console.log("produit adoré ",state.product)
                const response= await axios.put(`${baseURL}/api/v1/product/love/push/${state.product.id}`,state.product)
                console.log(response.data)
            }catch(err){
                commit('SET_ERROR', err.message)
                console.log("error " + err.message)
            }
        }
    },async addProductCart({commit},payload){
        commit('PUSH_CART',payload)
        // add request here
    },async RemoveProductCart({commit},id){
        commit('REMOVE_CART',id)
        // add request here
    }
}

const productModule={
    state,
    getters,
    mutations,
    actions
}

export default productModule
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const baseURL="http://127.0.0.1:8000"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    status:null,
    error: null
  },
  mutations: {
    setUser(state, payload){
      state.user=payload
    },
    removeUser(state){
      state.user=null
    },
    setStatus(state, payload){
      state.status = payload
    },
    setError(state, payload){
      state.error = payload
    }
  },
  actions: {
    async initAction({commit}, payload){
      commit('setStatus', 'loading')
      try {
        const response= await axios.post(`${baseURL}/api/v1/register`,payload)
        commit('setStatus', 'success')
        commit('setError', null)
        console.log("state ", response)
      } catch (error) {
        console.log("error ",error)
        commit('setStatus', 'failure')
        commit('setError',error.message)              
      }
    },
    async registerAction({commit}, payload){
      commit('setStatus', 'loading')
      try {
        const response= await axios.post(`${baseURL}/api/v1/register`,payload)
        commit('setStatus', 'success')
        commit('setError', null)
        console.log("state ", response)
      } catch (error) {
        console.log("error ",error)
        commit('setStatus', 'failure')
        commit('setError',error.message)              
      }
    },
    async loginAction({commit}, payload){
        commit('setStatus', 'loading')
        try {
            axios.defaults.headers.common['Authorization']= ''
            window.localStorage.removeItem('token_access_api_bas')  
            console.log(payload)
            const response = await axios.post(`${baseURL}/api/v1/login`,payload)
            console.log("response ",response)
            const access= response.access
            axios.defaults.headers.common['Authorization']= 'JWT '+access
            const refresh= response.refresh
            commit('setUser', response)
            if(payload.rememberMe){
                window.localStorage.setItem('token_access_api_bas', access)
                window.localStorage.setItem('token_refresh_api_bas', refresh)
            }
            commit('setStatus', 'success')
            commit('setError', null)           
        } catch (error) {
            console.error("error ",error)
            commit('setStatus', 'failure')
            commit('setError', error.message)              
        }
    },
    async logoutAction({commit}){
        commit('setStatus', 'loading')
        try {
            axios.defaults.headers.common['Authorization']= ''
            window.localStorage.removeItem('token_access_api_bas')  
            window.localStorage.removeItem('token_refresh_api_bas')  
            commit('removeUser')
            commit('setStatus', 'success')
            commit('setError', null)                
        } catch (error) {
            commit('setStatus', 'failure')
            commit('setError', error.message)
        }
    }
    },

    

    getters:{
      status(state){
        return state.status
      },
      user(state){
        return state.user
      },
      error(state){
        return state.error
      }
    }
  
})

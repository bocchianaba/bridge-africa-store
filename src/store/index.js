import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

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
    registerAction({commit}, payload){
      commit('setStatus', 'loading')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response)=>{
        commit('setUser', response.user.uid)
        commit('setStatus', 'success')
        commit('setError', null)
      })
      .catch((error)=>{
        alert(error.message)
        commit('setStatus', 'failure')
        commit('setError',error.message)
      })
    },

      loginAction({commit}, payload){
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((response)=>{
          commit('setUser', response.user.uid)
          commit('setStatus', 'success')
          commit('setError', null)
        })
        .catch((error)=>{
          alert(error.message)
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
      },
      logoutAction({commit}){
        firebase.auth().signOut()
          .then(() => {
            commit('removeUser')
            commit('setStatus', 'success')
            commit('setError', null)
          })
          .catch((error) => {
            commit('setStatus', 'failure')
            commit('setError', error.message)
            alert(error.message)
          })
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

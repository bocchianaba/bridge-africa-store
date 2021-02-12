import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'

Vue.config.productionTip = false

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAXeWikjq3D8skB_4-UfsGVm_4N4P59aa8",
    authDomain: "bridgeafrica-895d0.firebaseapp.com",
    projectId: "bridgeafrica-895d0",
    storageBucket: "bridgeafrica-895d0.appspot.com",
    messagingSenderId: "651848787303",
    appId: "1:651848787303:web:9536fe5bede75ba2de7bc2",
    measurementId: "G-N28J0NSDKK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export const db=firebase.firestore()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


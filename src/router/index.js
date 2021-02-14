import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'
import Myproduct from '../components/Myproduct.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login',
    meta:{
      hideForAuth: true
    }
  },
  {
    path: '/myproduct/:id',
    name: 'Myproduct',
    component: Myproduct,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

import firebase from "firebase"

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(function(user) {
      if (to.matched.some(record => record.meta.requiresAuth)) {
          if (!user) {
              next({ path: '/login' });
          } else {
              next();
          }

      } else {
          next();
      }

      if (to.matched.some(record => record.meta.hideForAuth)) {
          if (user) {
              next({ path: '/dashboard' });
          } else {
              next();
          }
      } else {
          next();
      }
  });
});

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'
import Myproduct from '../components/Myproduct.vue'
import NotFound from '../components/NotFound.vue'
import Product from '../views/Product.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (window.localStorage.getItem('token_access_api_bas')) {
        next('/home')
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (window.localStorage.getItem('token_access_api_bas')) {
        next('/home')
      } else {
        next()
      }
    }
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/myproduct',
    name: 'Myproduct',
    component: Myproduct,
  },
  {
    path: '/car/:id',
    name: 'Product',
    component: Product,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
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


router.beforeEach((to, from, next) => {

  const token = window.localStorage.getItem('token_access_api_bas')
  const loginpath = window.location.pathname

  if(!token && to.path!='/login' && to.path!='/register') next({ name: 'Login', query: { from: loginpath } })
  else next()

});

export default router

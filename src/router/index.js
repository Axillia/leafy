import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/listings',
    name: 'Listings',
    component: () => import('../views/Listings')
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('../views/Product')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

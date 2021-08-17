import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Users
  },
  {
    path: '/login',
    name: 'Login',

    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/users',
    name: 'Users',
  
    
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
  },
  {
    path: '/editUser/:id',
    name: 'Edit',
  
    
    component: () => import(/* webpackChunkName: "about" */ '../views/UserEdit.vue')
  },
  {
    path: '/editUser',
    name: 'Register',
  
    
    component: () => import(/* webpackChunkName: "about" */ '../views/UserEdit.vue')
  },
  {
    path: '/revervaciones',
    name: 'Reservaciones',
  
    
    component: () => import(/* webpackChunkName: "about" */ '../views/Reservacion.vue')
  },
  {
    path: '/editrever/:id',
    name: 'Editrever',

    component: () => import(/* webpackChunkName: "about" */ '../views/ReservacionRegister.vue')
  },
  {
    path: '/registrorever',
    name: 'RegistroReserv',

    component: () => import(/* webpackChunkName: "about" */ '../views/ReservacionRegister.vue')
  }
  
  
]


const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './modules/auth';
import { users } from './modules/users';
import { reservacion } from './modules/reservacion';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    users,
    reservacion
  }
})

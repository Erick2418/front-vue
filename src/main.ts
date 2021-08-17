import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { traertoken } from './helpers/get-jwt';

Vue.config.productionTip = false
traertoken();
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

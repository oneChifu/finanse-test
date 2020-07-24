import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueNumeralFilterInstaller from 'vue-numeral-filter';
import VueMask from 'v-mask'
import "./midleware/veevalidate";
import "normalize.css"

Vue.use(vueNumeralFilterInstaller)
Vue.use(VueMask)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

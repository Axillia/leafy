import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Tawk from 'vue-tawk'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';


Vue.config.productionTip = false
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.use(Tawk, {
  tawkSrc: 'https://embed.tawk.to/61326407649e0a0a5cd47de4/1femddgfv'
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

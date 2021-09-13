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

Vue.prototype.$getBadge = (points) => {
  const badges = [
    ["STARTER", "grey darken-3", "mdi-account-check"],
    ["NOVICE", "amber darken-3", "mdi-check-circle-outline"],
    ["AMATEUR", "orange darken-4", "mdi-shield-check"],
    ["EXPLORE", "green darken-3", "mdi-star-half-full"],
    ["ELITE", "blue darken-4", "mdi-star"],
    ["MASTER", "deep-purple darken-4", "mdi-star-circle"],
    ["LEGEND", "purple darken-3", "star-face"],
    ["DEMIGOD", "red darken-4", "mdi-license"]
  ]

  if (points >= 45000) return badges[7]
  else if (points >= 25000) return badges[6]
  else if (points >= 10000) return badges[5]
  else if (points >= 5000) return badges[4]
  else if (points >= 1500) return badges[3]
  else if (points >= 500) return badges[2]
  else if (points >= 100) return badges[1]
  else return badges[0]
}

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

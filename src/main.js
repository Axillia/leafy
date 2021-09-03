import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import vUploader from 'v-uploader';
import Tawk from 'vue-tawk'

const uploaderConfig = {
  uploadFileUrl: `${process.env.VUE_APP_BASE_URL}/upload`,
  deleteFileUrl: `${process.env.VUE_APP_BASE_URL}/upload`,
  language: 'en',
  showMessage: (vue, message) => {
    console.log('Error message log', message)
  }
};

Vue.config.productionTip = false
Vue.use(vUploader, uploaderConfig)
Vue.use(Tawk, {
  tawkSrc: 'https://embed.tawk.to/61326407649e0a0a5cd47de4/1femddgfv'
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import vUploader from 'v-uploader';

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

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

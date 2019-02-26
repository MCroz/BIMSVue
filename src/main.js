import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
// import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2';
import FileUpload from './components/FileUpload.vue'
import ResidentCard from './components/ResidentCard.vue'
import Endpoints from './Services/Endpoints'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate);

Vue.component('FileUpload',FileUpload)
Vue.component('ResidentCard',ResidentCard)

Vue.prototype.moment = moment

Vue.prototype.Backbone = Backbone.Model.extend({ url: ""});
Vue.prototype.Endpoints = Endpoints
// Vue.use(Vuelidate)
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

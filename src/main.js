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
import VueNumericInput from 'vue-numeric-input';
import DatetimePicker from 'vuetify-datetime-picker'
import 'vuetify-datetime-picker/src/stylus/main.styl'
//import PDFGenerator from './pdftemplates/pdfgen'

Vue.use(VeeValidate);
Vue.use(VueNumericInput);
Vue.use(DatetimePicker);

Vue.component('FileUpload',FileUpload)
Vue.component('ResidentCard',ResidentCard)

//Vue.prototype.PdfGenerator = PDFGenerator

Vue.prototype.moment = moment

Vue.prototype.Backbone = Backbone.Model.extend({ url: ""});
Vue.prototype.Endpoints = Endpoints
// Vue.use(Vuelidate)
Vue.use(VueSweetalert2)

Vue.filter('formatDate', function (value) {
  if (!value) return ''
  
  return moment(value).format("LL");
})

Vue.filter('formatArea', function (value) {
  if (!value) return '0 sq. m'
  
  return value + " sq. m"
})

Vue.filter('formatCurrency', function (value) {
  if (typeof value !== "number") {
      return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
  });
  return formatter.format(value).replace('PHP', '₱ ');
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

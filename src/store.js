import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //current user state
    currentUser: null,
    endpointUrl: "http://localhost:6513/api/",
    serverUrl: "http://localhost:6513/",
    preloader: false,
    alert: false,
    alertMessage: "",

    successAlert: false,
    successAlertMessage: "",
  },
  mutations: {
    //this is where we will allow setting values
    setCurrentUser (state, data) {
      state.currentUser = data
    },
    removeCurrentUser (state) {
      state.currentUser = null
    },

    showPreloader (state) {
      state.preloader = true
    },

    hidePreloader (state) {
      state.preloader = false
    },

    showAlert (state, message) {
      state.alert = true;
      state.alertMessage = message;
    },

    hideAlert (state) {
      state.successAlert = false;
      state.successAlertMessage = "";
    },

    showSuccess (state, message) {
      state.successAlert = true;
      state.alertMessage = message;
    }
  },
  actions: {
    
  },
  getters: {
    //This Will Allow Getters
    currentUser: (state) => state.currentUser,
    endpointUrl: (state) => state.endpointUrl,
    preloader: (state) => state.preloader,
    alert: (state) => state.alert,
    successAlert: (state) => state.successAlert,
    serverUrl: (state) => state.serverUrl
  }
})

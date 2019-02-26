<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="../assets/bims-logo.png" width="120" height="120">
                  <h1 class="flex my-4 primary--text">BIMS</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Login" type="text" v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="model.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary" @click="onClickForgotPassword" :loading="loading">Forgot Password</v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>

          <BimsAlert ref="BimsAlert"></BimsAlert>
          <Preloader ref="Preloader"></Preloader>
          <ForgotPassword ref="ForgotPassword"></ForgotPassword>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Backbone from 'backbone'
//const Backbone = require('backbone');
import Endpoint from '../Services/Endpoints'
import BimsAlert from '../components/BimsAlert.vue'
import Preloader from '../components/Preloader.vue'
import ForgotPassword from './ForgotPassword.vue'

export default {
  data: () => ({
    dialog: false,
    loading: false,
    model: {
      username: '',
      password: ''
    }
  }),
  components: { 
    'BimsAlert': BimsAlert,
    'Preloader': Preloader,
    'ForgotPassword' : ForgotPassword
  },
  methods: {
    login: function() {
        //this.loading = true;
        //Run API
        var self = this;
        let username = this.model.username;
        let password = this.model.password;
        let userSet = {
            username: username,
            password: password
        }
        // Endpoint.login(userSet);
        let aj = Backbone.Model.extend({
            url: self.$store.state.endpointUrl + "Login/InitialLogin"
        });
        let ajj = new aj();
        this.$refs.Preloader.show("Logging In......");
        ajj.save(userSet,{
            type: "post",
            success: function(model,resp) {
                self.$refs.Preloader.hide();
                if (resp.status == 1) {
                  //Set Store
                  self.$store.commit("setCurrentUser", resp.data.User);
                  self.$router.push('/main/dashboard');
                } else {
                  self.$refs.BimsAlert.open('Error', resp.message, { color: 'red' });
                }
            },
            error: function(err) {
              self.$refs.Preloader.hide();
              //self.$refs.BimsAlert.open('Error', resp.message, { color: 'red' }).then((confirm) => {})
              self.$refs.BimsAlert.open('Error', 'An Error Occured On Server. Please try again later.', { color: 'red' });
            }
        });
    },
    onClickForgotPassword: function() {
        this.$refs.ForgotPassword.open();
    }
  }
};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="../assets/logo.png" width="120" height="120">
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
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Endpoint from '../Services/Endpoints'
import axios from 'axios'

export default {
  data: () => ({
    loading: false,
    model: {
      username: '',
      password: ''
    }
  }),
  methods: {
    login: function() {
        //this.loading = true;
        //Run API
        let username = this.model.username;
        let password = this.model.password;
        let userSet = {
            username: username,
            password: password
        }
        return false;
        this.$router.push('/main/dashboard');
    },
    onClickForgotPassword: function() {
        alert("Forgot Password");
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
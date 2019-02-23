<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Forgot Password</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="onClickSend">Send</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
                <v-flex xs12>
<v-form
    ref="form"
    lazy-validation
  >
    <v-text-field
      v-model="Username"
      :rules="[v => !!v || 'Username is required']"
      label="Username"
      required
    ></v-text-field>

    <v-select
      v-model="secretQuestion1"
      :items="items"
      :rules="[v => !!v || 'Secret Question is required']"
      :error-messages='secretQMatchError()'
      label="Secret Question 1"
      required
    ></v-select>

        <v-text-field
      v-model="secretAnswer1"
      :rules="[v => !!v || 'Secret Answer is required']"
      label="Secret Answer 1"
      required
    ></v-text-field>

    <v-select
      v-model="secretQuestion2"
      :items="items"
      :rules="[v => !!v || 'Secret Question is required']"
      :error-messages='secretQMatchError()'
      label="Secret Question 2"
      required
    ></v-select>

        <v-text-field
      v-model="secretAnswer2"
      :rules="[v => !!v || 'Secret Answer is required']"
      label="Secret Answer 2"
      required
    ></v-text-field>
  </v-form>
                </v-flex>
  
            </v-layout>
        </v-container>
      </v-card>
    <BimsAlert ref="BimsAlert"></BimsAlert>
    <Preloader ref="Preloader"></Preloader>
    </v-dialog>
</template>

<script>
import BimsAlert from '../components/BimsAlert.vue'
import Preloader from '../components/Preloader.vue'

  export default {
    data: () => ({
      Username: '',
      secretAnswer1: null,
      secretAnswer2: null,
      secretQuestion1: null,
      secretQuestion2: null,
      items: [
          { text: 'What was your childhood nickname?', value: 1 },
          { text: 'What is the name of your favorite childhood friend?', value: 2 },
          { text: 'In what city or town did your mother and father meet?', value: 3 },
          { text: 'What is the middle name of your oldest child?', value: 4 },
          { text: 'What is the first name of the boy or girl that you first kissed?', value: 5 },
          { text: 'What was the make and model of your first car?', value: 6 }
        ],
      checkbox: false,
      dialog: false
    }),
    components: {
        'Preloader': Preloader,
        'BimsAlert': BimsAlert
    },
    methods: {
        open : function()  {
            this.dialog = true
        },
        onClickSend: function() {
            //this.dialog = false;
            let self = this;
            if (this.$refs.form.validate()) {
                var ForgotPasswordModel = Backbone.Model.extend({
                    url: "http://localhost:6513/api/Users/ForgotPassword"
                });
                let forgotPasswordModel = new ForgotPasswordModel();
                let ForgotPasswordData = {
                    Username: self.Username,
                    SecretQuestion1 : self.secretQuestion1,
                    SecretAnswer1 : self.secretAnswer1,
                    SecretQuestion2 : self.secretQuestion2,
                    SecretAnswer2 : self.secretAnswer2
                }
                this.$refs.Preloader.show("");
                forgotPasswordModel.save(ForgotPasswordData, {
                    success: function(model,response) {
                        self.$refs.Preloader.hide("");
                        if (response.status == 1) {
                            self.$refs.BimsAlert.open('Success', "You're new Password is '1234'", { color: 'green' });
                        } else {
                            self.$refs.BimsAlert.open('Error', response.message, { color: 'red' });
                        }
                    },
                    error: function(err) {
                        self.$refs.Preloader.hide("");
                        self.$refs.BimsAlert.open('Error', "An Error Occured, Please Try Again Later.", { color: 'red' });
                    }
                });
            }
        },
        secretQMatchError () { 
            return (this.secretQuestion1 === this.secretQuestion2) ? 'Secret Question Should Not Match' : ''
        }
    }
  }
</script>

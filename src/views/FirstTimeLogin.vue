<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h1>First Time Login</h1>
        </v-flex>        
        <v-flex lg12>
          <v-card>
            <v-divider></v-divider>
            <v-card-text>
                <v-form ref="firstLoginForm">
                <v-layout row wrap>
                    
                    <v-flex sm6>
                        <v-select
                        :items="sqOptions"
                        label="Secret Question #1"
                        v-model="SQ1"
                        item-text="name"
                        item-value="value"
                        :rules="[v => !!v || 'Secret Question is required', v => v != SQ2 || 'Secret Question Should Not Match.']"
                        required
                        ></v-select>
                    </v-flex>
                    <v-flex sm6>
                        <v-text-field 
                        v-model="SQ1Answer" 
                        label="Secret Answer #1"
                        :rules="[v => v.trim() != '' || 'Secret Answer is required']"
                        required
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex sm6>
                        <v-select
                        :items="sqOptions"
                        label="Secret Question #2"
                        v-model="SQ2"
                        item-text="name"
                        item-value="value"
                        :rules="[v => !!v || 'Secret Question is required', v => v != SQ1 || 'Secret Question Should Not Match.']"
                        required
                        ></v-select>
                    </v-flex>
                    <v-flex sm6>
                        <v-text-field 
                        v-model="SQ2Answer" 
                        label="Secret Answer #2"
                        :rules="[v => v.trim() != '' || 'Secret Answer is required']"
                        required
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex sm6>
                        <v-text-field
                            v-model="NewPassword"
                            :append-icon="show1 ? 'visibility' : 'visibility_off'"
                            :type="show1 ? 'text' : 'password'"
                            label="New Password"
                            :rules="[v => v.trim() != '' || 'New Password is required', v => v == ConfirmPassword || 'Password Should Match.']"
                            @click:append="show1 = !show1"
                        ></v-text-field>
                    </v-flex>
                    <v-flex sm6>
                        <v-text-field
                            v-model="ConfirmPassword"
                            :append-icon="show2 ? 'visibility' : 'visibility_off'"
                            :type="show2 ? 'text' : 'password'"
                            label="New Password"
                            :rules="
                            [
                                v => v.trim() != '' || 'Confirm Password is required',
                                v => v == NewPassword || 'Password Should Match.'
                            ]"
                            @click:append="show2 = !show2"
                        ></v-text-field>
                    </v-flex>
                    
                </v-layout>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="info" @click="onClickSave">Save</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>  
      </v-layout>
    </v-container>
  </div>
</template>


<script>
export default {
    data() {
        return {
            sqOptions: [{name: 'What was your childhood nickname?', value: '1'},{name: 'What is the name of your favorite childhood friend?', value: '2'},{name: 'In what city or town did your mother and father meet?', value: '3'},{name: 'What is the middle name of your oldest child?', value: '4'},{name: 'What is the first name of the boy or girl that you first kissed?', value: '5'},{name: 'What was the make and model of your first car?', value: '6'}],
            SQ1 : "",
            SQ2 : "",
            SQ1Answer: "",
            SQ2Answer: "",
            NewPassword: "",
            ConfirmPassword: "",
            show1: false,
            show2: false
        }
    },
    methods: {
        onClickSave() {
            if (this.$refs.firstLoginForm.validate()) {
                let ftlData = {
                    UserID: this.$store.state.currentUser.ID,
                    SecretQuestion1: this.SQ1,
                    SecretQuestion2: this.SQ2,
                    SecretAnswer1: this.SQ1Answer,
                    SecretAnswer2: this.SQ2Answer,
                    Password: this.NewPassword
                }
                this.$store.commit("showPreloader");
                var self = this;
                this.Endpoints.updateFirstTimeLogin({
                    data: ftlData,
                    success: (response) => {
                        this.$store.commit("hidePreloader");
                        if (response.data.status == 1) {
                            this.$swal("Success","Successfully Updated", "success")
                                .then((value) => {
                                    self.$store.commit("setCurrentUser",response.data.data);
                                    self.$router.push("/main/dashboard");
                            });
                        } else {
                            this.$swal("error", response.data.message,"error");
                        }
                    },
                    error: (err) => {
                        this.$store.commit("hidePreloader");
                        this.$swal("error", "An Error Occured On Server. Please try again later.","error");
                    }
                });
            }
        }
    }
}
</script>

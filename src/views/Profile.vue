<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h1>My Profile</h1>
        </v-flex>        
        <v-flex lg12>
          <v-card>
            <v-divider></v-divider>
            <v-card-text>
                <v-form ref="profileForm">
                <v-layout row wrap>
                    <v-flex sm6>
                        <v-list-tile>
                            <v-list-tile-content>
                            <v-list-tile-title>{{ currentUserFullName }}</v-list-tile-title>
                            <v-list-tile-sub-title>Resident Name</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-flex>
                    <v-flex sm6>
                        <v-list-tile>
                            <v-list-tile-content>
                            <v-list-tile-title>{{ currentUserRole }}</v-list-tile-title>
                            <v-list-tile-sub-title>Role</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field 
                            v-model="FirstName" 
                            label="First Name" 
                            :rules="[v => !!v || 'First Name is required', v => /^[a-z]+$/i.test(v) || 'Alphabets Only']"
                            required >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field 
                            v-model="MiddleName" 
                            label="Middle Name" 
                            :rules="[v => !!v || 'Middle Name is required', v => /^[a-z]+$/i.test(v) || 'Alphabets Only']"
                            required>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field 
                            v-model="LastName" 
                            label="Last Name"
                            :rules="[v => !!v || 'Last Name is required', v => /^[a-z]+$/i.test(v) || 'Alphabets Only']"
                            required>
                        </v-text-field>
                    </v-flex>
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
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            :disabled="!updatePassword"
                            v-model="CurrentPassword"
                            :append-icon="show3 ? 'visibility' : 'visibility_off'"
                            :type="show3 ? 'text' : 'password'"
                            label="Current Password"
                            :rules="
                            [
                                v => !updatePassword || (!!v || 'Current Password is required')
                            ]"
                            @click:append="show3 = !show3"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            :disabled="!updatePassword"
                            v-model="NewPassword"
                            :append-icon="show1 ? 'visibility' : 'visibility_off'"
                            :type="show1 ? 'text' : 'password'"
                            label="New Password"
                            :rules="[v => !updatePassword || (!!v || 'New Password is required'), 
                            v => !updatePassword || (v == ConfirmPassword || 'Password Should Match.')]"
                            @click:append="show1 = !show1"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            :disabled="!updatePassword"
                            v-model="ConfirmPassword"
                            :append-icon="show2 ? 'visibility' : 'visibility_off'"
                            :type="show2 ? 'text' : 'password'"
                            label="New Password Confirm"
                            :rules="
                            [
                                v => !updatePassword || (!!v || 'Confirm Password is required'),
                                v => !updatePassword || (v == NewPassword || 'Password Should Match.')
                            ]"
                            @click:append="show2 = !show2"
                        ></v-text-field>
                    </v-flex>
                    <v-flex lg12>
                        <v-checkbox v-model="updatePassword" label="Update Password?">
                        </v-checkbox>
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
            show2: false,
            show3: false,
            FirstName: "",
            MiddleName: "",
            LastName: "",
            CurrentPassword: "",
            updatePassword: false
        }
    },
    methods: {
        onClickSave() {
            if (this.$refs.profileForm.validate()) {

                let updateData = {
                    UserID: this.$store.state.currentUser.ID,
                    SecretQuestion1: this.SQ1,
                    SecretQuestion2: this.SQ2,
                    SecretAnswer1: this.SQ1Answer,
                    SecretAnswer2: this.SQ2Answer,
                    Password: this.NewPassword,
                    UpdatePassword: this.updatePassword,
                    FirstName: this.FirstName,
                    MiddleName: this.MiddleName,
                    LastName: this.LastName,
                    CurrentPassword: this.CurrentPassword
                }


                this.$store.commit("showPreloader");
                var self = this;
                this.Endpoints.updateUserProfile({
                    data: updateData,
                    success: (response) => {
                        this.$store.commit("hidePreloader");
                        if (response.data.status == 1) {
                            this.$swal("Success","Successfully Updated", "success")
                                .then((value) => {
                                    self.$store.commit("setCurrentUser",response.data.data);
                                    //let userData = response.data.data;
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
    },
    computed: {
        //we have to get the current user
        currentUserFullName () {
            let curUser = this.$store.state.currentUser;
            return curUser.FirstName + " " + curUser.MiddleName + " " + curUser.LastName;
        },
        currentUserRole () {
            let curUser = this.$store.state.currentUser;
            return curUser.Role;
        },
    },
    mounted() {
        this.FirstName = this.$store.state.currentUser.FirstName;
        this.MiddleName = this.$store.state.currentUser.MiddleName;
        this.LastName = this.$store.state.currentUser.LastName;
        this.SQ1 = "" + this.$store.state.currentUser.SecretQuestion1ID;
        this.SQ2 = "" +  this.$store.state.currentUser.SecretQuestion2ID;
        this.SQ1Answer = this.$store.state.currentUser.SecretAnswer1;
        this.SQ2Answer = this.$store.state.currentUser.SecretAnswer2;
    }
}
</script>

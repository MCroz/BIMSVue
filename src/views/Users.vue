<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Users</h3>
        </v-flex>        
        <v-flex lg12>
          <v-card>
    <v-dialog v-model="EditUserDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit User</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="editUserForm">
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field 
                  v-model="updateUser.FirstName" 
                  label="First Name" 
                  :rules="[v => !!v || 'First Name is required']"
                  required ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field 
                  v-model="updateUser.MiddleName" 
                  label="Middle Name" 
                  :rules="[v => !!v || 'Middle Name is required']"
                  required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field 
                  v-model="updateUser.LastName" 
                  label="Last Name"
                  :rules="[v => !!v || 'Last Name is required']"
                  required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field 
                  v-model="updateUser.Username" 
                  label="Username"
                  :rules="[v => !!v || 'Username is required']"
                  required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-btn block color="secondary" dark @click="resetPassword(updateUser.ID)">Reset Password</v-btn>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-btn block color="secondary" dark :disabled="Number(updateUser.Attempt) < 4" @click="unblockUser(updateUser.ID)">Unblock User</v-btn>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="['Administrator', 'Document Staff', 'Inventory/Medicine Staff']"
                  label="Role"
                  v-model="updateUser.Role"
                  :rules="[v => !!v || 'Role is required']"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="EditUserDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

            <v-toolbar card color="white">
    <v-dialog v-model="NewUserDialog" persistent max-width="600px">
            <v-btn
              color="pink"
              dark
              medium
              absolute
              top
              right
              fab
              slot="activator"
            >
              <v-icon>add</v-icon>
            </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">New User</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="newUserForm">
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field 
                  v-model="newUser.FirstName" 
                  label="First Name" 
                  :rules="[v => !!v || 'First Name is required']"
                  required ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field 
                  v-model="newUser.MiddleName" 
                  label="Middle Name" 
                  :rules="[v => !!v || 'Middle Name is required']"
                  required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field 
                  v-model="newUser.LastName" 
                  label="Last Name"
                  :rules="[v => !!v || 'Last Name is required']"
                  required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field 
                  v-model="newUser.Username" 
                  label="Username"
                  :rules="[v => !!v || 'Username is required']"
                  required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field 
                  v-model="newUser.Password" 
                  label="Password" 
                  type="password"
                  :error-messages='newUserPasswordMatch()'
                  :rules="[v => !!v || 'Password is required']"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field 
                  v-model="createUser.ConfirmPassword" 
                  label="Confirm Password" 
                  type="password" 
                  :error-messages='newUserPasswordMatch()'
                  :rules="[v => !!v || 'Confirm Password is required']"
                  required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="['Administrator', 'Document Staff', 'Inventory/Medicine Staff']"
                  label="Role"
                  v-model="newUser.Role"
                  :rules="[v => !!v || 'Role is required']"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="NewUserDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
              <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Search Resident"
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
              ></v-text-field> 
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="users.headers"
                :search="search"
                :items="users.items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="name"
                >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-btn depressed outline icon fab dark color="primary" small @click="editUser(props.item)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn depressed outline icon fab dark color="pink" small @click="removeUser(props.item)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>            
                  <td>{{ props.item.FirstName }}</td>
                  <td>{{ props.item.MiddleName }}</td>
                  <td>{{ props.item.LastName }}</td>
                  <td>{{ props.item.Username }}</td>
                  <td>{{ props.item.Role }}</td>
                  <td>{{ props.item.Status }}</td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>  
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      users: {
        headers: [
            { text: 'Action', value: '' },
            { text: 'First Name', value: 'FirstName' },
            { text: 'Middle Name', value: 'MiddleName' },
            { text: 'Last Name', value: 'LastName' },
            { text: 'Username', value: 'Username' },
            { text: 'Position', value: 'Role' },
            { text: 'Status', value: 'Status' }
        ],
        items: []
      },
      NewUserDialog: false,
      EditUserDialog: false,
      newUser: {
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Username: "",
        Password: "",
        Role: "",
        ModifiedBy: this.$store.state.currentUser.ID,
        CreatedBy: this.$store.state.currentUser.ID
      },
      createUser: {
        ConfirmPassword: ""
      },
      updateUser: {
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Username: "",
        Role: "",
        ModifiedBy: this.$store.state.currentUser.ID,
        ID: ""
      },
    };
  },
  methods: {
    newUserPasswordMatch: function() {
      return (this.newUser.Password != this.createUser.ConfirmPassword) ? 'Password Should Match' : ''
    },
    getUsers: function() {
      var moment = this.moment;
      let userList = Backbone.Model.extend({
          url: this.$store.state.endpointUrl + "Users/GetUserList"
      });
      
      let UserList = new userList();
      this.$store.commit("showPreloader");
      UserList.fetch({
          success: (model,resp) => {
              this.$store.commit("hidePreloader");
              if (resp.status == 1) {
                resp.data.forEach(function(element) {
                  element.Status = element.Attempt >= 4 ? 'Blocked' : 'Active'
                });
                this.users.items = resp.data;
              } else {
                this.$store.commit("showAlert",resp.message);
              }
          },
          error: function(err) {
            this.$store.commit("hidePreloader");
            this.$store.commit("showAlert", "An Error Occured On Server. Please try again later.");
          }
      });
    },
    addUser: function() {
      var self = this;
      if (this.$refs.newUserForm.validate()) { 
        let newUserModel = Backbone.Model.extend({
          url: this.$store.state.endpointUrl + "Users/AddUser"
        });
        let NewUserModel = new newUserModel();
        this.$store.commit("showPreloader");
        NewUserModel.save(this.newUser, {
          success: (model,response) => {
              this.$store.commit("hidePreloader");
              if (response.status == 1) {
                this.$swal("Success","Successfully Added", "success").then((value) => {
                  self.getUsers();
                  self.NewUserDialog = false;
                });
              } else {
                this.$swal("Error",response.message, "error");
              }
          },
          error: (err) => {
            this.$store.commit("hidePreloader");
            this.$swal("Error","An Error Occured On Server. Please try again later.", "error");
          }
        });
      }
    },
    removeUser(user) {
      var self = this;
      this.$swal.fire({
        title: "Are you sure ?",
        text: "Remove " + user.FirstName + " " + user.MiddleName + " " + user.LastName + "?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          let removeUserModel = Backbone.Model.extend({
            url: this.$store.state.endpointUrl + "Users/DeleteUser/" + user.ID
          });
          let RemoveUserModel = new removeUserModel();
          this.$store.commit("showPreloader");
          RemoveUserModel.fetch({
            success: (model,response) => {
              this.$store.commit("hidePreloader");
              if (response.status == 1) {
                this.$swal("Success","Successfully Removed", "success").then((value) => {
                  self.getUsers();
                });
              } else {
                this.$swal("Error",response.message, "error");
              }
            },
            error: (err) => {
              this.$store.commit("hidePreloader");
              this.$swal("Error","An Error Occured On Server. Please try again later.", "error");
            }
          });
        }
      })
    },
    editUser: function(user) {
      this.EditUserDialog = true;
      this.updateUser = Object.assign({}, user);
    },
    resetPassword: function(userId) {
      let ResetUserModel = Backbone.Model.extend({
          url: this.$store.state.endpointUrl + "Users/ResetPassword/" + userId
      });
      let resetUserModel = new ResetUserModel();
      this.$store.commit("showPreloader");
      var self = this;
      resetUserModel.fetch({
        success: (model,response) => {
          this.$store.commit("hidePreloader");
          if (response.status == 1) {
            this.$swal("Success","Password Reset Successful. New Password is '1234'", "success").then((value) => {
              self.getUsers();
            });
          } else {
            this.$swal("Error",response.message, "error");
          }
        },
        error: (err) => {
          this.$store.commit("hidePreloader");
          this.$swal("Error","An Error Occured On Server. Please try again later.", "error");
        }
      });
    },
    unblockUser: function(userId) {
      let UnblockUserModel = Backbone.Model.extend({
          url: this.$store.state.endpointUrl + "Users/UnblockUser/" + userId
      });
      let unblockUserModel = new UnblockUserModel();
      this.$store.commit("showPreloader");
      var self = this;
      unblockUserModel.fetch({
        success: (model,response) => {
          this.$store.commit("hidePreloader");
          if (response.status == 1) {
            this.$swal("Success","Unblocked Successfully", "success").then((value) => {
              self.getUsers();
              self.EditUserDialog = true;
            });
          } else {
            this.$swal("Error",response.message, "error");
          }
        },
        error: (err) => {
          this.$store.commit("hidePreloader");
          this.$swal("Error","An Error Occured On Server. Please try again later.", "error");
        }
      });
    }
  },
  mounted() {
    this.getUsers();
  }
}
</script>
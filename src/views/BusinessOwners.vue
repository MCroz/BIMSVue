<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Business Owners</h3>
        </v-flex>        
        <v-flex lg12>
          <v-card>
            <v-toolbar card color="white">
            <v-btn
              color="pink"
              dark
              medium
              absolute
              top
              right
              fab
              @click="onClickAddOwner"
            >
              <v-icon>add</v-icon>
            </v-btn>
            <v-dialog v-model="NewOwnerDialog" persistent max-width="800px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{OwnerActionType}} Owner</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-form ref="newOwnerForm">
                    <v-layout wrap>
                      <v-flex xs12>
                        <FileUpload 
                          v-model="newOwner.Image"
                          v-bind:imageSrc="newOwnerDefaultImage"
                          v-bind:imageValue="''"
                          v-bind:absoluteUrl="$store.state.serverUrl + 'Images/OwnerImages/'"
                          v-bind:key = "rerenderKey"
                          :uploadUrl="$store.state.endpointUrl + 'Upload/UploadOwnerImage'"
                          />
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field 
                          v-model="newOwner.FirstName" 
                          label="First Name" 
                          :rules="[v => !!v || 'First Name is required']"
                          required ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field 
                          v-model="newOwner.MiddleName" 
                          label="Middle Name" 
                          :rules="[v => !!v || 'Middle Name is required']"
                          required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field 
                          v-model="newOwner.LastName" 
                          label="Last Name"
                          :rules="[v => !!v || 'Last Name is required']"
                          required></v-text-field>
                      </v-flex>
                      <v-flex sm6>
                        <v-text-field 
                          v-model="newOwner.Address" 
                          label="Address"
                          :rules="[v => !!v || 'Address is required']"
                          required></v-text-field>
                      </v-flex>
                      <v-flex sm6>
                        <v-text-field 
                          v-model="newOwner.ContactNo" 
                          label="Contact No."
                          :rules="[
                            v => !!v || 'Contact No is required',
                            v => /^\d+$/.test(v) || 'Numbers Only',
                            v => v.length == 11 || 'Contact No should be 11 digits.'
                          ]"
                          mask="(####)-###-####"
                          required></v-text-field>
                      </v-flex>
                      <v-flex xs12>

                      <v-card>
                        <!-- <v-card-title>
                          <span class="headline">Businesses</span><br>
                        </v-card-title>
                        <v-btn right absolute color="primary" dark class="mb-2">New Item</v-btn>
                        <v-divider></v-divider> -->
                        <v-toolbar flat color="white">
                          <v-toolbar-title>Businesses</v-toolbar-title>
                          <v-divider
                            class="mx-2"
                            inset
                            vertical
                          ></v-divider>
                          <v-dialog persistent v-model="newBusinessDialog" max-width="700px">
                            <v-btn right absolute slot="activator" color="primary" dark class="mb-2" @click="onClickAddBusiness">Add Business</v-btn>
                            <v-card>
                              <v-card-title>
                                <span class="headline">{{BusinessActionType}} Business</span>
                              </v-card-title>

                              <v-card-text>
                                <v-container grid-list-md>
                                  <v-form ref="newBusinessForm">
                                  <v-layout wrap>
                                    <v-flex sm6>
                                      <v-text-field 
                                        v-model="newBusiness.BusinessName" 
                                        label="Business Name"
                                        :rules="[v => v.trim() != '' || 'Business Name is required']"
                                        required
                                      >
                                      </v-text-field>
                                    </v-flex>
                                    <v-flex sm6>
                                      <v-text-field 
                                        v-model="newBusiness.BusinessAddress" 
                                        label="Business Address"
                                        :rules="[v => v.trim() != '' || 'Business Address is required']"
                                        required
                                      >
                                      </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                      <v-text-field 
                                        v-model="newBusiness.FloorArea" 
                                        label="Floor Area"
                                        :rules="[
                                          v => v.trim() != '' || 'Floor Area is required',
                                          v => /^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/.test(v) || 'Positive Numbers Only'
                                        ]"
                                        suffix="sq. m"
                                        type="number"
                                        required
                                      >
                                      </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                      <v-text-field 
                                        v-model="newBusiness.DTI_SEC_RegNo" 
                                        label="DTI/SEC Reg. No."
                                        :rules="[
                                          v => v.trim() != '' || 'DTI/SEC Reg. No. is required'
                                        ]"
                                        required
                                      >
                                      </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                      <v-text-field 
                                        v-model="newBusiness.Capitalization" 
                                        label="Capitalization"
                                        :rules="[
                                          v => !!v || 'Capitalization is required',
                                          v => /^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/.test(v) || 'Positive Numbers Only'
                                        ]"
                                        prefix="₱"
                                        type="number"
                                        required
                                      >
                                      </v-text-field>
                                    </v-flex>
                                    <v-flex sm6>
                                      <v-text-field 
                                        v-model="newBusiness.BusinessContactNo" 
                                        label="Business Contact No."
                                        :rules="[
                                          v => v.trim() != '' || 'Business Contact No. is required'
                                        ]"
                                        required
                                      >
                                      </v-text-field>
                                    </v-flex>
                                    <v-flex sm6>
                                      <v-select
                                        :items="kindOfBusinessOptions"
                                        label="Kind of Business"
                                        v-model="newBusiness.KindOfBusiness"
                                        :rules="[v => v.trim() != '' || 'Kind of Business is required']"
                                        required
                                      ></v-select>
                                      <v-text-field 
                                        v-model="newOwnerAddBusinessOthers" 
                                        label="Others"
                                        v-if="newBusiness.KindOfBusiness == 'Others'"
                                        :error-messages="newOwnerBusinessError()"
                                        required ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  </v-form>
                                </v-container>
                              </v-card-text>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click="newBusinessDialog = false">Cancel</v-btn>
                                <v-btn color="blue darken-1" flat @click="addBusiness">Save</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-toolbar>
                        <v-card-text class="pa-0">
                          <v-data-table
                            :headers="newOwnersBusinessHeaders"
                            :items="newOwner.Businesses"
                            item-key="ID"
                            hide-actions
                            >
                            <template slot="items" slot-scope="props">
                            <td>
                              <v-btn depressed outline icon fab dark color="primary" small @click="onClickEditBusiness(props.item)">
                                <v-icon>edit</v-icon>
                              </v-btn>
                              <v-btn depressed outline icon fab dark color="pink" small @click="newOwnerRemoveBusiness(props.item)">
                                <v-icon>delete</v-icon>
                              </v-btn>
                            </td>    
                              <td>{{ props.item.BusinessName }}</td>
                              <td>{{ props.item.BusinessAddress }}</td>
                              <td>{{ props.item.FloorArea }} sq.m</td>
                              <td>{{ props.item.DTI_SEC_RegNo }}</td>
                              <td>{{ props.item.BusinessContactNo }}</td>
                              <td>{{ props.item.KindOfBusiness }}</td>
                              <td>{{ props.item.Capitalization | formatCurrency }}</td>
                            </template>
                          </v-data-table>
                        </v-card-text>
                      </v-card>

                      </v-flex>
                    </v-layout>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="NewOwnerDialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click="AddNewOwner">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            
            
              <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Search Owners"
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
              ></v-text-field>   
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="owners.headers"
                :search="search"
                :items="owners.items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="name"
                >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-btn depressed outline icon fab dark color="primary" small @click="onClickEditOwner(props.item)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn depressed outline icon fab dark color="pink" small @click="onClickRemoveOwner(props.item)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>            
                  <td>{{ props.item.FirstName }}</td>
                  <td>{{ props.item.MiddleName }}</td>
                  <td>{{ props.item.LastName }}</td>
                  <td>{{ props.item.Address }}</td>
                  <td>{{ props.item.ContactNo }}</td>
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
      editedIndex: -1,
      BusinessActionType: "Add",
      OwnerActionType: "Add",
      rerenderKey: 1,
      newBusinessDialog: false,
      NewOwnerDialog: false,
      search: '',
      kindOfBusinessOptions: ['Sari-Sari Store', 'Grocery Store', 'Drugstore', 'Restaurant', 'Carinderia','Others'],
      newOwnersBusinessHeaders: [
        { text: 'Action', value: '' },
        { text: 'Business Name', value: 'BusinessName' },
        { text: 'Business Address', value: 'BusinessAddress' },
        { text: 'Floor Area', value: 'FloorArea' },
        { text: 'DTI/SEC Reg. No.', value: 'DTI_SEC_RegNo' },
        { text: 'Business Contact No', value: 'BusinessContactNo' },
        { text: 'Kind of Business', value: 'KindOfBusiness' },
        { text: 'Capitalization', value: 'Capitalization' },
      ],
      newOwnerAddBusinessOthers: '',
      newBusiness: {
        BusinessName: '',
        BusinessAddress: '',
        FloorArea: '',
        DTI_SEC_RegNo: '',
        BusinessContactNo: '',
        KindOfBusiness: '',
        Capitalization: ''
      },
      owners: {
        headers: [ 
          { text: 'Action', value: '' },
          { text: 'First Name', value: 'FirstName' },
          { text: 'Middle Name', value: 'MiddleName' },
          { text: 'Last Name', value: 'LastName' },
          { text: 'Address', value: 'Address' },
          { text: 'Contact No.', value: 'ContactNo' },
        ],
        items: []
      },
      newOwner: {
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Image: "",
        ContactNo: "",
        Address: "",
        Businesses: []
      },
      editOwner: {
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Image: "",
        ContactNo: "",
        Address: ""
      },
      newOwnerDefaultImage: this.$store.state.serverUrl + "Images/Blank.png",
    };
  },
  methods: {
    addBusiness: function() {
      if (this.$refs.newBusinessForm.validate()) {
        // if (this.BusinessActionType == 'Add') {
        //   let toBeAddedBusiness = Object.assign({}, this.newBusiness);
        //   if (toBeAddedBusiness.KindOfBusiness == 'Others') {
        //     toBeAddedBusiness.KindOfBusiness = this.newOwnerAddBusinessOthers;
        //   }
        //   this.newOwner.Businesses.push(toBeAddedBusiness);
        //   this.newBusinessDialog = false;
        //   this.$refs.newBusinessForm.reset();
        // } else {
        //   //Close It
        //   this.newBusinessDialog = false;
        // }
        if (this.editedIndex > -1) {
          let newObj = Object.assign({},this.newBusiness);
          Object.assign(this.newOwner.Businesses[this.editedIndex], newObj)
        } else {
          let toBeAddedBusiness = Object.assign({}, this.newBusiness);
          if (toBeAddedBusiness.KindOfBusiness == 'Others') {
            toBeAddedBusiness.KindOfBusiness = this.newOwnerAddBusinessOthers;
          }
          this.newOwner.Businesses.push(toBeAddedBusiness);
        }
        this.newBusinessDialog = false;
        //this.$refs.newBusinessForm.reset();
      }
    },
    newOwnerRemoveBusiness: function(item) {
      const index = this.newOwner.Businesses.indexOf(item)
      var self = this;
      this.$swal.fire({
        title: "Are you sure ?",
        text: "Remove " + item.BusinessName + "?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.newOwner.Businesses.splice(index, 1)
        }
      })
      //this.newOwner.Businesses.splice(index, 1)
    },
    onClickRemoveOwner: function (ownerObject) {
      var self = this;
      this.$swal.fire({
        title: "Are you sure ?",
        text: "Remove " + ownerObject.FirstName + " " + ownerObject.MiddleName + " " + ownerObject.LastName + "?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          self.$store.commit("showPreloader");
          self.Endpoints.deleteOwner({
            success: (response) => {
              self.$store.commit("hidePreloader");
              if (response.data.status == 1) {
                self.$swal("Success","Successfully Removed", "success").then((value) => {
                  self.getOwners();
                });
              } else {
                self.$swal("Error",response.data.message, "error");
              }
            },
            error: (err) => {
              self.$store.commit("hidePreloader");
              self.$swal("Error","An Error Occured On Server. Please try again later.", "error");
            }
          });
        }
      })
    },
    onClickEditOwner: function (owner) {
      //Fetch
      var self = this;
      this.$store.commit("showPreloader");
      this.Endpoints.getOwnerInfo({
        data: owner.ID,
        success: (response) => {
          self.$store.commit("hidePreloader");
          if (response.data.status == 1) {
            self.newOwner = response.data.data.Owner;
            self.newOwner.Businesses = response.data.data.OwnerBusiness;
            self.OwnerActionType = "Edit";
            if (self.newOwner.Image == '') {
              self.newOwnerDefaultImage = self.$store.state.serverUrl + "Images/Blank.png"
            } else {
              self.newOwnerDefaultImage = self.$store.state.serverUrl + "Images/OwnerImages/" + self.newOwner.Image
            }
            self.rerenderKey += 1
            self.NewOwnerDialog = true;
          } else {
            self.$swal("Error",response.data.message, "error");
          }
        },
        error: (err) => {
          this.$store.commit("hidePreloader");
          this.$swal("Error","An Error Occured On Server. Please try again later.", "error");
        }
      });

      // this.newOwner =  Object.assign({}, owner)
      // this.newOwner.Businesses = owner.Businesses.slice();
      // this.OwnerActionType = "Edit";
      // if (this.newOwner.Image == '') {
      //   this.newOwnerDefaultImage = this.$store.state.serverUrl + "Images/Blank.png"
      // } else {
      //   this.newOwnerDefaultImage = this.$store.state.serverUrl + "Images/OwnerImages/" + this.newOwner.Image
      // }
      // this.rerenderKey += 1
      // this.NewOwnerDialog = true;
    },
    onClickAddOwner: function() {
      this.OwnerActionType = "Add";
      this.NewOwnerDialog = true;
      this.newOwnerDefaultImage = this.$store.state.serverUrl + "Images/Blank.png"
      this.$refs.newOwnerForm.reset()
      this.newOwner.Businesses = []
      this.newOwner.Image = ""
      this.rerenderKey += 1
    },
    AddNewOwner: function() {
      if (this.$refs.newOwnerForm.validate()) { 
        if (this.OwnerActionType == 'Add') {
          var self = this;
          let newOwnerObject = Object.assign({},this.newOwner);
          if (newOwnerObject.Image == "") {
            this.$swal("Error","Please Upload An Image","error");
            return false;
          }
          newOwnerObject.CreatedBy = this.$store.state.currentUser.ID;
          newOwnerObject.ModifiedBy = this.$store.state.currentUser.ID;
          this.$store.commit("showPreloader");
          this.Endpoints.addOwner({
            data: newOwnerObject,
            success: (response) => {
              this.$store.commit("hidePreloader");
              if (response.data.status == 1) {
                this.$swal("Success","Successfully Added", "success").then((value) => {
                  self.NewOwnerDialog = false;
                  self.getOwners();
                });
              } else {
                this.$swal("Error",response.data.message, "error");
              }
            },
            error: (err) => {
              this.$store.commit("hidePreloader");
              this.$swal("Error","An Error Occured On Server. Please try again later.", "error");
            }
          });
        } else {
          var self = this;
          let newOwnerObject = Object.assign({},this.newOwner);
          if (newOwnerObject.Image.trim() == "") {
            this.$swal("Error","Please Upload An Image","error");
            return false;
          }
          newOwnerObject.ModifiedBy = this.$store.state.currentUser.ID;
          this.$store.commit("showPreloader");
          this.Endpoints.updateOwner({
            data: newOwnerObject,
            success: (response) => {
              this.$store.commit("hidePreloader");
              if (response.data.status == 1) {
                this.$swal("Success","Successfully Updated", "success").then((value) => {
                  self.NewOwnerDialog = false;
                  self.getOwners();
                });
              } else {
                this.$swal("Error",response.data.message, "error");
              }
            },
            error: (err) => {
              this.$store.commit("hidePreloader");
              this.$swal("Error","An Error Occured On Server. Please try again later.", "error");
            }
          });
        }
      }
    },
    onClickAddBusiness: function() {
      this.newBusiness.ID = null;
      this.$refs.newBusinessForm.reset();
      this.editedIndex = -1;
      this.BusinessActionType = 'Add';
    },
    onClickEditBusiness: function(businessObject) {
      this.BusinessActionType = 'Edit';
      this.editedIndex = this.newOwner.Businesses.indexOf(businessObject);
      this.newBusiness =  Object.assign({}, businessObject)
      this.newBusinessDialog = true;
    },
    getOwners: function() {
      var moment = this.moment;
      var self = this;
      this.$store.commit("showPreloader");
      this.Endpoints.getBusinessOwners({
          success: (resp) => {
              this.$store.commit("hidePreloader");
              if (resp.data.status == 1) {
                this.owners.items = resp.data.data;
              } else {
                this.$swal("Error",resp.data.message, "error");
              }
          },
          error: function(err) {
            this.$store.commit("hidePreloader");
            this.$swal("Error","An Error Occured On Server. Please try again later.", "error");
          }
      });
    },
    newOwnerBusinessError: function() {
      return (this.newBusiness.KindOfBusiness != 'Others') ? '' : this.newOwnerAddBusinessOthers == "" ? 'Kind of Business is Required' : ''
    }
  },
  mounted() {
    this.getOwners();
  }
}
</script>
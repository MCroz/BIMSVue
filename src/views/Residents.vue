<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Residents</h3>
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
              @click="onClickCreateResident"
            >
              <v-icon>add</v-icon>
            </v-btn>
            <v-dialog v-model="NewResidentDialog" persistent max-width="700px">
              <v-card>
                <v-card-title>
                  <span class="headline">New Resident</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-form ref="newResidentForm">
                    <v-layout wrap>
                      <v-flex xs12>
                        <FileUpload 
                          v-model="resident.Image"
                          v-bind:imageSrc="residentDefaultImage"
                          v-bind:imageValue="''"
                          v-bind:absoluteUrl="$store.state.serverUrl + 'Images/ResidentImages/'"
                          v-bind:key = "rerenderKey"
                          :uploadUrl="$store.state.endpointUrl + 'Upload/UploadImages'"
                          />
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field 
                          v-model="resident.FirstName" 
                          label="First Name" 
                          :rules="[v => !!v || 'First Name is required']"
                          required ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field 
                          v-model="resident.MiddleName" 
                          label="Middle Name" 
                          :rules="[v => !!v || 'Middle Name is required']"
                          required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field 
                          v-model="resident.LastName" 
                          label="Last Name"
                          :rules="[v => !!v || 'Last Name is required']"
                          required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-radio-group v-model="resident.Gender" :rules="[v => !!v || 'Civil Status is required']">
                          <v-radio label="Male" value="Male"></v-radio>
                          <v-radio label="Female" value="Female"></v-radio>
                        </v-radio-group>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-select
                          :items="civilStatusOptions"
                          label="Role"
                          v-model="resident.CivilStatus"
                          :rules="[v => !!v || 'Civil Status is required']"
                          required
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-dialog
                          ref="newResidentBirthdatePickerDialog"
                          v-model="newResidentBirthdatePicker"
                          :return-value.sync="resident.BirthDate"
                          persistent
                          lazy
                          full-width
                          width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            v-model="resident.BirthDate"
                            label="Birth Date"
                            prepend-icon="event"
                            :rules="[v => !!v || 'Birth Date is required']"
                            readonly
                          ></v-text-field>
                          <v-date-picker 
                            v-model="resident.BirthDate"
                            v-bind:max="MaxDate"
                            v-bind:min="MinDate"
                            scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="newResidentBirthdatePicker = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.newResidentBirthdatePickerDialog.save(resident.BirthDate)">OK</v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field 
                          v-model="resident.AddressNo" 
                          label="Address No"
                          :rules="[v => !!v || 'Address No is required']"
                          required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-select
                          :items="addressStOptions"
                          label="Address St."
                          v-model="resident.AddressSt"
                          :rules="[v => !!v || 'Address St is required']"
                          required
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-select
                          :items="addressZoneOptions"
                          label="Address Zone"
                          v-model="resident.AddressZone"
                          :rules="[v => !!v || 'Address Zone is required']"
                          required
                        ></v-select>
                      </v-flex>
                      <v-flex sm6>
                        <v-text-field 
                          v-model="resident.BirthPlace" 
                          label="Birth Place" 
                          :rules="[v => !!v || 'Birth Place is required']"
                          required ></v-text-field>
                      </v-flex>
                      <v-flex sm6>
                        <v-select
                          :items="citizenshipOptions"
                          label="Citizenship"
                          v-model="resident.Citizenship"
                          :rules="[v => !!v || 'Citizenship is required']"
                          required
                        ></v-select>
                        <v-text-field 
                          v-model="newResidentOtherCitizenship" 
                          label="Others"
                          v-if="resident.Citizenship == 'Others'"
                          :error-messages="newResOthers()"
                          required ></v-text-field>
                      </v-flex>
                    </v-layout>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="NewResidentDialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click="CreateResident">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>


            <v-dialog v-model="EditResidentDialog" persistent max-width="700px">
              <v-card>
                <v-card-title>
                  <span class="headline">Update Resident</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-form ref="editResidentForm">
                    <v-layout wrap>
                      <v-flex xs12>
                        <FileUpload 
                          v-model="editResident.Image"
                          v-bind:imageSrc="editResidentDefaultImage"
                          v-bind:imageValue="editResident.Image"
                          v-bind:absoluteUrl="$store.state.serverUrl + 'Images/ResidentImages/'"
                          v-bind:key = "rerenderKey1"
                          :uploadUrl="$store.state.endpointUrl + 'Upload/UploadImages'"
                          />
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field 
                          v-model="editResident.FirstName" 
                          label="First Name" 
                          :rules="[v => !!v || 'First Name is required']"
                          required ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field 
                          v-model="editResident.MiddleName" 
                          label="Middle Name" 
                          :rules="[v => !!v || 'Middle Name is required']"
                          required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field 
                          v-model="editResident.LastName" 
                          label="Last Name"
                          :rules="[v => !!v || 'Last Name is required']"
                          required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-radio-group v-model="editResident.Gender" :rules="[v => !!v || 'Civil Status is required']">
                          <v-radio label="Male" value="Male"></v-radio>
                          <v-radio label="Female" value="Female"></v-radio>
                        </v-radio-group>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-select
                          :items="civilStatusOptions"
                          label="Role"
                          v-model="editResident.CivilStatus"
                          :rules="[v => !!v || 'Civil Status is required']"
                          required
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-dialog
                          ref="editResidentBirthdatePickerDialog"
                          v-model="editResidentBirthdatePicker"
                          :return-value.sync="editResident.BirthDate"
                          persistent
                          lazy
                          full-width
                          width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            v-model="editResident.BirthDate"
                            label="Birth Date"
                            prepend-icon="event"
                            :rules="[v => !!v || 'Birth Date is required']"
                            readonly
                          ></v-text-field>
                          <v-date-picker 
                            v-model="editResident.BirthDate"
                            v-bind:max="MaxDate"
                            v-bind:min="MinDate"
                            scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="editResidentBirthdatePicker = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.editResidentBirthdatePickerDialog.save(editResident.BirthDate)">OK</v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field 
                          v-model="editResident.AddressNo" 
                          label="Address No"
                          :rules="[v => !!v || 'Address No is required']"
                          required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-select
                          :items="addressStOptions"
                          label="Address St."
                          v-model="editResident.AddressSt"
                          :rules="[v => !!v || 'Address St is required']"
                          required
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-select
                          :items="addressZoneOptions"
                          label="Address Zone"
                          v-model="editResident.AddressZone"
                          :rules="[v => !!v || 'Address Zone is required']"
                          required
                        ></v-select>
                      </v-flex>
                      <v-flex sm6>
                        <v-text-field 
                          v-model="editResident.BirthPlace" 
                          label="Birth Place" 
                          :rules="[v => !!v || 'Birth Place is required']"
                          required ></v-text-field>
                      </v-flex>
                      <v-flex sm6>
                        <v-select
                          :items="citizenshipOptions"
                          label="Citizenship"
                          v-model="editResident.Citizenship"
                          :rules="[v => !!v || 'Citizenship is required']"
                          required
                        ></v-select>
                        <v-text-field 
                          v-model="editResidentOtherCitizenship" 
                          label="Others"
                          v-if="editResident.Citizenship == 'Others'"
                          :error-messages="editResOthers()"
                          required ></v-text-field>
                      </v-flex>
                    </v-layout>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="EditResidentDialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click="UpdateResident">Save</v-btn>
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
                :headers="residents.headers"
                :search="search"
                :items="residents.items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="name"
                >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-btn depressed outline icon fab dark color="primary" small @click="onClickEditResident(props.item)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <!-- <v-btn depressed outline icon fab dark color="pink" small>
                      <v-icon>delete</v-icon>
                    </v-btn> -->
                  </td>            
                  <td>{{ props.item.FirstName }}</td>
                  <td>{{ props.item.MiddleName }}</td>
                  <td>{{ props.item.LastName }}</td>
                  <td>{{ props.item.Gender }}</td>
                  <td>{{ props.item.CivilStatus }}</td>
                  <td>{{ props.item.formattedBirthdate }}</td>
                  <td>{{ props.item.AddressNo }}</td>
                  <td>{{ props.item.AddressSt }}</td>
                  <td>{{ props.item.AddressZone }}</td>
                  <td>{{ props.item.BirthPlace }}</td>
                  <td>{{ props.item.Citizenship }}</td>
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
      rerenderKey: 1,
      rerenderKey1: 1,
      MaxDate: "" + this.moment().subtract(1, 'days').format('YYYY-MM-DD'),
      MinDate: "" + this.moment().subtract(100, 'years').format('YYYY-MM-DD'),
      newResidentBirthdatePicker: false,
      editResidentBirthdatePicker: false,
      citizenshipOptions: ['American','Canadian','Chinese','Filipino','Japanese','Korean','Others'],
      addressZoneOptions: ['Ausmolo','Ilaya','Manggahan I','Manggahan II','Looban','Aliw','Gitna','Bukid'],
      addressStOptions: ['A E Mendoza St.','B E Mendoza St.','C E Mendoza St.','D E Mendoza St.','G E Mendoza St.','H E Mendoza St.','I E Mendoza St.','FT Angeles St.','Delos Santos St.','Ausmolo Compound', 'MB Tanangco St.','S. Santos St.', 'A. Santos St.', 'G. Coching St.', 'San Guillermo Avenue', 'F. Flores St.'],
      civilStatusOptions: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'],
      NewResidentDialog: false,
      EditResidentDialog: false,
      search: '',
      residents: {
        headers: [
          {
            text: 'Action',
            value: ''
          },
          {
            text: 'First Name',
            value: 'FirstName'
          },
          {
            text: 'Middle Name',
            value: 'MiddleName'
          },
          {
            text: 'Last Name',
            value: 'LastName'
          },
          {
            text: 'Gender',
            value: 'Gender'
          },
          {
            text: 'Civil Status',
            value: 'CivilStatus'
          },
          {
            text: 'Birth Date',
            value: 'BirthDate'
          },
          {
            text: 'Address No.',
            value: 'Address'
          },
          {
            text: 'Address St.',
            value: 'Address'
          },
          {
            text: 'Address Zone',
            value: 'AddressZone'
          },
          {
            text: 'Birthplace',
            value: 'Birthplace'
          },
          {
            text: 'Citizenship',
            value: 'Citizenship'
          }
        ],
        items: []
      },
      resident: {
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Image: "",
        Gender: "Male",
        CivilStatus: "",
        BirthDate: "",
        AddressSt: "",
        AddressNo: "",
        AddressZone: "",
        Citizenship: "",
        BirthPlace: ""
      },
      editResident: {
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Image: "",
        Gender: "Male",
        CivilStatus: "",
        BirthDate: "",
        AddressSt: "",
        AddressNo: "",
        AddressZone: "",
        Citizenship: "",
        BirthPlace: ""
      },
      newResidentOtherCitizenship: "",
      editResidentOtherCitizenship: "",
      residentDefaultImage: this.$store.state.serverUrl + "Images/Blank.png",
      editResidentDefaultImage: ""
    };
  },
  methods: {
    UpdateResident: function() {
      this.editResident.ModifiedBy = this.$store.state.currentUser.ID;
      var self = this;
      if (this.$refs.editResidentForm.validate()) { 
        let thisResident = Object.assign({},this.editResident);
        if (thisResident.Citizenship == 'Others') {
          if (this.newResidentOtherCitizenship.trim() == "") {
            this.$swal("Error","Please Enter A Citizenship","error");
            return false;
          }
          thisResident.Citizenship = this.editResidentOtherCitizenship;
        }
        delete thisResident['formattedBirthdate']
        this.Endpoints.updateResident({
          data: thisResident,
          success: (response) => {
            this.$store.commit("hidePreloader");
            if (response.data.status == 1) {
              this.$swal("Success","Successfully Updated", "success").then((value) => {
                self.EditResidentDialog = false;
                self.getResidents();
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
    CreateResident: function() {
      this.resident.CreatedBy = this.$store.state.currentUser.ID;
      this.resident.ModifiedBy = this.$store.state.currentUser.ID;
      var self = this;
      if (this.$refs.newResidentForm.validate()) { 
        let thisResident = Object.assign({},this.resident);
        if (thisResident.Citizenship == 'Others') {
          if (this.newResidentOtherCitizenship.trim() == "") {
            this.$swal("Error","Please Enter A Citizenship","error");
            return false;
          }
          thisResident.Citizenship = this.newResidentOtherCitizenship;
        }
        this.$store.commit("showPreloader");
        this.Endpoints.addResident({
          data: thisResident,
          success: (response) => {
            this.$store.commit("hidePreloader");
            if (response.data.status == 1) {
              this.$swal("Success","Successfully Added", "success").then((value) => {
                self.NewResidentDialog = false;
                self.getResidents();
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
    onClickCreateResident: function() {
      this.NewResidentDialog = true;
      this.residentDefaultImage = this.$store.state.serverUrl + "Images/Blank.png"
      this.$refs.newResidentForm.reset()
      this.resident.Image = ""
      this.rerenderKey += 1
    },
    onClickEditResident: function(thisResident) {
      this.EditResidentDialog = true;
      //this.$refs.editResidentForm.reset()
      //this.editResident.Image = ""
      this.editResident = Object.assign({},thisResident)
      this.editResident.BirthDate = this.moment(this.editResident.BirthDate).format('YYYY-MM-DD')
      this.editResidentDefaultImage = this.$store.state.serverUrl + "Images/ResidentImages/" + this.editResident.Image
      this.editResident.Image = this.editResident.Image
      if (!this.citizenshipOptions.includes(this.editResident.Citizenship)) {
        this.editResidentOtherCitizenship = this.editResident.Citizenship
        this.editResident.Citizenship = "Others"
      }

      this.rerenderKey1 += 1
    },
    getResidents: function() {
      var moment = this.moment;
      let residentList = Backbone.Model.extend({
          url: this.$store.state.endpointUrl + "Residents/GetResidentList"
      });
      
      let ResidentList = new residentList();
      this.$store.commit("showPreloader");
      ResidentList.fetch({
          success: (model,resp) => {
              this.$store.commit("hidePreloader");
              if (resp.status == 1) {
                resp.data.forEach(function(element) {
                  element.formattedBirthdate = moment(element.BirthDate).format("LL");
                });
                this.residents.items = resp.data;
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
    newResOthers: function() {
      return (this.resident.Citizenship != 'Others') ? '' : this.newResidentOtherCitizenship == "" ? 'Please Enter a Citizenship' : ''
    },
    editResOthers: function() {
      return (this.editResident.Citizenship != 'Others') ? '' : this.editResidentOtherCitizenship == "" ? 'Please Enter a Citizenship' : ''
    }
  },
  mounted() {
    this.getResidents();
  }
}
</script>
<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Blotters</h3>
        </v-flex>        
        <v-flex lg12>
          <v-card>
            <v-toolbar card color="white">

              <v-dialog v-model="NewBlotterDialog" scrollable persistent max-width="800px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ActionType}} Blotter</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="NewBlotterForm">
                      <v-list subheader>
                        <v-subheader>Complainant Information</v-subheader>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs12>
                              <v-checkbox v-model="ComplainantIsResident" label="Resident?"></v-checkbox>
                                <v-autocomplete
                                  v-if="ComplainantIsResident"
                                  v-model="SelectedComplainantResident"
                                  :items="ResidentList"
                                  box
                                  chips
                                  color="blue-grey lighten-2"
                                  label="Select Resident"
                                  :item-text="function(myData) {return myData.FirstName + ' ' + myData.MiddleName + ' ' + myData.LastName}"
                                  item-value="ID"
                                  :rules="[v => !!v && ComplainantIsResident == true || 'Resident is required',
                                    v => v != SelectedAccusedResident && ComplainantIsResident == true || 'Complainant and Resident Shouldn\'t Match'
                                  ]"
                                >
                                  <template v-slot:selection="data">
                                    <v-chip
                                      :selected="data.selected"
                                      close
                                      class="chip--select-multi"
                                      @input="removeNewBlotterComplainantResident(data.item)"
                                    >
                                      <v-avatar>
                                        <img :src="$store.state.serverUrl + 'Images/ResidentImages/' + data.item.Image">
                                      </v-avatar>
                                      {{ data.item.FirstName + ' ' + data.item.MiddleName + ' ' + data.item.LastName }}
                                    </v-chip>
                                  </template>
                                  <template v-slot:item="data">
                                    <template v-if="typeof data.item !== 'object'">
                                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                                    </template>
                                    <template v-else>
                                      <v-list-tile-avatar>
                                        <img :src="$store.state.serverUrl + 'Images/ResidentImages/' + data.item.Image">
                                      </v-list-tile-avatar>
                                      <v-list-tile-content>
                                        <v-list-tile-title v-html="data.item.FirstName + ' ' + data.item.MiddleName + ' ' + data.item.LastName"></v-list-tile-title>
                                        <v-list-tile-sub-title>{{ data.item.BirthDate | formatDate}}</v-list-tile-sub-title>
                                      </v-list-tile-content>
                                    </template>
                                  </template>
                                </v-autocomplete>
                            </v-flex>
                            <v-flex xs12 sm6 md4 v-if="!ComplainantIsResident">
                              <v-text-field
                                v-model="NewBlotter.Complainant.FirstName"
                                label="First Name" 
                                :rules="[v => !!v != '' && ComplainantIsResident != true || 'First Name is required']"
                                required ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4 v-if="!ComplainantIsResident">
                              <v-text-field
                                v-model="NewBlotter.Complainant.MiddleName"
                                label="Middle Name" 
                                :rules="[v => !!v != '' && ComplainantIsResident != true || 'Middle Name is required']"
                                required ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4 v-if="!ComplainantIsResident">
                              <v-text-field
                                v-model="NewBlotter.Complainant.LastName"
                                label="Last Name" 
                                :rules="[v => !!v != '' && ComplainantIsResident != true || 'Last Name is required']"
                                required ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4 v-if="!ComplainantIsResident">
                              <v-radio-group v-model="NewBlotter.Complainant.Gender" :rules="[v => !!v || 'Gender is required']">
                                <v-radio label="Male" value="Male"></v-radio>
                                <v-radio label="Female" value="Female"></v-radio>
                              </v-radio-group>
                            </v-flex>
                            <v-flex xs12 sm6 md4 v-if="!ComplainantIsResident">
                              <v-text-field
                                v-model="NewBlotter.Complainant.Address"
                                label="Address" 
                                :rules="[v => !!v != '' && ComplainantIsResident != true || 'Address is required']"
                                required ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4 v-if="!ComplainantIsResident">
                              <v-dialog
                                ref="newBlotterComplainantBirthdateDialog"
                                v-model="newBlotterComplainantBirthdateDialog"
                                :return-value.sync="NewBlotter.Complainant.BirthDate"
                                persistent
                                lazy
                                full-width
                                width="290px"
                              >
                                <v-text-field
                                  slot="activator"
                                  v-model="NewBlotter.Complainant.BirthDate"
                                  label="Birth Date"
                                  prepend-icon="event"
                                  :rules="[v => !!v != '' && ComplainantIsResident != true || 'Birth Date is required']"
                                  readonly
                                ></v-text-field>
                                <v-date-picker 
                                  v-model="NewBlotter.Complainant.BirthDate"
                                  v-bind:max="MaxDate"
                                  v-bind:min="MinDate"
                                  scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn flat color="primary" @click="newBlotterComplainantBirthdateDialog = false">Cancel</v-btn>
                                  <v-btn flat color="primary" @click="$refs.newBlotterComplainantBirthdateDialog.save(NewBlotter.Complainant.BirthDate)">OK</v-btn>
                                </v-date-picker>
                              </v-dialog>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-list>
                      <v-divider></v-divider>
                      <v-list subheader>
                        <v-subheader>Accused Information</v-subheader>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs12>
                              <v-checkbox v-model="AccusedIsResident" label="Resident?"></v-checkbox>
                                <v-autocomplete
                                  v-if="AccusedIsResident"
                                  v-model="SelectedAccusedResident"
                                  :items="ResidentList"
                                  box
                                  chips
                                  color="blue-grey lighten-2"
                                  label="Select Resident"
                                  :item-text="function(myData) {return myData.FirstName + ' ' + myData.MiddleName + ' ' + myData.LastName}"
                                  item-value="ID"
                                  :rules="[v => !!v && AccusedIsResident == true || 'Resident is required',
                                  v => v != SelectedComplainantResident && AccusedIsResident == true || 'Complainant and Resident Shouldn\'t Match'
                                  ]"
                                >
                                  <template v-slot:selection="data">
                                    <v-chip
                                      :selected="data.selected"
                                      close
                                      class="chip--select-multi"
                                      @input="removeNewBlotterAccusedResident(data.item)"
                                    >
                                      <v-avatar>
                                        <img :src="$store.state.serverUrl + 'Images/ResidentImages/' + data.item.Image">
                                      </v-avatar>
                                      {{ data.item.FirstName + ' ' + data.item.MiddleName + ' ' + data.item.LastName }}
                                    </v-chip>
                                  </template>
                                  <template v-slot:item="data">
                                    <template v-if="typeof data.item !== 'object'">
                                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                                    </template>
                                    <template v-else>
                                      <v-list-tile-avatar>
                                        <img :src="$store.state.serverUrl + 'Images/ResidentImages/' + data.item.Image">
                                      </v-list-tile-avatar>
                                      <v-list-tile-content>
                                        <v-list-tile-title v-html="data.item.FirstName + ' ' + data.item.MiddleName + ' ' + data.item.LastName"></v-list-tile-title>
                                        <v-list-tile-sub-title>{{ data.item.BirthDate | formatDate}}</v-list-tile-sub-title>
                                      </v-list-tile-content>
                                    </template>
                                  </template>
                                </v-autocomplete>
                            </v-flex>
                            <v-flex xs12 sm6 md4 v-if="!AccusedIsResident">
                              <v-text-field
                                v-model="NewBlotter.Accused.FirstName"
                                label="First Name" 
                                :rules="[v => !!v != '' && AccusedIsResident != true || 'First Name is required']"
                                required ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4 v-if="!AccusedIsResident">
                              <v-text-field
                                v-model="NewBlotter.Accused.MiddleName"
                                label="Middle Name" 
                                :rules="[v => !!v != '' && AccusedIsResident != true || 'Middle Name is required']"
                                required ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4 v-if="!AccusedIsResident">
                              <v-text-field
                                v-model="NewBlotter.Accused.LastName"
                                label="Last Name" 
                                :rules="[v => !!v != '' && AccusedIsResident != true || 'Last Name is required']"
                                required ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4 v-if="!AccusedIsResident">
                              <v-radio-group v-model="NewBlotter.Accused.Gender" :rules="[v => !!v || 'Gender is required']">
                                <v-radio label="Male" value="Male"></v-radio>
                                <v-radio label="Female" value="Female"></v-radio>
                              </v-radio-group>
                            </v-flex>
                            <v-flex xs12 sm6 md4 v-if="!AccusedIsResident">
                              <v-text-field
                                v-model="NewBlotter.Accused.Address"
                                label="Address" 
                                :rules="[v => !!v != '' && AccusedIsResident != true || 'Address is required']"
                                required ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4 v-if="!AccusedIsResident">
                              <v-dialog
                                ref="newBlotterAccusedBirthdateDialog"
                                v-model="newBlotterAccusedBirthdateDialog"
                                :return-value.sync="NewBlotter.Accused.BirthDate"
                                persistent
                                lazy
                                full-width
                                width="290px"
                              >
                                <v-text-field
                                  slot="activator"
                                  v-model="NewBlotter.Accused.BirthDate"
                                  label="Birth Date"
                                  prepend-icon="event"
                                  :rules="[v => !!v != '' && AccusedIsResident != true || 'Birth Date is required']"
                                  readonly
                                ></v-text-field>
                                <v-date-picker 
                                  v-model="NewBlotter.Accused.BirthDate"
                                  v-bind:max="MaxDate"
                                  v-bind:min="MinDate"
                                  scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn flat color="primary" @click="newBlotterAccusedBirthdateDialog = false">Cancel</v-btn>
                                  <v-btn flat color="primary" @click="$refs.newBlotterAccusedBirthdateDialog.save(NewBlotter.Accused.BirthDate)">OK</v-btn>
                                </v-date-picker>
                              </v-dialog>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-list>
                      <v-divider></v-divider>
                      <v-list subheader>
                        <v-subheader>Actual Report</v-subheader>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                              <v-text-field 
                                v-model="NewBlotter.AddressNo" 
                                label="Incident Address No"
                                :rules="[v => !!v || 'Address No is required', v => /^[0-9]+$/.test(v) || 'Numbers Only']"
                                required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-select
                                :items="addressStOptions"
                                label="Incident Address St."
                                v-model="NewBlotter.AddressSt"
                                :rules="[v => !!v || 'Address St is required']"
                                required
                              ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-select
                                :items="addressZoneOptions"
                                label="Incident Address Zone"
                                v-model="NewBlotter.AddressZone"
                                :rules="[v => !!v || 'Address Zone is required']"
                                required
                              ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-dialog
                                ref="newBlotterTimeDialog"
                                v-model="newBlotterTimeDialog"
                                :return-value.sync="NewBlotter.Time"
                                persistent
                                lazy
                                full-width
                                width="290px"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="NewBlotter.Time"
                                    label="Incident Time"
                                    prepend-icon="access_time"
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-time-picker
                                  v-if="newBlotterTimeDialog"
                                  v-model="NewBlotter.Time"
                                  full-width
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn flat color="primary" @click="newBlotterTimeDialog = false">Cancel</v-btn>
                                  <v-btn flat color="primary" @click="$refs.newBlotterTimeDialog.save(NewBlotter.Time)">OK</v-btn>
                                </v-time-picker>
                              </v-dialog>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-dialog
                                ref="newBlotterDateDialog"
                                v-model="newBlotterDateDialog"
                                :return-value.sync="NewBlotter.Date"
                                persistent
                                lazy
                                full-width
                                width="290px"
                              >
                                <v-text-field
                                  slot="activator"
                                  v-model="NewBlotter.Date"
                                  label="Incident Date"
                                  prepend-icon="event"
                                  :rules="[v => !!v || 'Incident Date is required']"
                                  readonly
                                ></v-text-field>
                                <v-date-picker 
                                  v-model="NewBlotter.Date"
                                  v-bind:max="MaxDate"
                                  v-bind:min="MinDate"
                                  scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn flat color="primary" @click="newBlotterDateDialog = false">Cancel</v-btn>
                                  <v-btn flat color="primary" @click="$refs.newBlotterDateDialog.save(NewBlotter.Date)">OK</v-btn>
                                </v-date-picker>
                              </v-dialog>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-select
                                :items="['On Going', 'Settled Case', 'Forwarded To Lupon', 'Forwarded To Pasig Police', 'Forwarded To VAWC']"
                                label="Status"
                                v-model="NewBlotter.Status"
                                :rules="[v => !!v || 'Status is required']"
                                required
                              ></v-select>
                            </v-flex>
                            <v-flex xs12>
                              <v-textarea
                                outline
                                name="input-7-4"
                                label="Narrative Report"
                                v-model="NewBlotter.NarrativeReport"
                                :rules="[v => !!v || 'Narrative Report is required']"
                              ></v-textarea>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-list>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="NewBlotterDialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="onClickSaveNewBlotter">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

                <v-btn
                  color="pink"
                  dark
                  medium
                  absolute
                  top
                  right
                  fab
                  @click="onClickOpenNewBlotter"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Search Blotters"
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
              ></v-text-field> 
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="Blotters.Headers"
                :search="search"
                :items="Blotters.items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="name"
                >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-btn depressed outline icon fab dark color="primary" small @click="onClickEditBlotter(props.item.ID)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </td>            
                  <td>{{ props.item.ComplainantName }}</td>
                  <td>{{ props.item.AccusedName }}</td>
                  <!-- <td>{{ props.item.TypeOfIncident }}</td> -->
                  <td>{{ props.item.IncidentDateTime | formatDate }}</td>
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
      ActionType: "",
      AccusedIsResident: false,
      ComplainantIsResident: false,
      addressZoneOptions: ['Ausmolo','Ilaya','Manggahan I','Manggahan II','Looban','Aliw','Gitna','Bukid'],
      addressStOptions: ['A E Mendoza St.','B E Mendoza St.','C E Mendoza St.','D E Mendoza St.','G E Mendoza St.','H E Mendoza St.','I E Mendoza St.','FT Angeles St.','Delos Santos St.','Ausmolo Compound', 'MB Tanangco St.','S. Santos St.', 'A. Santos St.', 'G. Coching St.', 'San Guillermo Avenue', 'F. Flores St.'],
      MaxDate: "" + this.moment().subtract(1, 'days').format('YYYY-MM-DD'),
      MinDate: "" + this.moment().subtract(100, 'years').format('YYYY-MM-DD'),
      newBlotterComplainantBirthdateDialog: false,
      newBlotterAccusedBirthdateDialog: false,
      newBlotterTimeDialog: false,
      newBlotterDateDialog: false,
      NewBlotterDialog: false,
      search: "",
      Blotters: {
        Headers: [
            { text: 'Action', value: '' },
            { text: 'Complainant Name', value: 'ComplainantName' },
            { text: 'Accused Name', value: 'AccusedName' },
            // { text: 'Type of Incident', value: 'TypeOfIncident' },
            { text: 'Date', value: 'IncidentDateTime' },
            { text: 'Status', value: 'Status' }
        ],
        items: []
      },
      NewBlotter: {
        Complainant: {
          ID: null,
          FirstName: "",
          MiddleName: "",
          LastName: "",
          Address: "",
          BirthDate: "",
          Gender: ""
        },
        Accused: {
          ID: null,
          FirstName: "",
          MiddleName: "",
          LastName: "",
          Address: "",
          BirthDate: "",
          Gender: ""
        },
        AddressNo: "",
        AddressSt: "",
        AddressZone: "",
        Time: "",
        Date: "",
        DateTime: "",
        Status: "",
        NarrativeReport: "",
        ID: null
      },
      SelectedComplainantResident: "",
      SelectedAccusedResident: "",
      ResidentList: [],
    }
  },
  methods: {
    onClickEditBlotter: function(blotterId) {
      this.ActionType = "Update";
      var self = this;
      this.$refs.NewBlotterForm.reset();
      this.$store.commit("showPreloader");
      this.Endpoints.getResidents({
        success: (response) => {
          if (response.data.status == 1) {
            this.ResidentList = response.data.data;
            //Run API for Fetching INFO
            this.Endpoints.getBlotterInfo({
              data: blotterId,
              success: (response2) => {
                self.$store.commit("hidePreloader");
                if (response2.data.status == 1) {
                  let blotterInfo = response2.data.data;
                  if (blotterInfo.Complainant.ResidentID != null) {
                    self.ComplainantIsResident = true;
                    self.SelectedComplainantResident = blotterInfo.Complainant.ResidentID;
                  } else {
                    self.ComplainantIsResident = false;
                    self.NewBlotter.Complainant.FirstName = blotterInfo.Complainant.FirstName;
                    self.NewBlotter.Complainant.MiddleName = blotterInfo.Complainant.MiddleName;
                    self.NewBlotter.Complainant.LastName = blotterInfo.Complainant.LastName;
                    self.NewBlotter.Complainant.Gender = blotterInfo.Complainant.Gender;
                    self.NewBlotter.Complainant.BirthDate = self.moment(blotterInfo.Complainant.BirthDate).format('YYYY-MM-DD')
                    self.NewBlotter.Complainant.Address = blotterInfo.Complainant.Address;
                  }



                  if (response2.data.data.Accused.ResidentID != null) {
                    self.AccusedIsResident = true;
                    self.SelectedAccusedResident = blotterInfo.Accused.ResidentID;
                  } else {
                    self.AccusedIsResident = false;
                    self.NewBlotter.Accused.FirstName = blotterInfo.Accused.FirstName;
                    self.NewBlotter.Accused.MiddleName = blotterInfo.Accused.MiddleName;
                    self.NewBlotter.Accused.LastName = blotterInfo.Accused.LastName;
                    self.NewBlotter.Accused.Gender = blotterInfo.Accused.Gender;
                    self.NewBlotter.Accused.BirthDate = self.moment(blotterInfo.Accused.BirthDate).format('YYYY-MM-DD')
                    self.NewBlotter.Accused.Address = blotterInfo.Accused.Address;
                  }
                  self.NewBlotter.AddressNo = blotterInfo.AddressNo;
                  self.NewBlotter.AddressSt = blotterInfo.AddressSt;
                  self.NewBlotter.AddressZone = blotterInfo.AddressZone;
                  self.NewBlotter.Status = blotterInfo.Status;
                  self.NewBlotter.Date = self.moment(blotterInfo.IncidentDateTime).format('YYYY-MM-DD');
                  self.NewBlotter.Time = self.moment(blotterInfo.IncidentDateTime).format('HH:mm');
                  self.NewBlotter.NarrativeReport = blotterInfo.NarrativeReport;
                  self.NewBlotter.ID = blotterInfo.ID;
                  self.NewBlotter.Complainant.ID = blotterInfo.Complainant.ID;
                  self.NewBlotter.Accused.ID = blotterInfo.Accused.ID;

                  self.NewBlotterDialog = true;
                } else {
                  self.$swal("error", response2.data.message,"error");
                }
              },
              error: (err) => {
                self.$store.commit("hidePreloader");
                self.$swal("error", "An Error Occured On Server. Please try again later.","error");
              }
            });


          } else {
            this.$store.commit("hidePreloader");
            this.$swal("error", response.data.message,"error");
          }
        },
        error: (err) => {
          this.$store.commit("hidePreloader");
          this.$swal("error", "An Error Occured On Server. Please try again later.","error");
        }
      });
    },
    onClickOpenNewBlotter: function() {
      this.ActionType = "New";
      this.$refs.NewBlotterForm.reset();
      //Run API
      this.$store.commit("showPreloader");
      this.Endpoints.getResidents({
        success: (response) => {
          this.$store.commit("hidePreloader");
          if (response.data.status == 1) {
            this.ResidentList = response.data.data;
            this.NewBlotterDialog = true;
          } else {
            this.$swal("error", response.data.message,"error");
          }
        },
        error: (err) => {
          this.$store.commit("hidePreloader");
          this.$swal("error", "An Error Occured On Server. Please try again later.","error");
        }
      });
    },
    removeNewBlotterComplainantResident (item) {
      this.SelectedComplainantResident = "";
    },
    removeNewBlotterAccusedResident (item) {
      this.SelectedAccusedResident = "";
    },
    onClickSaveNewBlotter: function() {
      if (this.$refs.NewBlotterForm.validate()) {
        this.NewBlotter.DateTime = this.moment(this.NewBlotter.Date + ' ' + this.NewBlotter.Time, 'YYYY-MM-DD HH:mm').toDate();
        //console.log(this.NewBlotter);
        let AccusedObj = {};
        if (this.AccusedIsResident) {
          AccusedObj.ResidentID = this.SelectedAccusedResident;
        } else {
          AccusedObj = {
            FirstName: this.NewBlotter.Accused.FirstName,
            MiddleName: this.NewBlotter.Accused.MiddleName,
            LastName: this.NewBlotter.Accused.LastName,
            Gender: this.NewBlotter.Accused.Gender,
            Address: this.NewBlotter.Accused.Address,
            BirthDate: this.NewBlotter.Accused.BirthDate
          }
        }
        let ComplainantObj = {};
        if (this.ComplainantIsResident) {
          ComplainantObj.ResidentID = this.SelectedComplainantResident;
        } else {
          ComplainantObj = {
            FirstName: this.NewBlotter.Complainant.FirstName,
            MiddleName: this.NewBlotter.Complainant.MiddleName,
            LastName: this.NewBlotter.Complainant.LastName,
            Gender: this.NewBlotter.Complainant.Gender,
            Address: this.NewBlotter.Complainant.Address,
            BirthDate: this.NewBlotter.Complainant.BirthDate
          }
        }

        let BlotterObj = {
          IncidentDateTime: this.NewBlotter.DateTime,
          AddressNo: this.NewBlotter.AddressNo,
          AddressSt: this.NewBlotter.AddressSt,
          AddressZone: this.NewBlotter.AddressZone,
          NarrativeReport: this.NewBlotter.NarrativeReport,
          Status: this.NewBlotter.Status,
          Accused: AccusedObj,
          Complainant: ComplainantObj
        }

        //Run API
        this.$store.commit("showPreloader");
        var self = this;
        if (this.ActionType == "New") {
          this.Endpoints.addBlotter({
            data: BlotterObj,
            success: (response) => {
              this.$store.commit("hidePreloader");
              if (response.data.status == 1) {
                this.$swal("Success","Successfully Added", "success").then((value) => {
                  self.NewBlotterDialog = false;
                  self.GetBlotterList();
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
        } else {
          BlotterObj.ID = this.NewBlotter.ID;
          BlotterObj.Accused.ID = this.NewBlotter.Accused.ID;
          BlotterObj.Complainant.ID = this.NewBlotter.Complainant.ID;
          BlotterObj.ID = this.NewBlotter.ID;
          this.Endpoints.updateBlotter({
            data: BlotterObj,
            success: (response) => {
              this.$store.commit("hidePreloader");
              if (response.data.status == 1) {
                this.$swal("Success","Successfully Updated", "success").then((value) => {
                  self.NewBlotterDialog = false;
                  self.GetBlotterList();
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
    GetBlotterList : function() {
      this.$store.commit("showPreloader");
      this.Endpoints.getBlotterList({
        success: (response) => {
          this.$store.commit("hidePreloader");
          if (response.data.status == 1) {
            this.Blotters.items = response.data.data;
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
  },
  mounted() {
    this.GetBlotterList();
  }
}
</script>
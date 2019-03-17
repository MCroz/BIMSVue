<template>
  <div id="social">
    <v-container grid-list-xl fluid>

      <v-dialog v-model="PreDispenseDialog" persistent max-width="900px">
        <v-card>
          <v-card-title>
            <span class="headline">Dispense</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-form ref="PreDispenseTransactionForm">
              <v-layout wrap>
                <v-flex xs12>
                  <v-layout justify-space-around>
                    <v-flex xs5>
                      <v-layout column>
                        <v-img :src="$store.state.serverUrl + 'Images/ResidentImages/' + SelectedResident.Image" aspect-ratio="3" contain></v-img>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex sm6>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ SelectedResident.FirstName + ' ' + SelectedResident.MiddleName + ' ' + SelectedResident.LastName }}</v-list-tile-title>
                      <v-list-tile-sub-title>Resident Name</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-flex>
                <v-flex sm6>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ SelectedResident.AddressNo + ' ' + SelectedResident.AddressSt + ' ' + SelectedResident.AddressZone }}</v-list-tile-title>
                      <v-list-tile-sub-title>Resident Address</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-flex>
                <v-flex sm6>
                  <v-checkbox v-model="Prescriptive" label="Prescriptive"></v-checkbox>
                </v-flex>
                <v-flex xs12 v-if="!Prescriptive">
                  <v-card>
                    <v-toolbar flat color="white">
                      <v-toolbar-title>Medicine List</v-toolbar-title>
                      <v-divider
                        class="mx-2"
                        inset
                        vertical
                      ></v-divider>
                      <v-dialog persistent v-model="NonPrescriptiveMedicineListDialog" max-width="900px">
                        
                        <v-card>
                          <v-card-title>
                            <span class="headline">Select Medicine</span>
                          </v-card-title>

                          <v-card-text>
                                <v-card>
                                  <v-card-title>
                                    <span class="headline">Add Medicines</span>
                                  </v-card-title>
                                  <v-toolbar card color="white">
                                    <v-text-field
                                    flat
                                    solo
                                    prepend-icon="search"
                                    placeholder="Search Medicine Stocks"
                                    v-model="SearchNonPreAddMedicines"
                                    hide-details
                                    class="hidden-sm-and-down"
                                    ></v-text-field> 
                                  </v-toolbar>
                                  <v-divider></v-divider>
                                  <v-card-text class="pa-0">
                                    <v-data-table
                                      :headers="NonPreAddMedicinesHeader"
                                      :search="SearchNonPreAddMedicines"
                                      :items="NonPreAddMedicinesItems"
                                      :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                                      class="elevation-1"
                                      item-key="ID"
                                      >
                                      <template slot="items" slot-scope="props">
                                        <td>
                                          <v-btn flat icon color="pink" @click="onClickAddToNonPreMeds(props.item)">
                                            <v-icon>add_circle</v-icon>
                                          </v-btn>
                                        </td>  
                                        <td>{{ props.item.MedicineName }}</td>
                                        <!-- <td>{{ props.item.Description }}</td> -->
                                        <td>{{ props.item.ExpirationDate | formatDate}}</td>
                                        <td>{{ props.item.Total }}</td>
                                        <td>
                                          <vue-numeric-input
                                            v-model="props.item.AmountToDispense" 
                                            :min="props.item.Total == 0 ? 0 : 1" 
                                            :max="props.item.Total == 0 ? 0 : props.item.Total < 12 ? props.item.Total : 12" 
                                            :step="1">
                                          </vue-numeric-input>
                                        </td>
                                      </template>
                                    </v-data-table>
                                  </v-card-text>
                                </v-card>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="NonPrescriptiveMedicineListDialog = false">Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                    <v-btn left color="primary" dark class="mb-2" @click="onClickAddMedicineNonPre">Add Medicine</v-btn>
                    <v-card-text class="pa-0">
                      <v-data-table
                        :headers="MedicinesHeader"
                        :items="NonPreMedicines"
                        item-key="ID"
                        hide-actions
                        >
                        <template slot="items" slot-scope="props">
                        <td>
                          <v-btn flat icon color="pink" @click="onClickRemoveNonPreMeds(props.item)">
                            <v-icon>delete_sweep</v-icon>
                          </v-btn>
                        </td>
                          <td>{{ props.item.MedicineName }}</td>
                          <!-- <td>{{ props.item.Description }}</td> -->
                          <td>{{ props.item.ExpirationDate | formatDate }}</td>
                          <td>{{ props.item.Total }}</td>
                          <td>{{ props.item.AmountToDispense }}</td>
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
            <v-btn color="blue darken-1" flat @click="PreDispenseDialog = false">Cancel</v-btn>
            <v-btn flat color="pink" @click="">
              Dispense
              <v-icon>touch_app</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="PrePrintDialog" persistent max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">Print</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-form ref="PrintTransactionForm">
              <v-layout wrap>
                <v-flex xs12>
                  <v-layout justify-space-around>
                    <v-flex xs5>
                      <v-layout column>
                        <v-img :src="$store.state.serverUrl + 'Images/ResidentImages/' + SelectedResident.Image" aspect-ratio="3" contain></v-img>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex sm6>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ SelectedResident.FirstName + ' ' + SelectedResident.MiddleName + ' ' + SelectedResident.LastName }}</v-list-tile-title>
                      <v-list-tile-sub-title>Resident Name</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-flex>
                <v-flex sm6>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ SelectedResident.AddressNo + ' ' + SelectedResident.AddressSt + ' ' + SelectedResident.AddressZone }}</v-list-tile-title>
                      <v-list-tile-sub-title>Resident Address</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-flex>
                <v-flex sm6>
                  <v-select
                    :items="['Barangay Clearance', 'Certificate of Indigency']"
                    label="Certificate"
                    v-model="SelectedCertificate"
                    :rules="[v => v.trim() != '' || 'Certificate is required']"
                    required>
                  </v-select>
                </v-flex>
                <v-flex sm6>
                  <v-select
                    :items="PurposeOptions"
                    label="Purpose"
                    v-model="SelectedPurpose"
                    :rules="[v => v.trim() != '' || 'Purpose is required']"
                    required
                  ></v-select>
                  <v-text-field 
                    v-model="SelectedPurposeOthers" 
                    label="Others"
                    v-if="SelectedPurpose == 'Others'"
                    :error-messages="selectedPurposeOthers()"
                    required ></v-text-field>
                </v-flex>
              </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="PrePrintDialog = false">Cancel</v-btn>
            <v-btn flat color="pink" @click="onClickPrint">
              Print
              <v-icon>print</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


        <v-dialog v-model="ViewTransactionsDialog" persistent max-width="800px">

          <v-card>
            <v-card-text class="pa-0">
          <v-tabs
            centered
            color="cyan"
            dark
            icons-and-text
            v-model="currentTab"
          >
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab href="#tab-1" v-if="$store.state.currentUser.Role != 'Document Staff'">
              Medicines
              <v-icon>phone</v-icon>
            </v-tab>

            <v-tab href="#tab-2" @click="getIndigencyTransactions" v-if="$store.state.currentUser.Role != 'Inventory/Medicine Staff'">
              Indigency
              <v-icon>favorite</v-icon>
            </v-tab>

            <v-tab href="#tab-3" @click="getBarangayClearanceTransactions" v-if="$store.state.currentUser.Role != 'Inventory/Medicine Staff'">
              Clearance
              <v-icon>account_box</v-icon>
            </v-tab>

            <v-tab-item :value="'tab-1'">
              <v-card>
                <v-toolbar card color="white">
                  <v-text-field
                  flat
                  solo
                  prepend-icon="search"
                  placeholder="Search Medicine Transactions"
                  v-model="searchMedicineTransactions"
                  hide-details
                  class="hidden-sm-and-down"
                  ></v-text-field> 
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                  <v-data-table
                    :headers="medicineTransactions.headers"
                    :search="searchMedicineTransactions"
                    :items="medicineTransactions.items"
                    :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                    class="elevation-1"
                    item-key="ID"
                    >
                    <template slot="items" slot-scope="props">
                      <td>
                        <v-tooltip right>
                          <template #activator="data">
                            <v-btn v-on="data.on" depressed outline icon fab dark color="primary" small>
                              <v-icon>assignment_late</v-icon>
                            </v-btn>
                          </template>
                          <span>View</span>
                        </v-tooltip>
                      </td>          
                      <td>{{ props.item.CreatedBy }}</td>
                      <td>{{ props.item.DateDispensed }}</td>
                      <td>{{ props.item.PreparationDescription }}</td>
                      
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item :value="'tab-2'">
              <v-card>
                <v-toolbar card color="white">
                  <v-text-field
                  flat
                  solo
                  prepend-icon="search"
                  placeholder="Search Indigency Transactions"
                  v-model="searchIndigency"
                  hide-details
                  class="hidden-sm-and-down"
                  ></v-text-field> 
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                  <v-data-table
                    :headers="indigencyTransactions.headers"
                    :search="searchIndigency"
                    :items="indigencyTransactions.items"
                    :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                    class="elevation-1"
                    item-key="ID"
                    >
                    <template slot="items" slot-scope="props">        
                      <td>{{ props.item.ControlNo }}</td>
                      <td>{{ props.item.PrintedBy }}</td>
                      <td>{{ props.item.Purpose }}</td>
                      <td>{{ props.item.DateCreated | formatDate }}</td>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item :value="'tab-3'">
              <v-card>
                <v-toolbar card color="white">
                  <v-text-field
                  flat
                  solo
                  prepend-icon="search"
                  placeholder="Search Barangay Clearance Transactions"
                  v-model="searchBarangayClearance"
                  hide-details
                  class="hidden-sm-and-down"
                  ></v-text-field> 
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                  <v-data-table
                    :headers="barangayClearanceTransactions.headers"
                    :search="searchBarangayClearance"
                    :items="barangayClearanceTransactions.items"
                    :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                    class="elevation-1"
                    item-key="ID"
                    >
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.ControlNo }}</td>
                      <td>{{ props.item.PrintedBy }}</td>
                      <td>{{ props.item.Purpose }}</td>
                      <td>{{ props.item.DateCreated | formatDate }}</td>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
            </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="onClickCloseTransactionDialog">Close</v-btn>
                </v-card-actions>
          </v-card>
          
        </v-dialog>


        <v-layout row wrap>       
          <v-flex sm12>
            <h4>Resident Transactions</h4>
          </v-flex>          
          <v-flex lg3 sm12 v-for="(item,index) in residents" :key=" 'bottom-nav' + index">
            <v-card color="">
                <v-img
                height="200px"
                :src="item.fullImageSrc"
                >
                </v-img>
                <v-card-title>
                <div style="height: 70px">
                    <span>{{ item.FirstName + " " + item.MiddleName + " " + item.LastName}}</span><br>
                    <span>{{ item.formattedBirthdate}}</span><br>
                    <span>{{ item.AddressZone}}</span>
                </div>
                </v-card-title>
                <v-btn v-if="$store.state.currentUser.Role == 'Inventory/Medicine Staff'" block flat color="teal" dark @click="onClickPreDispense(item)">Dispense Medicine</v-btn>
                <v-btn block flat color="teal" dark @click="onClickViewTransactions(item.ID)">View Transaction</v-btn>
                <v-btn v-if="$store.state.currentUser.Role == 'Document Staff'" block flat color="teal" dark @click="onClickPrePrint(item)">Print</v-btn>
            </v-card>
          </v-flex>   
        </v-layout>
      </v-container>
  </div>
</template>

<script>
const electron = require('electron');
const _ = require('underscore');
export default {
  data () {
    return {
      NonPreAddMedicinesItems: [],
      SearchNonPreAddMedicines: "",
      NonPreAddMedicinesHeader: [
          { text: 'Action', value: '' },
          { text: 'Medicine Name', value: 'MedicineName' },
          // { text: 'Description', value: 'Description' },
          { text: 'Expiration Date', value: 'ExpirationDate' },
          { text: 'Stocks on Hand', value: 'Total' },
          { text: '', value: '' }
      ],
      NonPrescriptiveMedicineListDialog: false,
      MedicinesHeader: [
          { text: 'Action', value: '' },
          { text: 'Medicine Name', value: 'MedicineName' },
          // { text: 'Description', value: 'Description' },
          { text: 'Expiration Date', value: 'Quantity' },
          { text: 'Current Stock', value: 'dasdas' },
          { text: 'Quantity', value: 'Quantffity' },
      ],
      NonPreMedicines: [],
      Prescriptive: false,
      PreDispenseDialog: false,
      PrePrintDialog: false,
      ViewTransactionsDialog: false,
      residents: [],
      currentResidentId : '',
      searchMedicineTransactions: '',
      medicineTransactions: {
        headers: [
            { text: 'Action', value: '' },
            { text: 'Dispensed By', value: 'MedicineName' },
            { text: 'Dispensed Date', value: 'Description' },
            { text: 'Prescription Description', value: 'Quantity' },
        ],
        items: []
      },
      searchIndigency: '',
      indigencyTransactions: {
        headers: [
            { text: 'Control No', value: 'ControlNo' },
            { text: 'Printed By', value: 'PrintedBy' },
            { text: 'Purpose', value: 'Purpose' },
            { text: 'Date', value: 'DateCreated' },
        ],
        items: []
      },
      barangayClearanceTransactions: {
        headers: [
            { text: 'Control No', value: 'ControlNo' },
            { text: 'Printed By', value: 'PrintedBy' },
            { text: 'Purpose', value: 'Purpose' },
            { text: 'Date', value: 'DateCreated' },
        ],
        items: []
      },
      searchBarangayClearance: '',
      currentTab: "tab-1",
      SelectedResident: {

      },
      SelectedPurpose: "",
      SelectedPurposeOthers: "",
      SelectedCertificate: "",
      PurposeOptions: ["Financial Assistance", "Scholarship Application", "TUPAD Application", "Others"]
    };
  },
  methods: {
    onClickRemoveNonPreMeds: function(item) {
      const index = this.NonPreMedicines.indexOf(item);
      this.NonPreMedicines.splice(index, 1);
    },
    onClickAddToNonPreMeds: function(val) {
      const index = this.NonPreAddMedicinesItems.indexOf(val)
      let toBeAddedMeds = Object.assign({}, val);
      this.NonPreMedicines.push(val);
      this.NonPreAddMedicinesItems.splice(index, 1);
    },
    onClickAddMedicineNonPre: function() {
      this.NonPreAddMedicinesItems = [];
      //Run API
      this.$store.commit("showPreloader");
      this.Endpoints.getDispenseMedicineStockList({
        success: (response) => {
          this.$store.commit("hidePreloader");
          if (response.data.status == 1) {
            let toDispenseMedicines = this.NonPreMedicines;

            response.data.data.forEach((med) => {
              med.AmountToDispense = (med.Total == 0 ? 0 : 1);
            });

            let filteredList = _.reject(response.data.data, function(returnedData) {
              let found = _.find(toDispenseMedicines, function(test) {
                  return Number(returnedData.StockID) == Number(test.StockID)
              });
              if (typeof(found) == "undefined") {
                  return false;
              }
              return true;
            });
            this.NonPreAddMedicinesItems = filteredList;
            //this.NonPreAddMedicinesItems = response.data.data;
          } else {
            this.$swal("error", response.data.message,"error");
          }
        },
        error: (err) => {
          this.$store.commit("hidePreloader");
          this.$swal("error", "An Error Occured On Server. Please try again later.","error");
        }
      });
      this.NonPrescriptiveMedicineListDialog = true;
    },
    onClickPreDispense: function(myResident) {
      //TODO
      //Modal 
      this.NonPreMedicines = [];
      this.SelectedResident = myResident;
      this.PreDispenseDialog = true;
    },
    onClickPrint: function() {
      let purpose = this.SelectedPurpose != 'Others' ? this.SelectedPurpose : this.SelectedPurposeOthers;
      if (this.$refs.PrintTransactionForm.validate() && purpose != '') {
        
        let PrintModel = {
          ResidentID : this.SelectedResident.ID,
          Purpose : purpose,
          ProcessedByID : this.$store.state.currentUser.ID,
          CertificateType: this.SelectedCertificate
        };
        this.$store.commit("showPreloader");
        this.Endpoints.residentPrintTransaction({
          data: PrintModel,
          success: (response) => {
            this.$store.commit("hidePreloader");
            if (response.data.status == 1) {
              //Show PDF
              let pdfWindow = new electron.remote.BrowserWindow({
                  width: 1200,
                  height: 800,
                  webPreferences: {
                      plugins: true
                  }
              });
              pdfWindow.loadURL("http://localhost:6513/PDFS/Outputs/" + response.data.data);

              pdfWindow.setMenu(null);

              pdfWindow.on("closed", function () {
                  pdfWindow = null
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
    },
    onClickPrePrint: function(value) {
      this.SelectedResident = value;
      this.PrePrintDialog = true;
    },
    getResidents: function() {
      var moment = this.moment;
      var self = this;
      this.$store.commit("showPreloader");
      this.Endpoints.getResidents({
          success: (resp) => {
              this.$store.commit("hidePreloader");
              if (resp.data.status == 1) {
                resp.data.data.forEach(function(element) {
                  element.formattedBirthdate = moment(element.BirthDate).format("LL");
                  element.fullImageSrc = element.Image == "" ? self.$store.state.serverUrl + "Images/Blank.png" : self.$store.state.serverUrl + "Images/ResidentImages/" + element.Image;
                });
                this.residents = resp.data.data;
              } else {
                this.$swal("Error",resp.data.message,"error");
              }
          },
          error: function(err) {
            this.$store.commit("hidePreloader");
            this.$swal("Error","An Error Occured On Server. Please try again later.","error");
          }
      });
    },
    onClickViewTransactions: function(residentId) {
      this.currentResidentId = residentId;
      if (this.$store.state.currentUser.Role == "Document Staff") {
        this.currentTab = "tab-2";
        this.getIndigencyTransactions();
      } else {
        this.currentTab = "tab-1";
        //Fetch Medicines
      }
      this.ViewTransactionsDialog = true;
    },
    getIndigencyTransactions: function() {
      this.$store.commit("showPreloader");
      var self = this;
      this.Endpoints.getIndigencyTransactions({
        data: self.currentResidentId,
        success: (response) => {
          this.$store.commit("hidePreloader");
          if (response.data.status == 1) {
            //Add to array
            this.indigencyTransactions.items = response.data.data;
          } else {
            this.$swal("Error",response.data.message, "error");
          }
        },
        error: (err) => {
          this.$store.commit("hidePreloader");
          this.$swal("Error","An Error Occured On Server. Please try again later.", "error");
        }
      });
    },
    getBarangayClearanceTransactions: function() {
      this.$store.commit("showPreloader");
      var self = this;
      this.Endpoints.getBarangayClearanceTransactions({
        data: self.currentResidentId,
        success: (response) => {
          this.$store.commit("hidePreloader");
          if (response.data.status == 1) {
            //Add to array
            this.barangayClearanceTransactions.items = response.data.data;
          } else {
            this.$swal("Error",response.data.message, "error");
          }
        },
        error: (err) => {
          this.$store.commit("hidePreloader");
          this.$swal("Error","An Error Occured On Server. Please try again later.", "error");
        }
      });
    },
    onClickCloseTransactionDialog: function() {
      this.ViewTransactionsDialog = false;
    },
    selectedPurposeOthers: function() {
      return (this.SelectedPurpose != 'Others') ? '' : this.SelectedPurposeOthers == "" ? 'Please Enter a Purpose' : ''
    }
  },
  mounted() {
    this.getResidents();
  }
};
</script>

<style>
  .circle-image {
    border-radius: 50%;
  }
</style>

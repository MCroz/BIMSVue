<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Business List</h3>
        </v-flex>        
        <v-flex lg12>
          <v-card>

            <v-dialog v-model="businessClearanceListDialog" persistent max-width="800px">
              <v-card>
                <v-card-title>
                  <span class="headline">Business Clearances</span>
                </v-card-title>
                <v-toolbar card color="white">
                  <v-text-field
                  flat
                  solo
                  prepend-icon="search"
                  placeholder="Search Business"
                  v-model="searchBusinessClearance"
                  hide-details
                  class="hidden-sm-and-down"
                  ></v-text-field>   
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                  <v-data-table
                    :headers="BusinessClearance.header"
                    :search="searchBusinessClearance"
                    :items="BusinessClearance.items"
                    :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                    class="elevation-1"
                    item-key="ID"
                    >
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.ControlNo }}</td>
                      <td>{{ props.item.PrintedBy }}</td>
                      <td>{{ props.item.DateCreated | formatDate }}</td>
                    </template>
                  </v-data-table>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="businessClearanceListDialog = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="businessClearanceInfoDialog" persistent max-width="800px">
              <v-card>
                <v-card-title>
                  <span class="headline">Print Business Clearance</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-layout justify-space-around>
                          <v-flex xs5>
                            <v-layout column>
                              <v-img :src="CurrentBusiness.OwnerImage" aspect-ratio="3" contain></v-img>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ CurrentBusiness.OwnerName }}</v-list-tile-title>
                            <v-list-tile-sub-title>Owner Name</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ CurrentBusiness.OwnerAddress }}</v-list-tile-title>
                            <v-list-tile-sub-title>Owner Address</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ CurrentBusiness.OwnerContactNo }}</v-list-tile-title>
                            <v-list-tile-sub-title>Owner Contact No.</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ CurrentBusiness.BusinessName }}</v-list-tile-title>
                            <v-list-tile-sub-title>Business Name</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ CurrentBusiness.BusinessAddress }}</v-list-tile-title>
                            <v-list-tile-sub-title>Business Address</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ CurrentBusiness.BusinessContactNo }}</v-list-tile-title>
                            <v-list-tile-sub-title>Business Contact No.</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                      <v-flex sm6>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ CurrentBusiness.FloorArea | formatArea }}</v-list-tile-title>
                            <v-list-tile-sub-title>Floor Area</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                      <v-flex sm6>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ CurrentBusiness.DTI_SEC_RegNo }}</v-list-tile-title>
                            <v-list-tile-sub-title>DTI/SEC Reg. No</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                      <v-flex sm6>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ CurrentBusiness.KindOfBusiness }}</v-list-tile-title>
                            <v-list-tile-sub-title>Kind of Business</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                      <v-flex sm6>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ CurrentBusiness.Capitalization | formatCurrency }}</v-list-tile-title>
                            <v-list-tile-sub-title>Capitalization</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-flex>

                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="businessClearanceInfoDialog = false">Cancel</v-btn>
                  <v-btn flat color="pink" @click="onClickPrintBusinessClearance">
                    Print
                    <v-icon>print</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-toolbar card color="white">
            
              <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Search Business"
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
              ></v-text-field>   
            </v-toolbar>
            <v-divider></v-divider>


            <v-card-text class="pa-0">
              <v-data-table
                :headers="Businesses.header"
                :search="search"
                :items="Businesses.items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="ID"
                >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-btn depressed outline icon fab dark color="primary" small @click="onClickViewBusinessClearances(props.item)">
                      <v-icon>info</v-icon>
                    </v-btn>
                    <v-btn depressed outline icon fab dark color="pink" small @click="onClickPrePrint(props.item)">
                      <v-icon>print</v-icon>
                    </v-btn>
                  </td>
                  <td>{{ props.item.OwnerName }}</td>
                  <td>{{ props.item.BusinessContactNo }}</td>
                  <td>{{ props.item.BusinessName }}</td>
                  <td>{{ props.item.BusinessAddress }}</td>
                  <td>{{ props.item.FloorArea | formatArea }}</td>
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
    </v-container>
  </div>
</template>

<script>
import PDFGenerator from '../pdftemplates/pdfgenerator'
const electron = require('electron');
export default {
    data() {
        return {
          businessClearanceInfoDialog: false,
          businessClearanceListDialog: false,
          search: "",
          searchBusinessClearance: "",
          Businesses: {
              header: [
                  { text: 'Action', value: '' },
                  { text: 'Owner Name', value: 'OwnerName' },
                  { text: 'Owner Contact No.', value: 'BusinessContactNo' },
                  { text: 'Business Name', value: 'BusinessName' },
                  { text: 'Business Address', value: 'BusinessAddress' },
                  { text: 'Floor Area', value: 'FloorArea' },
                  { text: 'DTI/SEC Reg. No.', value: 'DTI_SEC_RegNo' },
                  { text: 'Business Contact No.', value: 'BusinessContactNo' },
                  { text: 'Kind of Business', value: 'KindOfBusiness' },
                  { text: 'Capitalization', value: 'Capitalization' }
              ],
              items: []
          },
          BusinessClearance: {
              header: [
                  { text: 'Control No.', value: 'ControlNo' },
                  { text: 'Printed By', value: 'PrintedBy' },
                  { text: 'Printed Date', value: 'DateCreated' }
              ],
              items: []
          },
          CurrentBusiness: {
          }
        }
    },
    methods: {
        onClickPrintBusinessClearance: function () {
          this.$store.commit("showPreloader");
          let PrintModel = {
            BusinessID : this.CurrentBusiness.ID,
            ProcessedByID : this.$store.state.currentUser.ID
          };
          this.Endpoints.addBusinessClearance({
            data: PrintModel,
            success: (model,response) => {
              this.$store.commit("hidePreloader");
              if (response.status == 1) {
                //let modal = window.open('http://localhost:6513/PDFS/Outputs/Test.pdf', 'pdf-viewer');
                let pdfWindow = new electron.remote.BrowserWindow({
                    width: 1200,
                    height: 800,
                    webPreferences: {
                        plugins: true
                    }
                });
                pdfWindow.loadURL("http://localhost:6513/PDFS/Outputs/" + response.data);

                pdfWindow.setMenu(null);

                pdfWindow.on("closed", function () {
                    pdfWindow = null
                });
              } else {
                this.$swal("Error", response.message, "error");
              }
            },
            error: (err) => {
              this.$store.commit("hidePreloader");
              alert("wahow");
              this.$swal("Error", "An Error Occured On Server. Please try again later.", "error");
            }
          });
        },
        onClickViewBusinessClearances: function (value) {
          this.$store.commit("showPreloader");
          this.Endpoints.getBusinessClearanceListById({
            data: value.ID,
            success: (response) => {
              this.$store.commit("hidePreloader");
              if (response.data.status == 1) {
                this.BusinessClearance.items = response.data.data;
              } else {
                this.$swal("Error", response.data.message, "error");
              }
            },
            error: (err) => {
              this.$store.commit("hidePreloader");
              this.$swal("Error", "An Error Occured On Server. Please try again later.", "error");
            }
          });
          this.businessClearanceListDialog = true;
        },
        onClickPrePrint: function(value) {
          this.$store.commit("showPreloader");
          this.Endpoints.getBusinessInfo({
            data: value.ID,
            success: (response) => {
              this.$store.commit("hidePreloader");
              if (response.data.status == 1) {
                this.CurrentBusiness = response.data.data;
                this.CurrentBusiness.OwnerImage = this.$store.state.serverUrl + "Images/OwnerImages/" + response.data.data.OwnerImage;

              } else {
                this.$swal("Error", response.data.message, "error");
              }
            },
            error: (err) => {
              this.$store.commit("hidePreloader");
              this.$swal("Error", "An Error Occured On Server. Please try again later.", "error");
            }
          });
          this.businessClearanceInfoDialog = true;
        },
        getBusinessList: function() {
          this.$store.commit("showPreloader");
          this.Endpoints.getBusinessList({
              success: (response) => {
                  this.$store.commit("hidePreloader");
                  if (response.data.status == 1) {
                      this.Businesses.items = response.data.data;
                  } else {
                      this.$swal("Error", response.data.message, "error");
                  }
              },
              error: (err) => {
                  this.$store.commit("hidePreloader");
                  this.$swal("Error", "An Error Occured On Server. Please try again later.", "error");
              }
          });
        }
    },
    mounted() {
        this.getBusinessList();
    }
}
</script>



<style>
</style>
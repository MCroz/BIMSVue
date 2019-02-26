<template>
  <div id="social">
    <v-container grid-list-xl fluid>

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
                      <td>{{ props.item.DateCreated }}</td>
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
                      <td>{{ props.item.DateCreated }}</td>
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
                <v-btn v-if="$store.state.currentUser.Role == 'Inventory/Medicine Staff'" block flat color="teal" dark>Dispense Medicine</v-btn>
                <v-btn block flat color="teal" dark @click="onClickViewTransactions(item.ID)">View Transaction</v-btn>
                <v-btn v-if="$store.state.currentUser.Role == 'Document Staff'" block flat color="teal" dark>Print</v-btn>
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
      currentTab: "tab-1"
    };
  },
  methods: {
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
                this.$store.commit("showAlert",resp.message);
              }
          },
          error: function(err) {
            this.$store.commit("hidePreloader");
            this.$store.commit("showAlert", "An Error Occured On Server. Please try again later.");
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
            this.$swal("Error",response.message, "error");
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
            this.$swal("Error",response.message, "error");
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

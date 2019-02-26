<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Medicines</h3>
        </v-flex>        
        <v-flex lg12>
          <v-card>
            <v-speed-dial
              v-model="fab"
              right
              absolute
              direction="bottom"
              transition="slide-y-reverse-transition"
            >
              <v-btn
                slot="activator"
                color="pink"
                dark
                fab
                v-model="fab"
              >
                <v-icon>add</v-icon>
                <v-icon>close</v-icon>
              </v-btn>
                <v-tooltip :disabled="tooltipsDisabled" left :value="tooltips">
                  <v-btn fab dark small color="indigo" slot="activator" @click="onClickAddNewMedicine">
                    <v-icon>note_add</v-icon>
                  </v-btn>
                  <span>Add Medicine</span>
                </v-tooltip>  
                <v-tooltip :disabled="tooltipsDisabled" left :value="tooltips">
                  <v-btn fab dark small color="red" slot="activator" @click="onClickAddNewStock">
                    <v-icon>add_box</v-icon>
                  </v-btn>
                  <span>Add Stock</span>
                </v-tooltip>  
            </v-speed-dial>

            <v-dialog v-model="AddNewMedicineDialog" persistent max-width="900px">
              <v-card>
                <v-card-title>
                  <span class="headline">Add Medicine</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                  <v-container grid-list-md>
                    <v-form ref="newMedicineForm">
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field 
                          v-model="newMedicine.MedicineName" 
                          label="Medicine Name" 
                          :rules="[v => !!v || 'Medicine Name is required']"
                          required ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea
                          v-model="newMedicine.Description" 
                          label="Description"
                          hint="Description"
                          :rules="[v => !!v || 'Description is required']"
                        ></v-textarea>
                      </v-flex>
                    </v-layout>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="AddNewMedicineDialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click="CreateMedicine">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="AddNewStockDialog" persistent max-width="900px">
              <v-card>
                <v-card-title>
                  <span class="headline">Add Stock</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                  <v-container grid-list-md>
                    <v-form ref="newStockForm">
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-autocomplete
                          v-model="newStockMedicineID"
                          :items="newStocksMedicineNames"
                          item-text="MedicineName"
                          item-value="ID"
                          label="Medicine Name"
                          :rules="[v => !!v || 'Medicine is required']"
                        >
                        </v-autocomplete>
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea
                          v-model="newStockMedicineDescription" 
                          label="Description"
                          readonly
                        ></v-textarea>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          v-model="newStockQuantity"
                          label="Quantity" 
                          :rules="[
                            v => !!v || 'Quantity is required',
                            v => /^[1-9]\d*$/.test(v) || 'Positive Numbers Only'
                            ]"
                          required ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-dialog
                          ref="expirationDateDialog"
                          v-model="expirationDatePicker"
                          :return-value.sync="newStockExpirationDate"
                          persistent
                          lazy
                          full-width
                          width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            v-model="newStockExpirationDate"
                            label="Expiration Date"
                            prepend-icon="event"
                            :rules="[v => !!v || 'Expiration Date is required']"
                            readonly
                          ></v-text-field>
                          <v-date-picker 
                            v-model="newStockExpirationDate"
                            :min="MinDate"
                            scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="expirationDatePicker = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.expirationDateDialog.save(newStockExpirationDate)">OK</v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-flex>
                    </v-layout>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="AddNewStockDialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click="AddStock">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="ViewDetailedStockDialog" persistent max-width="900px">
              <v-card>
                <v-card-title>
                  <span class="headline">View Detailed Stock</span>
                </v-card-title>
                <v-toolbar card color="white">
                  <v-text-field
                  flat
                  solo
                  prepend-icon="search"
                  placeholder="Search Detailed Stocks"
                  v-model="searchDetailedStocks"
                  hide-details
                  class="hidden-sm-and-down"
                  ></v-text-field> 
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                  <v-data-table
                    :headers="detailedStocks.headers"
                    :search="searchDetailedStocks"
                    :items="detailedStocks.items"
                    :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                    class="elevation-1"
                    item-key="ID"
                    >
                    <template slot="items" slot-scope="props">     
                      <td>{{ props.item.MedicineName }}</td>
                      <td>{{ props.item.Description }}</td>
                      <td>{{ props.item.formattedExpirationDate }}</td>
                      <td>{{ props.item.formattedDateCreated }}</td>
                      <td>{{ props.item.Total }}</td>
                    </template>
                  </v-data-table>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="ViewDetailedStockDialog = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-toolbar card color="white">
              <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Search Stocks"
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
              ></v-text-field> 
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="stocks.headers"
                :search="search"
                :items="stocks.items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="ID"
                >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-tooltip right>
                      <template #activator="data">
                        <v-btn v-on="data.on" depressed outline icon fab dark color="primary" small @click="vieDetailedStock(props.item)">
                          <v-icon>assignment_late</v-icon>
                        </v-btn>
                      </template>
                      <span>View Detailed Stocks</span>
                    </v-tooltip>
                  </td>            
                  <td>{{ props.item.MedicineName }}</td>
                  <td>{{ props.item.Description }}</td>
                  <td>{{ props.item.Quantity }}</td>
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
  watch: {
    fab (val) {
      this.tooltips = false
      this.tooltipsDisabled = false
      val && setTimeout(() => {
        this.tooltips = true
        this.$nextTick(() => this.tooltipsDisabled = true)
      }, 250)
    },
    newStockMedicineID (newVal) {
      var found = this.newStocksMedicineNames.find(function(element) {
        return Number(element.ID) == Number(newVal);
      });
      if (typeof(found) != "undefined") {
        this.newStockMedicineDescription = found.Description;
      }
    }
  },
  data () {
    return {
      MinDate: "" + this.moment().add(1, 'days').format('YYYY-MM-DD'),
      expirationDateDialog: false,
      expirationDatePicker: false,
      AddNewStockDialog: false,
      AddNewMedicineDialog: false,
      ViewDetailedStockDialog: false,
      tooltips: false,
      tooltipsDisabled: false,
      fab: false,
      search: '',
      searchDetailedStocks: '',
      stocks: {
        headers: [
            { text: 'Action', value: '' },
            { text: 'Medicine Name', value: 'MedicineName' },
            { text: 'Description', value: 'Description' },
            { text: 'Quantity', value: 'Quantity' },
        ],
        items: []
      },
      detailedStocks: {
        headers: [
            { text: 'Medicine Name', value: 'MedicineName' },
            { text: 'Description', value: 'Description' },
            { text: 'Expiration Date', value: 'formattedExpirationDate' },
            { text: 'Date Added', value: 'formattedDateCreated' },
            { text: 'Stocks On Hand', value: 'Total' },
        ],
        items: []
      },
      newMedicine: {
        MedicineName: '',
        Description: ''
      },
      newStockMedicineDescription: '',
      newStockMedicineID: '',
      newStockExpirationDate: '',
      newStockQuantity: '',
      newStocksMedicineNames: []
    };
  },
  methods: {
    getMedicineStockList: function() {
      this.$store.commit("showPreloader");
      this.Endpoints.getStockList({
        success: (response) => {
          this.$store.commit("hidePreloader");
          if (response.data.status == 1) {
            //Add to array
            this.stocks.items = response.data.data;
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
    vieDetailedStock: function(thisItem) {
      var self = this;
      this.$store.commit("showPreloader");
      this.Endpoints.getMedicineStockList({
        data: thisItem.ID,
        success: (response) => {
          this.$store.commit("hidePreloader");
          if (response.data.status == 1) {
            //Add to array
            response.data.data.forEach(element => {
              element.formattedExpirationDate = self.moment(element.ExpirationDate).format('LL')
              element.formattedDateCreated = self.moment(element.DateCreated).format('LL')
            });
            this.detailedStocks.items = response.data.data;
            this.ViewDetailedStockDialog = true;
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
    onClickAddNewMedicine: function() {
      this.$refs.newMedicineForm.reset();
      this.AddNewMedicineDialog = true;
    },
    CreateMedicine: function() {
      if (this.$refs.newMedicineForm.validate()) { 
        var self = this;
        this.newMedicine.CreatedBy = this.$store.state.currentUser.ID;
        this.newMedicine.ModifiedBy = this.$store.state.currentUser.ID;
        this.$store.commit("showPreloader");
        this.Endpoints.addMedicine({
          data: this.newMedicine,
          success: (response) => {
            this.$store.commit("hidePreloader");
            if (response.data.status == 1) {
              this.$swal("Success","Successfully Added", "success").then((value) => {
                self.AddNewMedicineDialog = false;
                self.getMedicineStockList();
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
    onClickAddNewStock: function() {
      var self = this;
      this.$refs.newStockForm.reset()
      this.$store.commit("showPreloader");
      this.Endpoints.getMedicinesListDropdown({
        success: (resp) => {
          this.$store.commit("hidePreloader");
          if (resp.data.status == 1) {
            this.newStocksMedicineNames = resp.data.data;
            this.AddNewStockDialog = true;
          } else {
            this.$swal("Error",resp.message, "error");
          }
        },
        error: (err) => {
          this.$store.commit("hidePreloader");
          this.$swal("Error","An Error Occured On Server. Please try again later.", "error");
        }
      });
    },
    AddStock: function() {
      if (this.$refs.newStockForm.validate()) { 
        var self = this;
        let newStockObject = {
          CreatedBy: this.$store.state.currentUser.ID,
          ModifiedBy: this.$store.state.currentUser.ID,
          MedicineID: this.newStockMedicineID,
          ExpirationDate: this.newStockExpirationDate,
          Quantity: this.newStockQuantity
        };
        this.$store.commit("showPreloader");
        this.Endpoints.addStock({
          data: newStockObject,
          success: (response) => {
            this.$store.commit("hidePreloader");
            if (response.data.status == 1) {
              this.$swal("Success","Successfully Added", "success").then((value) => {
                self.AddNewStockDialog = false;
                self.getMedicineStockList();
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
    }
  },
  mounted() {
    this.getMedicineStockList();
  }
}
</script>
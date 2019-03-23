<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h1>Reports</h1>
        </v-flex>        
        <v-flex lg12>
          <v-card>
            <v-divider></v-divider>
            <v-card-text>
                <v-form ref="reportsForm">
                <v-layout row wrap>
                    <v-flex lg12>
                        <v-list-tile>
                            <v-list-tile-content>
                            <v-list-tile-title>Select Report</v-list-tile-title>
                            
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-flex>
                    <v-flex lg12>
                        <v-select
                        :items="values"
                        label="Report Type"
                        v-model="report"
                        item-text="name"
                        item-value="value"
                        :rules="[v => !!v || 'Report is Required']"
                        required
                        ></v-select>
                    </v-flex>

                </v-layout>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="info" @click="onClickDaily">Generate Daily</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info" @click="onClickMonthly">Generate Monthly</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info" @click="onClickYearly">Generate Yearly</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>  
      </v-layout>
    </v-container>
  </div>
</template>


<script>
const electron = require('electron');
export default {
    data() {
        return {
            values: [
                {name: "System Logs", value: "System Logs", selected: true},
                {name: "Dispense Report", value: "Dispense Report"},
                {name: "Certificate of Indigency Report", value: "Certificate of Indigency Report"},
                {name: "Barangay Clearance Report", value: "Barangay Clearance Report"},
                {name: "Business Clearance Report", value: "Business Clearance Report"},
            ],
            report: ""
        }
    },
    methods: {
        onClickDaily: function() {
            var startDate = this.moment().startOf('day').format(); // set to 12:00 am today
            var endDate = this.moment().endOf('day').format(); // set to 23:59 pm today
            let reportData = {
                ReportType: this.report,
                StartDate: startDate,
                EndDate: endDate
            }

            if (this.$refs.reportsForm.validate()) {
                this.$store.commit("showPreloader");
                var self = this;
                this.Endpoints.generateReports({
                    data: reportData,
                    success: (response) => {
                    this.$store.commit("hidePreloader");
                    if (response.data.status == 1) {
                        this.showReportPDF(response.data.data);
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
        },
        onClickMonthly: function() {
            var startDate = this.moment().startOf('month').format();
            var endDate = this.moment().endOf('month').format();
            let reportData = {
                ReportType: this.report,
                StartDate: startDate,
                EndDate: endDate
            }

            if (this.$refs.reportsForm.validate()) {
                this.$store.commit("showPreloader");
                var self = this;
                this.Endpoints.generateReports({
                    data: reportData,
                    success: (response) => {
                    this.$store.commit("hidePreloader");
                    if (response.data.status == 1) {
                        this.showReportPDF(response.data.data);
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
        },
        onClickYearly: function() {
            var startDate = this.moment().startOf('year').format();
            var endDate = this.moment().endOf('year').format();
            let reportData = {
                ReportType: this.report,
                StartDate: startDate,
                EndDate: endDate
            }


            if (this.$refs.reportsForm.validate()) {
                this.$store.commit("showPreloader");
                var self = this;
                this.Endpoints.generateReports({
                    data: reportData,
                    success: (response) => {
                    this.$store.commit("hidePreloader");
                    if (response.data.status == 1) {
                        this.showReportPDF(response.data.data);

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
        },
        showReportPDF(pdfUrl) {
            let pdfWindow = new electron.remote.BrowserWindow({
                width: 1200,
                height: 800,
                webPreferences: {
                    plugins: true
                }
            });
            pdfWindow.loadURL("http://localhost:6513/PDFS/Outputs/" + pdfUrl);

            pdfWindow.setMenu(null);

            pdfWindow.on("closed", function () {
                pdfWindow = null
            });
        }
    },
    computed: {
    },
    mounted() {
    }
}
</script>

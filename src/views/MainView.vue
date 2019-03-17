<template>
  <v-app id="inspire">
    <v-toolbar color="blue darken-3" dark fixed app clipped-right>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
       <!-- <v-btn icon @click.stop="">
        <v-icon>account_circle</v-icon>
      </v-btn> -->



      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon slot="activator">
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>




    </v-toolbar>
    <v-navigation-drawer v-model="drawer" fixed app>
    <!-- <v-toolbar color="blue darken-3" dark fixed app clipped-right></v-toolbar> -->

          <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="subheading">{{currentUserFullName}}</div>
            <div class="body-1">{{currentUserRole}}</div>
          </v-flex>
        </v-layout>
      </v-img>

      <v-list>
          <!-- <v-list-tile @click.stop="onClickLogout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile> -->
          


        <template v-for="item in drawerItems">
          <v-list-tile @click.stop="onClickDrawerItem(item.url)" :key="item.title">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </template>


      </v-list>
    </v-navigation-drawer>

    <v-content>
      <!-- <v-container fluid fill-height> -->
        <router-view></router-view>
      <!-- </v-container> -->
    </v-content>
    <!-- <BimsAlert ref="BimsAlert"></BimsAlert> -->
    <Preloader ref="Preloader"></Preloader>
  </v-app>
</template>

<script>
import BimsAlert from '../components/BimsAlert.vue'
import Preloader from '../components/Preloader.vue'


  export default {
    components: {
      'BimsAlert': BimsAlert,
      'Preloader': Preloader
    },
    data () { 
      return {
        drawer: false,
        width: 300,
        drawerItems: [
          // { icon: "insert_chart_outlined", title: "Dashboard", url: "/main/dashboard"},
          // { icon: "people", title: "Residents", url: "/main/residents"},
          // { icon: "person", title: "Users", url: "/main/users"},
          // { icon: "local_pharmacy", title: "Medicine Inventory", url: "/main/medicines"},
          // { icon: "local_grocery_store", title: "Residents Transaction", url: "/main/residenttransactions"},
          // { icon: "file_copy", title: "Business Owners", url: "/main/businessowners"},
          // { icon: "report_problem", title: "Blotter", url: "/main/blotters"},
          // { icon: "description", title: "Reports", url: "/main/reports"},
          // // { icon: "exit_to_app", title: "Logout"}
        ],
        items: [
          {
            icon: 'account_circle',
            href: '#',
            title: 'Profile',
            click: (e) => {
              console.log(e);
            }
          },
          {
            icon: 'fullscreen_exit',
            href: '#',
            title: 'Logout',
            click: (e) => {
              this.$store.commit("removeCurrentUser");
              this.$router.push("/");
            }
          }
        ]
      }
    },
    methods: {
      onClickLogout: function() {
        this.$router.push('/');
      },
      onClickDrawerItem: function(url) {
        this.$router.push(url);
      }
    },
    watch: {

      Preloader() {
        if (this.Preloader) {
          //Show Preloader
          this.$refs.Preloader.show("");
        } else {
          this.$refs.Preloader.hide();
        }
      },

      SuccessAlert() {
        if (this.SuccessAlert) {
          this.$refs.BimsAlert.open('Success', this.$store.state.successAlertMessage, { color: 'green' });
        }
      },
    },
    computed: {
      Alert: {
        get () { return this.$store.getters.alert }
      },
      Preloader: {
        get () { return this.$store.getters.preloader }
      },
      SuccessAlert: {
        get () { return this.$store.getters.successAlert }
      },

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
    beforeCreate() {
      //Handle Before Creation
      if (this.$store.state.currentUser == null) {
        //Logout
        this.$router.push("/");
      }
    },
    mounted() {

      // if (this.$store.state.currentUser.SecretQuestion1 == null) {
      //   this.drawerItems = [];
      // } else {

        if (this.$store.state.currentUser.Role == 'Administrator') {
          this.drawerItems= [
            { icon: "insert_chart_outlined", title: "Dashboard", url: "/main/dashboard"},
            { icon: "people", title: "Residents", url: "/main/residents"},
            { icon: "person", title: "Users", url: "/main/users"},
            { icon: "local_pharmacy", title: "Medicine Inventory", url: "/main/medicines"},
            { icon: "local_grocery_store", title: "Residents Transaction", url: "/main/residenttransactions"},
            { icon: "file_copy", title: "Business Owners", url: "/main/businessowners"},
            { icon: "file_copy", title: "Business Clearance", url: "/main/businessclearance"},
            { icon: "report_problem", title: "Blotter", url: "/main/blotters"},
            { icon: "description", title: "Reports", url: "/main/reports"}
          ];
        } 
        else if(this.$store.state.currentUser.Role == 'Document Staff') {
          this.drawerItems= [
            { icon: "insert_chart_outlined", title: "Dashboard", url: "/main/dashboard"},
            { icon: "people", title: "Residents", url: "/main/residents"},
            { icon: "local_grocery_store", title: "Residents Transaction", url: "/main/residenttransactions"},
            { icon: "file_copy", title: "Business Owners", url: "/main/businessowners"},
            { icon: "file_copy", title: "Business Clearance", url: "/main/businessclearance"},
            { icon: "report_problem", title: "Blotter", url: "/main/blotters"}
          ];
        } 
        else {
          this.drawerItems= [
            { icon: "insert_chart_outlined", title: "Dashboard", url: "/main/dashboard"},
            { icon: "people", title: "Residents", url: "/main/residents"},
            { icon: "local_pharmacy", title: "Medicine Inventory", url: "/main/medicines"},
            { icon: "local_grocery_store", title: "Residents Transaction", url: "/main/residenttransactions"}
          ];
        }
      // }
    }
  }
</script>
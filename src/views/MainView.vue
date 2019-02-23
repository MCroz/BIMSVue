<template>
  <v-app id="inspire">
    <v-toolbar color="blue darken-3" dark fixed app clipped-right>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" fixed app>
    <!-- <v-toolbar color="blue darken-3" dark fixed app clipped-right></v-toolbar> -->

          <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="subheading">Aljon Agsangre Alacapa</div>
            <div class="body-1">Administrator</div>
          </v-flex>
        </v-layout>
      </v-img>

      <v-list>
          <v-list-tile @click="onClickLogout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
          <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      width: 300,
      items: [
        { icon: 'inbox', title: 'Inbox', action: this.onClickLogout() },
        { icon: 'star', title: 'Starred', action: this.onClickLogout() }
      ]
    }),
    methods: {
      onClickLogout: function() {
        this.$router.push('/');
      }
    }
  }
</script>
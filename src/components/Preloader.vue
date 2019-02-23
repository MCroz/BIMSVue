<template>
  <div class="text-xs-center">
    <v-dialog
      dark
      v-model="dialog"
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          {{Message}}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      Message: null
    }),
    methods: {
      show(message) {
        this.dialog = true
        this.Message = message
      },
      hide () {
          this.dialog = false
      }
    }
  }
</script>

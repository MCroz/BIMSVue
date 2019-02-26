<template>
  <v-container fluid>
    <v-layout justify-space-around>
      <v-flex xs5>
        <!-- <div class="title mb-1">Image</div> -->
        <v-layout column>
          <div class="subheading">Image</div>
          <v-img v-bind:src="iImageSrc" aspect-ratio="3" contain></v-img>
            <v-btn
            :loading="loading"
            :disabled="loading"
            color="blue-grey"
            class="white--text"
            @click="$refs.file.click()"
            >
            Upload
            <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input ref="file" style="display: none;" type="file" @change="onFileChange">
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

<script>
import $ from 'jquery'

export default {
    props: {
      imageValue: {
        type: String,
        default: ""
      },
      imageSrc: {
        type: String,
        //default: this.$store.state.serverUrl + "Images/Blank.png"
        default: ""
      },
      absoluteUrl: {
        type: String,
        default: ""
      },
      uploadUrl: {
        type: String,
        default: ""
      }
    },
    data () {
      return {
        loader: null,
        loading: false,
        iImageValue: this.imageValue,
        iImageSrc: this.imageSrc
      }
    },
    methods:  {
        onFileChange: function(event) {
            this.loader = 'loading'
            var self = this;
            const l = this.loader
            this[l] = !this[l]

            if ($(event.currentTarget)[0].files.length) {
                //Has Value
                //var attachments = $(event.currentTarget);
                //var attachmentFiles = attachments[0].files;
                var file = $(event.currentTarget)[0].files[0];
                var thisSize = file.size / 1024 / 1024;
                if (thisSize > 20) {
                    self[l] = false
                    self.loader = null
                    this.$swal("Unable to upload image, image exceeds 20mb size");
                    return false;
                }
                var formData = new FormData();
                formData.append("myFile", file);
                console.log(formData);

                $.ajax({
                    url: self.uploadUrl,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    xhr: function () {  // custom xhr
                        var myXhr = $.ajaxSettings.xhr();
                        if (myXhr.upload) { // check if upload property exists
                            myXhr.upload.addEventListener('progress', function (evt) {
                                //console.log('updateProgress');
                                if (evt.lengthComputable) {
                                    var percentComplete = evt.loaded / evt.total;
                                    //Computer for Progress
                                } else {
                                    // Unable to compute progress information since the total size is unknown
                                    self.$swal("Error","Unable to Complete Upload.", error);
                                }
                            }, false); 
                        }
                        return myXhr;
                    },
                    success: function (res) {
                        self[l] = false;
                        self.loader = null;
                        if (res.status == 0) {
                          self.$swal("Error",res.message, "error");
                        } else {
                            //Set URL
                            self.iImageSrc = self.absoluteUrl + res.data;
                            self.iImageValue = res.data;
                            self.$emit('input', self.iImageValue);
                        }
                    }, 
                    error: function (jqXHR) {
                        self[l] = false;
                        self.loader = null;
                        self.$swal("Error","Unable to Complete Upload.", "error");
                    }
                });

            } else {
                //Removed
                self[l] = false;
                self.loader = null;
                self.iImageSrc = self.$store.state.serverUrl + "Images/Blank.png";
                self.iImageValue = "";
                self.$emit('input', self.iImageValue);
                // this.$emit('input', self.imageValue);
            }

            
            return false;
        }
    }
}
</script>

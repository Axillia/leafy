<template>
<v-row justify="center">
  <v-col
      cols="12"
      sm="10"
      md="8"
      lg="6"
  >
    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        color="red"
    >
      Oops! Something Went Wrong
      <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="overlay">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-card>
      <v-card-title>
        Submit your donation
      </v-card-title>
      <v-divider class="ma-4"></v-divider>
      <v-card-text>
        <form @submit.prevent="handleSubmit">
          <v-text-field
              label="Product Name"
              v-model="name"
              outlined
              dense
          ></v-text-field>
          <v-select
              label="Condition"
              v-model="condition"
              :items="conditions"
              item-text="name"
              item-value="id"
              dense
              outlined
          ></v-select>
          <v-textarea
              label="Description"
              v-model="description"
              auto-grow
              outlined
              rows="3"
              row-height="25"
          ></v-textarea>
          <v-select
              label="Location"
              v-model="location"
              :items="locations"
              item-text="name"
              item-value="id"
              dense
              outlined
          ></v-select>
          <v-uploader
              @done="uploadDone"
              button-text="Select product picture"
          >
          </v-uploader>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            depressed
            large
            color="primary"
            class="ma-4"
            @click="handleSubmit"
        >
          Post donation
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</v-row>
</template>

<script>
import axios from "axios";
import router from "@/router";
import _get from "lodash/get"

export default {
  name: "Post",
  data () {
    return {
      name: null,
      description: null,
      photo: null,
      condition: null,
      location: null,
      locations: [],
      conditions: [],
      snackbar: false,
      timeout: 3000,
      overlay: false,
    }
  },
  mounted() {
    this.loadLocations();
    this.loadConditions();
  },
  methods: {
    uploadDone(files){
      if(files && Array.isArray(files) && files.length){
        this.photo = files[0].url
      }
    },
    loadLocations(){
      axios
          .get(`${process.env.VUE_APP_BASE_URL}/location/all`)
          .then(response => (this.locations = response.data))
    },
    loadConditions(){
      axios
          .get(`${process.env.VUE_APP_BASE_URL}/condition/all`)
          .then(response => (this.conditions = response.data))
    },
    async handleSubmit(){
      this.overlay = true;
      await axios
          .post(`${process.env.VUE_APP_BASE_URL}/product`, {
            name: this.name,
            description: this.description,
            photo: this.photo === null ? undefined : this.photo,
            condition: this.condition,
            location: this.location
          }, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then( function (response) {
            router.push({name: 'Product', params: { id: _get(response, 'data.id', null) }});
          })
          .catch( (error) => {
            if (error.response.status === 401){
              localStorage.removeItem('accessToken')
              router.push('/login')
            }else {
              this.snackbar = true
            }
          });
      this.overlay = false;
    }
  }
}
</script>

<style scoped>

</style>
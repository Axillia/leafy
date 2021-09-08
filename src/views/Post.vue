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
      <validation-observer
          ref="observer"
          v-slot="{ invalid }"
      >
      <v-divider class="ma-4"></v-divider>
      <v-card-text>
          <v-form @submit.prevent="handleSubmit" ref="form">
            <validation-provider
                v-slot="{ errors }"
                name="product name"
                rules="required"
            >
              <v-text-field
                  label="Product Name"
                  v-model="name"
                  :error-messages="errors"
                  outlined
                  dense
              ></v-text-field>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="condition"
                rules="required"
            >
              <v-select
                  label="Condition"
                  v-model="condition"
                  :items="conditions"
                  item-text="name"
                  item-value="id"
                  :error-messages="errors"
                  dense
                  outlined
              ></v-select>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="description"
                rules="required"
            >
              <v-textarea
                  label="Description"
                  v-model="description"
                  :error-messages="errors"
                  auto-grow
                  outlined
                  rows="3"
                  row-height="25"
              ></v-textarea>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="location"
                rules="required"
            >
              <v-select
                  label="Location"
                  v-model="location"
                  :items="locations"
                  :error-messages="errors"
                  item-text="name"
                  item-value="id"
                  dense
                  outlined
              ></v-select>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="category"
                rules="required"
            >
            <v-select
                :items="categories"
                item-text="name"
                item-value="id"
                @change="loadSubCategories"
                label="Category"
                v-model="selectedCategory"
                :error-messages="errors"
                dense
                outlined
            ></v-select>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="sub category"
                rules="required"
            >
            <v-select
                :items="subCategories"
                item-text="name"
                item-value="id"
                label="Sub Category"
                v-model="category"
                :error-messages="errors"
                dense
                outlined
            ></v-select>
            </validation-provider>
            <FilePond
                name="filepond"
                ref="pond"
                :server="server"
                @processfile="onProcessFile"
            />
          </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            depressed
            large
            color="primary"
            class="ma-4"
            @click="handleSubmit"
            :disabled="invalid"
        >
          Post donation
        </v-btn>
      </v-card-actions>
      </validation-observer>
    </v-card>
  </v-col>
</v-row>
</template>

<script>
import axios from "axios";
import router from "@/router";
import _get from "lodash/get";
import vueFilePond, { setOptions } from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

const FilePond = vueFilePond(
    FilePondPluginImagePreview,
    FilePondPluginFileRename
);

setOptions({
  fileRenameFunction: (file) => {
    return `${Date.now()}${file.extension}`;
  },
});

export default {
  name: "Post",
  components: {
    FilePond
  },
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
      categories: [],
      subCategories: [],
      selectedCategory: null,
      category: null,
      server: `${process.env.VUE_APP_BASE_URL}/upload`,
    }
  },
  mounted() {
    this.loadLocations();
    this.loadConditions();
    this.loadCategories();
  },
  methods: {
    onProcessFile(error, file) {
      this.photo = `${process.env.VUE_APP_S3_URL}${file.filename}`
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
    loadCategories() {
      axios
          .get(`${process.env.VUE_APP_BASE_URL}/category`)
          .then(
              response => {
                this.categories = response.data
              }
          )
    },
    loadSubCategories() {
      axios
          .get(`${process.env.VUE_APP_BASE_URL}/category/${this.selectedCategory}`)
          .then(
              response => {
                this.subCategories = response.data
              }
          )
    },
    async handleSubmit(){
      if (this.$refs.form.validate()){
        this.overlay = true;
        await axios
            .post(`${process.env.VUE_APP_BASE_URL}/product`, {
              name: this.name,
              description: this.description,
              photo: this.photo === null ? undefined : this.photo,
              condition: this.condition,
              location: this.location,
              category: this.category
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
}
</script>

<style scoped>

</style>
<template>
  <v-container class="pb-10">
    <v-row dense>
      <v-col cols="12">
        <v-overlay :value="overlay">
          <v-progress-circular
              indeterminate
              size="64"
          ></v-progress-circular>
        </v-overlay>
        <v-layout wrap>
          <v-flex xs12 sm12 md3 class="pa-md-5">
            <v-select
                :items="locations"
                item-text="name"
                item-value="id"
                label="Location"
                v-model="location"
                outlined
            ></v-select>
          </v-flex>
          <v-flex xs12 sm12 md3 class="pa-md-5">
            <v-select
                :items="categories"
                item-text="name"
                item-value="id"
                @change="loadSubCategories"
                label="Category"
                v-model="selectedCategory"
                outlined
            ></v-select>
          </v-flex>
          <v-flex xs12 sm12 md3 class="pa-md-5">
            <v-select
                :items="subCategories"
                item-text="name"
                item-value="id"
                label="Sub Category"
                v-model="category"
                outlined
            ></v-select>
          </v-flex>
          <v-flex xs12 sm12 md3 class="pa-md-5">
            <v-btn
                depressed
                color="primary"
                x-large
                block
                @click="loadProduct"
            >
              <v-icon left>
                mdi-magnify
              </v-icon>
              Search
            </v-btn>
          </v-flex>
        </v-layout>
      </v-col>
      <v-col
          cols="12"
          v-for="(product, i) in listing"
          :key="i"
      >
        <v-card
            class="clickable"
            @click="$router.push({name: 'Product', params: { id: _get(product, 'id', null) }})"
        >
          <div class="d-flex flex-no-wrap">
            <v-avatar
                class="ma-3"
                size="125"
                tile
            >
              <v-img :src="_get(product, 'photo', null)"></v-img>
            </v-avatar>
            <div>
              <v-card-text>
                <p class="text-h6 text--primary ml-1">{{_get(product, 'name', null)}}</p>
                <p>
                  <span class="mr-8"><v-icon>mdi-map-marker</v-icon>{{_get(product, 'location.name', null)}}</span>
                  <span class="mr-8 d-none d-md-inline-flex">{{moment(_get(product, 'posted_date', null)).format('MMM Do YYYY')}}</span>
                  <span>Views: {{_get(product, 'view_count', null)}}</span>
                </p>
                <div class="text--primary">
                  <v-chip
                      class="ma-2"
                      :color="_get(product, 'condition.label_color', null)"
                      text-color="white"
                      label
                  >
                    <v-icon left>
                      {{_get(product, 'condition.label_icon', null)}}
                    </v-icon>
                    {{_get(product, 'condition.name', null)}}
                  </v-chip>
                </div>
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col class="pt-10">
        <div class="text-center">
          <v-pagination
              v-model="page"
              :length="length"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              @input="loadProduct"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import _get from "lodash/get"
import moment from "moment";

export default {
  name: "Listings",
  methods: {
    _get,
    moment,
    loadProduct() {
      this.overlay = true;
      let filters = '';

      if (this.location) {
        filters = filters + `&location=${this.location}`
      }

      if (this.category) {
        filters = filters + `&category=${this.category}`
      }
      axios
          .get(`${process.env.VUE_APP_BASE_URL}/product/all?page=${this.page}&limit=10${filters}`)
          .then(
              response => {
                this.listing = response.data.data
                this.length = response.data.totalPages
                this.overlay = false;
              }
          )
    },
    loadLocations() {
      axios
          .get(`${process.env.VUE_APP_BASE_URL}/location/all`)
          .then(
              response => {
                this.locations = response.data
              }
          )
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
    }
  },
  data(){
    return {
      overlay: false,
      listing: [],
      page: 1,
      length: 1,
      locations: [],
      categories: [],
      subCategories: [],
      selectedCategory: null,
      location: null,
      category: null
    }
  },
  mounted() {
    this.loadProduct();
    this.loadLocations();
    this.loadCategories();
  }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
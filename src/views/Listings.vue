<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card>
          <v-toolbar
              dark
              color="primary"
          >
            <v-toolbar-title>I want to find</v-toolbar-title>
            <v-autocomplete
                cache-items
                class="mx-4"
                flat
                hide-no-data
                hide-details
                label="What are you looking for?"
                solo-inverted
            ></v-autocomplete>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
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
                <p class="text-h6 text--primary">{{_get(product, 'name', null)}}</p>
                <p><v-icon>mdi-map-marker</v-icon>{{_get(product, 'location.name', null)}}</p>
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
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import _get from "lodash/get"

export default {
  name: "Listings",
  methods: {
    _get
  },
  data(){
    return {
      listing: []
    }
  },
  mounted() {
    axios
    .get(`${process.env.VUE_APP_BASE_URL}/product/all`)
    .then(response => (this.listing = response.data))
  }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
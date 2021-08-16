<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md9>
        <v-overlay :value="overlay">
          <v-progress-circular
              indeterminate
              size="64"
          ></v-progress-circular>
        </v-overlay>
        <v-card
            class="pa-2"
            flat
        >
          <v-flex class="text-h5">{{_get(product, 'name', null)}}</v-flex>
          <v-flex class="text-subtitle-1 grey--text">Posted on {{moment(_get(product, 'posted_date', null)).format('MMM Do YYYY, h:mm a')}}, {{_get(product, 'location.name', null)}}</v-flex>
          <v-img
              :src="_get(product, 'photo', null)"
              width="500"
          ></v-img>
          <v-flex class="text-h6 pt-5">Description</v-flex>
          <v-flex class="text-body-1 grey--text pt-5">{{_get(product, 'description', null)}}</v-flex>
        </v-card>
      </v-flex>
      <v-flex xs12 md3>
        <v-card
            flat
            outlined
            class="text-center"
        >
          <v-responsive class="pt-4">
            <v-avatar size="100">
              <v-img :src="_get(product, 'user.avatar', null)"></v-img>
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <div class="text-h5">{{_get(product, 'user.f_name', null)}} {{_get(product, 'user.l_name', null)}}</div>
            <v-chip
                class="ma-2"
                color="amber darken-2"
                outlined
            >
              <v-icon left>mdi-star-circle</v-icon>
              MEMBER
            </v-chip>
            <div class="gray--text">Member since {{moment(_get(product, 'user.membership_date', null)).format('MMM Do YYYY')}}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn
                text
                color="primary">
              <v-icon small left>mdi-android-messages</v-icon>
              <span>Message</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import _get from "lodash/get";
import moment from 'moment';

export default {
  name: "Product",
  methods: {
    _get,
    moment
  },
  data(){
    return {
      overlay: false,
      product: null
    }
  },
  mounted() {
    this.overlay = true;
    axios
        .get(`${process.env.VUE_APP_BASE_URL}/product/${this.$route.params.id}`)
        .then(
            response => {
              this.product = response.data;
              this.overlay = false;
            }
        )
  }
}
</script>

<style scoped>

</style>
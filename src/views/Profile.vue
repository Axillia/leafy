<template>
<v-container>
  <v-layout row wrap>
    <v-flex xs12 md3>
      <v-card
          flat
          outlined
          class="text-center mt-12"
      >
        <v-responsive class="pt-4">
          <v-avatar size="100">
            <v-img :src="_get(profile, 'avatar', null)"></v-img>
          </v-avatar>
        </v-responsive>
        <v-card-text>
          <div class="text-h5">{{_get(profile, 'f_name', null)}} {{_get(profile, 'l_name', null)}}</div>
          <v-chip
              class="ma-2"
              color="amber darken-2"
              outlined
          >
            <v-icon left>mdi-star-circle</v-icon>
            MEMBER
          </v-chip>
          <div class="gray--text">Member since {{moment(_get(profile, 'membership_date', null)).format('MMM Do YYYY')}}</div>
          <div class="py-8">
            <v-divider></v-divider>
          </div>
          <div class="gray--text">{{_get(profile, 'bio', null)}}</div>
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
    <v-flex xs12 md9 sm12>
      <v-card
          flat
          class="mt-6 ml-16"
      >
        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2 text-h4">
            Contribution Activity
          </div>

          <v-timeline
              align-top
              dense
          >
            <v-timeline-item
                icon="mdi-wallet-giftcard"
                fill-dot
                large
                color="grey"
            >
              <div>
                <div class="font-weight-normal">
                  <strong>LG V20 [CRACKED]</strong> to Ruchini Thathsarani
                </div>
                <div>February 2021</div>
              </div>
            </v-timeline-item>
            <v-timeline-item
                icon="mdi-wallet-giftcard"
                fill-dot
                large
                color="grey"
            >
              <div>
                <div class="font-weight-normal">
                  <strong>A/L ICT MCQ - S. Withanage</strong> to Ruchini Thathsarani
                </div>
                <div>March 2021</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import axios from "axios";
import _get from "lodash/get";
import moment from "moment";
import router from "@/router";

export default {
  name: "Profile",
  data(){
    return {
      profile: null
    }
  },
  methods: {
    _get,
    moment
  },
  mounted() {
    axios
        .get(`${process.env.VUE_APP_BASE_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        .then(response => (this.profile = response.data))
        .catch((error) => {
          if (error.response.status === 401){
            localStorage.removeItem('accessToken')
            router.push('/login')
          }
        })
  }
}
</script>

<style scoped>

</style>
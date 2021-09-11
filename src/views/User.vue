<template>
<v-container>
  <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="snackbar_clr"
  >
    {{snackbar_msg}}
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
              :color="_get(badge, '[1]', null)"
              outlined
          >
            <v-icon left>{{_get(badge, '[2]', null)}}</v-icon>
            {{_get(badge, '[0]', null)}}
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
import Vue from "vue";

Vue.prototype.$getBadge = (points) => {
  const badges = [
    ["STARTER", "grey darken-3", "mdi-account-check"],
    ["NOVICE", "amber darken-3", "mdi-check-circle-outline"],
    ["AMATEUR", "orange darken-4", "mdi-shield-check"],
    ["EXPLORE", "green darken-3", "mdi-star-half-full"],
    ["ELITE", "blue darken-4", "mdi-star"],
    ["MASTER", "deep-purple darken-4", "mdi-star-circle"],
    ["LEGEND", "purple darken-3", "star-face"],
    ["DEMIGOD", "red darken-4", "mdi-license"]
  ]

  if (points >= 45000) return badges[7]
  else if (points >= 25000) return badges[6]
  else if (points >= 10000) return badges[5]
  else if (points >= 5000) return badges[4]
  else if (points >= 1500) return badges[3]
  else if (points >= 500) return badges[2]
  else if (points >= 100) return badges[1]
  else return badges[0]
}

export default {
  name: "Profile",
  data(){
    return {
      tab: null,
      profile: null,
      q_headers: [
        { text: 'Product Name', value: 'product.name', sortable: false },
        { text: 'Question', value: 'question', sortable: false },
        { text: 'Asked by', value: 'user.f_name', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      sent_headers: [
        { text: 'Product Name', value: 'product.name', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      received_headers: [
        { text: 'Product Name', value: 'product.name', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      questions: [],
      answer: null,
      dialog: false,
      editedIndex: -1,
      snackbar: false,
      snackbar_msg: null,
      snackbar_clr: null,
      timeout: 3000,
      overlay: false,
      sent: [],
      received: [],
      badge: {},
    }
  },
  methods: {
    _get,
    moment,
    loadProfile() {
      axios
          .get(`${process.env.VUE_APP_BASE_URL}/user/${this.$route.params.id}`)
          .then(response => {
              this.profile = response.data;
              this.badge = this.$getBadge(response.data.points);
            }
          )
          .catch((error) => {
            if (error.response.status === 401){
              localStorage.removeItem('accessToken')
              router.push('/login')
            }
          })
    },
  },
  mounted() {
    this.loadProfile();
  }
}
</script>

<style scoped>

</style>
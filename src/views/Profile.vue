<template>
<v-container class="pb-10">
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
    <v-flex class="pt-5">
      <v-card flat>
        <v-tabs v-model="tab">
          <v-tab href="#leaderboard">Leaderboard</v-tab>
          <v-tab href="#question">Questions</v-tab>
          <v-tab href="#received">Invitations (Received)</v-tab>
          <v-tab href="#sent">Invitations (Sent)</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item value="leaderboard">
            <v-card flat>
              <v-data-table
                  :headers="leaderboard_headers"
                  :items="leaderboard"
                  :hide-default-footer="true"
              >
              </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item value="question">
            <v-card flat>
              <v-data-table
                  :headers="q_headers"
                  :items="questions"
                  :hide-default-footer="true"
              >
                <template v-slot:top>
                <v-dialog
                    v-model="dialog"
                    max-width="500px"
                >
                  <v-card>
                    <v-form @submit.prevent="save">
                    <v-card-title>
                      <span class="text-h5">Add Answer</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                              cols="12"
                          >

                              <v-text-field
                                  v-model="answer"
                                  label="Your Answer"
                              ></v-text-field>

                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="blue darken-1"
                          text
                          @click="close"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                          color="blue darken-1"
                          text
                          @click="save"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon
                      small
                      class="mr-2"
                      @click="editItem(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                      small
                      @click="deleteItem(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item value="sent">
            <v-card flat>
              <v-data-table
                  :headers="sent_headers"
                  :items="sent"
                  :hide-default-footer="true"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon
                      small
                      @click="deleteItem(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item value="received">
            <v-card flat>
              <v-data-table
                  :headers="received_headers"
                  :items="received"
                  :hide-default-footer="true"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon
                      small
                      class="mr-2"
                  >
                    mdi-check-circle
                  </v-icon>
                  <v-icon
                      small
                      @click="deleteItem(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
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
      leaderboard_headers: [
        { text: 'Rank', value: 'id', sortable: false },
        { text: 'Name', value: 'name', sortable: false },
        { text: 'Points', value: 'points', sortable: false },
      ],
      leaderboard: [
        {id: 1, name: 'Ruchini Thathsarani', points: 15000},
        {id: 2, name: 'Pamudi Geethma', points: 4500},
        {id: 3, name: 'Sithmi Vivanya', points: 4100},
        {id: 4, name: 'Kushan Shamika', points: 3240},
        {id: 5, name: 'Chasindu Kumarasiri', points: 500}
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
          .get(`${process.env.VUE_APP_BASE_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
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
    loadQuestions() {
      axios
          .get(`${process.env.VUE_APP_BASE_URL}/comment/user`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then(response => (this.questions = response.data))
    },
    loadSentInvitations() {
      axios
          .get(`${process.env.VUE_APP_BASE_URL}/request`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then(response => (this.sent = response.data))
    },
    loadReceivedInvitations() {
      axios
          .get(`${process.env.VUE_APP_BASE_URL}/request/product`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then(response => (this.received = response.data))
    },
    editItem (item) {
      this.editedIndex = this.questions.indexOf(item)
      this.dialog = true
    },
    deleteItem () {

    },
    async save () {
      this.overlay = true;
      await axios
          .put(`${process.env.VUE_APP_BASE_URL}/comment/${this.questions[this.editedIndex].id}`, {
            answer: this.answer,
          }, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then(  () => {
            this.snackbar_msg = "Successfully submitted answer"
            this.snackbar_clr = "success"
            this.snackbar = true
            this.loadQuestions();
          })
          .catch( (error) => {
            if (error.response.status === 401){
              localStorage.removeItem('accessToken')
              router.push('/login')
            }else {
              this.snackbar_msg = "Oops! Something Went Wrong"
              this.snackbar_clr = "red"
              this.snackbar = true
            }
          });
      this.dialog = false;
      this.overlay = false;
    },
    close () {
      this.dialog = false
    }
  },
  mounted() {
    this.loadProfile();
    this.loadQuestions();
    this.loadSentInvitations();
    this.loadReceivedInvitations();
  }
}
</script>

<style scoped>

</style>
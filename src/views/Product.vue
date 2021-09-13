<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md9>
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
        <v-card
            class="pa-2"
            flat
        >
          <v-flex class="text-h5">{{_get(product, 'name', null)}}</v-flex>
          <v-flex class="text-subtitle-1 grey--text">Posted on {{moment(_get(product, 'posted_date', null)).format('MMM Do YYYY, h:mm a')}}, {{_get(product, 'location.name', null)}}</v-flex>
          <v-flex class="text-right mr-lg-8">
            <share-facebook
                title_social="Facebook"
                has_icon
            ></share-facebook>
            <share-twitter
                title_social="Twitter"
                has_icon
            ></share-twitter>
            <share-whatsapp
                title_social="WhatsApp"
                has_icon
            ></share-whatsapp>
          </v-flex>
          <v-img
              class="mt-5"
              :src="_get(product, 'photo', null)"
              width="400"
          ></v-img>
          <v-flex class="text-h6 pt-5">Description</v-flex>
          <v-flex class="text-body-1 grey--text pt-5">{{_get(product, 'description', null)}}</v-flex>
          <v-flex class="pt-5">
            <v-btn
                class="mx-2"
                depressed
                color="primary"
                @click="requestSubmit"
            >
              Request this item
            </v-btn>
            <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    text
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon left>
                    mdi-close-circle-outline
                  </v-icon>
                  Report this item
                </v-btn>
              </template>
              <v-card>
                <v-form
                    @submit.prevent="reportSubmit"
                >
                  <v-card-title>
                    <span class="text-h5">Is there something wrong with this post?</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                            cols="12"
                        >
                          <v-select
                              :items="reasons"
                              label="Reason*"
                              v-model="report_reason"
                              required
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                              label="Message"
                              v-model="report_message"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="reportSubmit"
                    >
                      Send
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-flex>
          <v-flex class="text-h6 pt-5">Questions</v-flex>
          <v-form
              @submit.prevent="handleSubmit"
          >
              <v-textarea
                  clearable
                  clear-icon="mdi-close-circle"
                  label="Enter your question(s) here"
                  rows="1"
                  row-height="15"
                  v-model="question"
              ></v-textarea>
              <v-flex class="float-right">
                <v-btn
                    depressed
                    color="primary"
                    @click="handleSubmit"
                >
                  Ask Questions
                </v-btn>
              </v-flex>
          </v-form>
          <v-list three-line>
            <template v-for="(item, index) in comments">
              <v-list-item
                  :key="_get(item, 'id', null)"
              >
                <v-list-item-avatar>
                  <v-img :src="_get(item, 'user.avatar', null)"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title><span class="grey--text text--lighten-1">{{_get(item, 'user.f_name', null)}} - </span>{{_get(item, 'question', null)}}</v-list-item-title>
                  <v-list-item-subtitle><span class="text--primary">{{_get(item, 'answer', null)}}</span></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                  :key="index"
              ></v-divider>
            </template>
          </v-list>
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
                :color="_get(badge, '[1]', null)"
                outlined
            >
              <v-icon left>{{_get(badge, '[2]', null)}}</v-icon>
              {{_get(badge, '[0]', null)}}
            </v-chip>
            <div class="gray--text">Member since {{moment(_get(product, 'user.membership_date', null)).format('MMM Do YYYY')}}</div>
          </v-card-text>
          <v-card-actions
              class="justify-center"
          >
            <v-btn
                :href="mailto"
                color="primary"
                outlined
            >
              <span>Message</span>
            </v-btn>
            <v-btn
                :to="{ name: 'User', params: { id: _get(product, 'user.id', null) }}"
                color="primary"
            >
              <span>Profile</span>
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
import ShareFacebook from "vue-goodshare/src/providers/Facebook";
import ShareTwitter from "vue-goodshare/src/providers/Twitter";
import ShareWhatsapp from "vue-goodshare/src/providers/WhatsApp";
import router from "@/router";


export default {
  name: "Product",
  components: {
    ShareFacebook,
    ShareTwitter,
    ShareWhatsapp
  },
  methods: {
    _get,
    moment,
    async handleSubmit(){
      this.overlay = true;
      await axios
          .post(`${process.env.VUE_APP_BASE_URL}/comment`, {
            product: this.$route.params.id,
            question: this.question
          }, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then( () => {
            this.snackbar_msg = "Question has sent to donator"
            this.snackbar_clr = "success"
            this.snackbar = true
            this.question = ""
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
      this.overlay = false;
    },
    async reportSubmit(){
      this.overlay = true;
      await axios
          .post(`${process.env.VUE_APP_BASE_URL}/report`, {
            product: this.$route.params.id,
            reason: this.report_reason,
            message: this.report_message
          }, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then( () => {
            this.snackbar_msg = "Successfully report the post"
            this.snackbar_clr = "success"
            this.snackbar = true
            this.question = ""
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
    async requestSubmit(){
      this.overlay = true;
      await axios
          .post(`${process.env.VUE_APP_BASE_URL}/request`, {
            product: this.$route.params.id,
            status: 'PENDING'
          }, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then( () => {
            this.snackbar_msg = "You have successfully requested this product"
            this.snackbar_clr = "success"
            this.snackbar = true
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
      this.overlay = false;
    },
  },
  data(){
    return {
      question: null,
      overlay: false,
      product: null,
      snackbar: false,
      snackbar_msg: null,
      snackbar_clr: null,
      timeout: 3000,
      comments: [],
      dialog: false,
      reasons: [
          'Item Unavailable',
          'Fraud',
          'Duplicate',
          'Spam',
          'Offensive',
          'Other'
      ],
      report_reason: null,
      report_message: null,
      mailto: null,
      badge: {},
    }
  },
  mounted() {
    this.overlay = true;
    axios
        .get(`${process.env.VUE_APP_BASE_URL}/product/${this.$route.params.id}`)
        .then(
            response => {
              this.product = response.data;
              this.mailto = `mailto:${_get(this.product, 'user.email', null)}?subject=🍀 LEAFY:`;
              this.badge = this.$getBadge(_get(this.product, 'user.points', null));
              this.overlay = false;
            }
        )
    axios
      .get(`${process.env.VUE_APP_BASE_URL}/comment/${this.$route.params.id}`)
      .then(
          response => {
            this.comments = response.data;
          }
      )
  }
}
</script>

<style scoped>

</style>
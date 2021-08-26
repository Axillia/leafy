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
              width="500"
          ></v-img>
          <v-flex class="text-h6 pt-5">Description</v-flex>
          <v-flex class="text-body-1 grey--text pt-5">{{_get(product, 'description', null)}}</v-flex>
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
    }
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
      comments: []
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
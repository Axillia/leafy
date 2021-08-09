<template>
<v-container>
  <v-layout row wrap>
    <v-flex xs12 md7>
      <v-img
          :src="require('@/assets/register.jpg')"
      ></v-img>
    </v-flex>
    <v-flex xs12 md5>
      <v-container fill-height>
        <v-layout align-center justify-center row>
          <v-flex class="text-h3 text-center" xs12 sm12 md12>Welcome to Family</v-flex>
          <v-flex xs12 sm12 md12>
            <v-row
                class="ma-2"
            >
              <v-col
                  cols="12"
              >
                <v-snackbar
                    v-model="snackbar"
                    :timeout="timeout"
                    color="red"
                >
                  Invalid Username or Password

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
                <v-stepper v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step
                        :complete="e1 > 1"
                        step="1"
                    >
                      Account
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                        :complete="e1 > 2"
                        step="2"
                    >
                      Personal
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">
                      Image
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <form @submit.prevent="handleSubmit">
                      <v-stepper-content step="1">
                        <v-card
                            class="mb-12"
                            flat
                        >
                          <v-text-field
                              label="Email Address"
                              v-model="email"
                              prepend-inner-icon="mdi-email"
                              outlined
                          ></v-text-field>
                          <v-text-field
                              label="Phone Number"
                              v-model="phone"
                              prepend-inner-icon="mdi-phone"
                              outlined
                          ></v-text-field>
                          <v-text-field
                              label="Password"
                              v-model="password"
                              type="password"
                              prepend-inner-icon="mdi-lock"
                              outlined
                          ></v-text-field>

                          <v-text-field
                              label="Confirm Password"
                              type="password"
                              prepend-inner-icon="mdi-lock"
                              outlined
                          ></v-text-field>
                        </v-card>

                        <v-btn
                            color="primary"
                            @click="e1 = 2"
                        >
                          Continue
                        </v-btn>

                      </v-stepper-content>

                      <v-stepper-content step="2">
                        <v-card
                            class="mb-12"
                            flat
                        >
                          <v-text-field
                              label="First Name"
                              v-model="f_name"
                              prepend-inner-icon="mdi-account"
                              outlined
                          ></v-text-field>
                          <v-text-field
                              label="Last Name"
                              v-model="l_name"
                              prepend-inner-icon="mdi-account"
                              outlined
                          ></v-text-field>
                          <v-select
                              label="Location"
                              v-model="location_id"
                              :items="locations"
                              item-text="name"
                              item-value="id"
                              outlined
                          ></v-select>
                          <v-textarea
                              label="Bio"
                              v-model="bio"
                              auto-grow
                              outlined
                              rows="1"
                              row-height="15"
                          ></v-textarea>
                        </v-card>

                        <v-btn
                            color="primary"
                            @click="e1 = 3"
                        >
                          Continue
                        </v-btn>

                      </v-stepper-content>

                      <v-stepper-content step="3">
                        <v-card
                            class="mb-12 text-center"
                            flat
                        >
                          <v-uploader
                              @done="uploadDone"
                              button-text="Select profile picture"
                          >
                          </v-uploader>
                        </v-card>

                        <v-btn
                            color="primary"
                            @click="handleSubmit"
                        >
                          Finish
                        </v-btn>
                      </v-stepper-content>
                    </form>
                  </v-stepper-items>
                </v-stepper>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "Register",
  data () {
    return {
      e1: 1,
      email: null,
      phone: null,
      password: null,
      f_name: null,
      l_name: null,
      location_id: null,
      bio: null,
      avatar: null,
      locations: [],
      snackbar: false,
      timeout: 3000,
      overlay: false,
    }
  },
  mounted() {
    this.loadLocations();
  },
  methods: {
    uploadDone(files){
      if(files && Array.isArray(files) && files.length){
        this.avatar = files.url
      }
    },
    loadLocations(){
      axios
          .get(`${process.env.VUE_APP_BASE_URL}/location/all`)
          .then(response => (this.locations = response.data))
    },
    async handleSubmit(){
      this.overlay = true;
      await axios
          .post(`${process.env.VUE_APP_BASE_URL}/user`, {
            email: this.email,
            phone: this.phone,
            password: this.password,
            f_name: this.f_name,
            l_name: this.l_name,
            location_id: this.location_id,
            avatar: this.avatar,
          })
          .then( function () {
            router.push('login');
          })
          .catch( () => (
              this.snackbar = true
          ));
      this.overlay = false;
    }
  }
}
</script>

<style scoped>

</style>
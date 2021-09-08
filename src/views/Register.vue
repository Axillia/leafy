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
                        <validation-observer
                            ref="observer"
                            v-slot="{ invalid }"
                        >
                        <v-card
                            class="mb-12"
                            flat
                        >
                          <validation-provider
                              v-slot="{ errors }"
                              name="email"
                              rules="required|email"
                          >
                            <v-text-field
                                label="Email Address"
                                v-model="email"
                                type="email"
                                :error-messages="errors"
                                prepend-inner-icon="mdi-email"
                                outlined
                            ></v-text-field>
                          </validation-provider>
                          <validation-provider
                              v-slot="{ errors }"
                              name="phone number"
                              :rules="{ required: true, regex: /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/  }"
                          >
                            <v-text-field
                                label="Phone Number"
                                v-model="phone"
                                prepend-inner-icon="mdi-phone"
                                :error-messages="errors"
                                outlined
                            ></v-text-field>
                          </validation-provider>
                          <validation-provider
                              v-slot="{ errors }"
                              name="password"
                              :rules="{ required: true, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/  }"
                          >
                          <v-text-field
                              label="Password"
                              v-model="password"
                              prepend-inner-icon="mdi-lock"
                              outlined
                              :error-messages="errors"
                              ref="password"
                              :append-icon="pw_visibility ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="pw_visibility ? 'text' : 'password'"
                              @click:append="pw_visibility = !pw_visibility"
                          ></v-text-field>
                          </validation-provider>
                          <validation-provider
                              v-slot="{ errors }"
                              name="confirm password"
                              rules="required|confirmed:password"
                          >
                            <v-text-field
                                label="Confirm Password"
                                v-model="re_password"
                                :error-messages="errors"
                                prepend-inner-icon="mdi-lock"
                                type="password"
                                outlined
                            ></v-text-field>
                          </validation-provider>
                        </v-card>

                        <v-btn
                            color="primary"
                            @click="e1 = 2"
                            :disabled="invalid"
                        >
                          Continue
                        </v-btn>
                        </validation-observer>
                      </v-stepper-content>

                      <v-stepper-content step="2">
                        <validation-observer
                            ref="observer"
                            v-slot="{ invalid }"
                        >
                        <v-card
                            class="mb-12"
                            flat
                        >
                          <validation-provider
                              v-slot="{ errors }"
                              name="first name"
                              rules="required"
                          >
                            <v-text-field
                                label="First Name"
                                :error-messages="errors"
                                v-model="f_name"
                                prepend-inner-icon="mdi-account"
                                outlined
                            ></v-text-field>
                          </validation-provider>
                          <validation-provider
                              v-slot="{ errors }"
                              name="last name"
                              rules="required"
                          >
                            <v-text-field
                                label="Last Name"
                                v-model="l_name"
                                :error-messages="errors"
                                prepend-inner-icon="mdi-account"
                                outlined
                            ></v-text-field>
                          </validation-provider>
                          <validation-provider
                              v-slot="{ errors }"
                              name="location"
                              rules="required"
                          >
                            <v-select
                                label="Location"
                                :error-messages="errors"
                                v-model="location_id"
                                :items="locations"
                                item-text="name"
                                item-value="id"
                                outlined
                            ></v-select>
                          </validation-provider>
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
                            :disabled="invalid"
                        >
                          Continue
                        </v-btn>
                        </validation-observer>

                      </v-stepper-content>

                      <v-stepper-content step="3">
                        <v-card
                            class="mb-12 text-center"
                            flat
                        >
                          <FilePond
                              name="filepond"
                              ref="pond"
                              :server="server"
                              @processfile="onProcessFile"
                          />
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
  name: "Register",
  components: {
    FilePond
  },
  data () {
    return {
      pw_visibility: false,
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
      loader: false,
      re_password: null,
      server: `${process.env.VUE_APP_BASE_URL}/upload`,
    }
  },
  mounted() {
    this.loadLocations();
  },
  methods: {
    onProcessFile(error, file) {
      this.avatar = `${process.env.VUE_APP_S3_URL}${file.filename}`
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
            avatar: this.avatar === null ? undefined : this.avatar,
            bio: this.bio,
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
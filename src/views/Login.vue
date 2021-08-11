<template>
<v-container>
  <v-layout row wrap>
    <v-flex xs12 md8>
      <v-img
          :src="require('@/assets/login.jpg')"
      ></v-img>
    </v-flex>
    <v-flex xs12 md4>
      <v-container fill-height>
        <v-layout align-center justify-center row>
          <v-flex class="text-h3 text-center" xs12 sm12 md12>Welcome Back :)</v-flex>
          <v-flex xs12 sm12 md12>
            <v-row
                class="ma-2"
            >
              <v-col
                  cols="12"
              >
                <form @submit.prevent="handleSubmit">
                  <v-text-field
                      label="Email Address"
                      prepend-inner-icon="mdi-email"
                      v-model="email"
                      type="email"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      label="Password"
                      prepend-inner-icon="mdi-lock"
                      v-model="password"
                      outlined
                      type="password"
                  ></v-text-field>
                  <v-btn text>
                    Forget Password?
                  </v-btn>
                </form>
              </v-col>
            </v-row>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-row
                class="ma-2"
            >
              <v-col>
                <v-btn
                    class="mr-2"
                    depressed
                    large
                    color="primary"
                    @click="handleSubmit"
                >
                  Login Now
                </v-btn>
                <v-btn
                    class="ml-2"
                    depressed
                    large
                    :to="'/register'"
                >
                  Create Account
                </v-btn>
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
  name: "Login",
  data(){
    return {
      email: null,
      password: null,
      snackbar: false,
      timeout: 3000,
      overlay: false,
    }
  },
  methods: {
    async handleSubmit(){
      this.overlay = true;
      await axios
          .post(`${process.env.VUE_APP_BASE_URL}/auth/login`, {
                email: this.email,
                password: this.password
          })
          .then( function (response) {
            localStorage.setItem('accessToken', response.data.accessToken);
            router.push('profile');
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
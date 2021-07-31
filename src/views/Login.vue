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
                <v-text-field
                    label="Email Address"
                    prepend-inner-icon="mdi-email"
                    outlined
                ></v-text-field>
                <v-text-field
                    label="Password"
                    prepend-inner-icon="mdi-lock"
                    outlined
                ></v-text-field>
                <v-btn text>
                  Forget Password?
                </v-btn>
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
                >
                  Login Now
                </v-btn>
                <v-btn
                    class="ml-2"
                    depressed
                    large
                >
                  Create Account
                </v-btn>
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
export default {
  name: "Login"
}
</script>

<style scoped>

</style>
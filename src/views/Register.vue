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
                    <v-stepper-content step="1">
                      <v-card
                          class="mb-12"
                          flat
                      >
                        <v-text-field
                            label="Email Address"
                            prepend-inner-icon="mdi-email"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="Phone Number"
                            prepend-inner-icon="mdi-phone"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="Password"
                            prepend-inner-icon="mdi-lock"
                            outlined
                        ></v-text-field>

                        <v-text-field
                            label="Confirm Password"
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

                      <v-btn text>
                        Cancel
                      </v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                      <v-card
                          class="mb-12"
                          flat
                      >
                        <v-text-field
                            label="First Name"
                            prepend-inner-icon="mdi-account"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="Last Name"
                            prepend-inner-icon="mdi-account"
                            outlined
                        ></v-text-field>
                        <v-select
                            label="District"
                            outlined
                        ></v-select>
                        <v-textarea
                            label="Bio"
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

                      <v-btn text>
                        Cancel
                      </v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                      <v-card
                          class="mb-12"
                          color="grey lighten-1"
                          height="200px"
                      ></v-card>

                      <v-btn
                          color="primary"
                          @click="e1 = 1"
                      >
                        Continue
                      </v-btn>

                      <v-btn text>
                        Cancel
                      </v-btn>
                    </v-stepper-content>
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
export default {
  name: "Register",
  data () {
    return {
      e1: 1,
    }
  },
}
</script>

<style scoped>

</style>
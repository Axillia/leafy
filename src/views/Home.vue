<template>
  <v-container>
    <v-row no-gutters>
      <v-col
          cols="12"
          sm="6"
      >
        <v-img
        :src="require('@/assets/bg.jpg')"></v-img>
      </v-col>
      <v-col
          cols="12"
          sm="6"
      >
        <v-container fill-height>
          <v-layout align-center justify-center row>
            <v-flex class="text-h3 text-center font-weight-bold" xs12 sm12 md12>Welcome to Leafy</v-flex>
            <v-flex class="text-h5 text-center font-weight-bold" xs12 sm12 md12>Live green to save more green</v-flex>
            <v-flex class="text-h5 text-center font-weight-bold" xs12 sm12 md12>
              <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                  label
                  large
              >
                <v-icon left>
                  mdi-book-open-page-variant
                </v-icon>
                Books
              </v-chip>
              <v-chip
                  class="ma-2"
                  color="orange"
                  text-color="white"
                  label
                  large
              >
                <v-icon left>
                  mdi-cellphone
                </v-icon>
                Mobile Phones
              </v-chip>
              <v-chip
                  class="ma-2"
                  color="primary"
                  text-color="white"
                  label
                  large
              >
                <v-icon left>
                  mdi-laptop
                </v-icon>
                Computers
              </v-chip>
              <v-chip
                  class="ma-2"
                  color="teal"
                  text-color="white"
                  label
                  large
              >
                <v-icon left>
                  mdi-google-controller
                </v-icon>
                Electronics
              </v-chip>
              <v-chip
                  class="ma-2"
                  color="cyan"
                  text-color="white"
                  label
                  large
              >
                <v-icon left>
                  mdi-seat
                </v-icon>
                Furniture
              </v-chip>
              <v-chip
                  class="ma-2"
                  color="deep-purple accent-4"
                  text-color="white"
                  label
                  large
              >
                <v-icon left>
                  mdi-hammer-screwdriver
                </v-icon>
                Constructions
              </v-chip>
              <v-chip
                  class="ma-2"
                  color="red"
                  text-color="white"
                  label
                  large
              >
                <v-icon left>
                  mdi-wrench
                </v-icon>
                Services
              </v-chip>
            </v-flex>
          </v-layout>
        </v-container>
      </v-col>
    </v-row>
    <v-row no-gutters class="ma-16">
      <v-container>
        <v-layout align-center justify-center row>
          <v-flex class="text-h4 text-center font-weight-bold" xs12 sm12 md12>Take a stand for the love of green</v-flex>
          <v-btn
              color="primary"
              dark
              large
              class="mt-16 ma-5"
              @click="$router.push('listings')"
          >
            <v-icon left>
              mdi-magnify
            </v-icon>
            Find your need
          </v-btn>
          <v-btn
              color="orange"
              dark
              large
              class="mt-16 ma-5"
          >
            <v-icon left>
              mdi-rocket
            </v-icon>
            Donate your goods
          </v-btn>
        </v-layout>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    name: 'Home',

    components: {

    },
  }
</script>

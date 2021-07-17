<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md9>
        <v-card
            class="pa-2"
            flat
        >
          <v-flex class="text-h5">LG V20 [CRACKED]</v-flex>
          <v-flex class="text-subtitle-1 grey--text">Posted on 15 Jul 9:23 am, Colombo</v-flex>
          <v-img
              :src="require('@/assets/tmp/cracked_phone.png')"
              width="500"
          ></v-img>
          <v-flex class="text-h6 pt-5">Description</v-flex>
          <v-flex class="text-body-1 grey--text pt-5">LG V20 smartphone with a cracked display. It can be used for spare parts or repair the phone and can be used for general purposes.</v-flex>
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
              <v-img :src="require('@/assets/tmp/profile.png')"></v-img>
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <div class="text-h5">John Doe</div>
            <v-chip
                class="ma-2"
                color="amber darken-2"
                outlined
            >
              <v-icon left>mdi-star-circle</v-icon>
              MEMBER
            </v-chip>
            <div class="gray--text">Member since Nov 24, 2017</div>
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
export default {
  name: "Product"
}
</script>

<style scoped>

</style>
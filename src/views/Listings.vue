<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card>
          <v-toolbar
              dark
              color="primary"
          >
            <v-toolbar-title>I want to find</v-toolbar-title>
            <v-autocomplete
                cache-items
                class="mx-4"
                flat
                hide-no-data
                hide-details
                label="What are you looking for?"
                solo-inverted
            ></v-autocomplete>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="clickable" >
          <div class="d-flex flex-no-wrap">
            <v-avatar
                class="ma-3"
                size="125"
                tile
            >
              <v-img :src="require('@/assets/tmp/cracked_phone.png')"></v-img>
            </v-avatar>
            <div>
              <v-card-text>
                <p class="text-h6 text--primary">LG V20 [CRACKED]</p>
                <p><v-icon>mdi-map-marker</v-icon>Colombo</p>
                <div class="text--primary">
                  <v-chip
                      class="ma-2"
                      color="warning"
                      label
                  >
                    <v-icon left>
                      mdi-hammer-wrench
                    </v-icon>
                    Live Parts
                  </v-chip>
                </div>
              </v-card-text>

            </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card class="clickable" >
          <div class="d-flex flex-no-wrap">
            <v-avatar
                class="ma-3"
                size="125"
                tile
            >
              <v-img :src="require('@/assets/tmp/ict_book.png')"></v-img>
            </v-avatar>
            <div>
              <v-card-text>
                <p class="text-h6 text--primary">A/L ICT MCQ - S. Withanage</p>
                <p><v-icon>mdi-map-marker</v-icon>Galle</p>
                <div class="text--primary">
                  <v-chip
                      class="ma-2"
                      color="green"
                      text-color="white"
                      label
                  >
                    <v-icon left>
                      mdi-check-circle
                    </v-icon>
                    Good Condition
                  </v-chip>
                </div>
              </v-card-text>

            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Listings"
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
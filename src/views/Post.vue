<template>
<v-row justify="center">
  <v-col
      cols="12"
      sm="10"
      md="8"
      lg="6"
  >
    <v-card>
      <v-card-title>
        Submit your donation
      </v-card-title>
      <v-divider class="ma-4"></v-divider>
      <v-card-text>
        <v-text-field
            label="Product Name"
            outlined
            dense
        ></v-text-field>
        <v-select
            label="Condition"
            dense
            outlined
        ></v-select>
        <v-textarea
            label="Description"
            auto-grow
            outlined
            rows="3"
            row-height="25"
        ></v-textarea>
        <v-select
            label="Location"
            dense
            outlined
        ></v-select>
        <v-uploader
            button-text="Select product picture"
        >
        </v-uploader>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            depressed
            large
            color="primary"
            class="ma-4"
        >
          Post donation
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</v-row>
</template>

<script>
export default {
  name: "Post"
}
</script>

<style scoped>

</style>
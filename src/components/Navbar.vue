<template>
  <nav>
    <v-toolbar flat>
      <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            :src="require('@/assets/logo.png')"
            transition="scale-transition"
            width="150"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn color="warning">
        <v-icon left>mdi-account</v-icon>
        <span>Profile</span>
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>

</style>
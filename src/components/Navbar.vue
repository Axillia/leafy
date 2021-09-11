<template>
  <nav>
    <v-toolbar flat>
      <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2 clickable"
            contain
            :src="require('@/assets/logo.png')"
            transition="scale-transition"
            width="150"
            @click="$router.push('/')"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          class="mr-2"
      >
        <v-icon left>mdi-wallet-giftcard</v-icon>
        <span>Donate</span>
      </v-btn>
      <v-btn
          color="green"
          class="mr-2 white--text"
      >
        <v-icon left>mdi-store</v-icon>
        <span>Store</span>
      </v-btn>
      <v-btn
          color="warning"
          :to="'/profile'"
      >
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
.clickable {
  cursor: pointer;
}
</style>
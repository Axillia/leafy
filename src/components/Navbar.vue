<template>
  <nav>
    <v-toolbar flat>
      <v-app-bar-nav-icon
          class="d-md-none"
          @click.stop="drawer = !drawer"
      >
      </v-app-bar-nav-icon>
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
          class="mr-2 d-none d-md-inline-flex"
      >
        <v-icon left>mdi-wallet-giftcard</v-icon>
        <span>Donate</span>
      </v-btn>
      <v-btn
          color="green"
          class="mr-2 white--text d-none d-md-inline-flex"
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
    <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
            v-model="group"
            link
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-wallet-giftcard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Donate</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-store</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Store</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Account', icon: 'mdi-account-box' },
      { title: 'Admin', icon: 'mdi-gavel' },
    ],
  }),
  watch: {
    group () {
      this.drawer = false
    },
  },
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
<template>
  <div>
    <v-container class="pa-1">
      <!-- <v-divider></v-divider> -->
      <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            @click="drawer = false"
            v-for="(item, i) in items"
            :key="i"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <br />
        <v-divider></v-divider>
        <br /><br />
        <v-list-item>
          <v-list-item-action>
            <v-switch label="Noise" dense inset v-model="noise"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-content
            v-text="
              currentUser.isAuthenticated ? currentUser.name : 'Not signed in.'
            "
          >
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              elevation="0"
              dense
              outlined
              :style="'border: 1px solid rgba(255,255,255,0.5);'"
              v-if="!currentUser.isAuthenticated"
              @click.prevent="loginWindow = !loginWindow"
              >Sign In</v-btn
            >
            <v-btn
              elevation="0"
              dense
              outlined
              :style="'border: 1px solid rgba(255,255,255,0.5);'"
              v-else
              @click.prevent="logout"
              >Sign Out</v-btn
            >
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <div>
            <v-tooltip v-if="!$vuetify.theme.dark" bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" color="info" small fab @click="darkMode">
                  <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
                </v-btn>
              </template>
              <span>Dark Mode On</span>
            </v-tooltip>

            <v-tooltip v-else bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" color="info" small fab @click="darkMode">
                  <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
                </v-btn>
              </template>
              <span>Dark Mode Off</span>
            </v-tooltip>
          </div>
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "SidePanel",
  data() {
    return {
      selectionToggle: false,
      editTokenDialog: false,
      selectedItem: 0,
      items: [
        { text: "My Projects", icon: "mdi-folder", link: "/projects" },
        { text: "About", icon: "mdi-account-multiple", link: "/about" },
        { text: "Log In", icon: "mdi-star", link: "/login" },
        { text: "Posts", icon: "mdi-vuejs", link: "/posts" },
        { text: "Offline", icon: "mdi-language-python", link: "#" },
        { text: "Uploads", icon: "mdi-upload", link: "#" },
        { text: "Backups", icon: "mdi-cloud-upload", link: "#" },
      ],
    };
  },
  computed: {
    selected: {
      get() {
        return this.$store.state.selected;
      },
      set(newSelection) {
        return this.$store.dispatch("setSelected", newSelection);
      },
    },
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(newBool) {
        return this.$store.dispatch("setDrawer", newBool);
      },
    },
    noise: {
      get() {
        return this.$store.state.noise;
      },
      set(newBool) {
        return this.$store.dispatch("setNoise", newBool);
      },
    },
    loginWindow: {
      get() {
        return this.$store.getters.loginWindow;
      },
      set(newBool) {
        return this.$store.dispatch("setLoginWindow", newBool);
      },
    },
    currentUser() {
      return this.$store.state.user;
    },
    showSelected() {
      return this.selected && this.selectionToggle;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style>
html {
  overflow-y: auto;
}
</style>
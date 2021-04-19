<template>
  <div @click="drawer = false">
    <v-container>
      <v-card
        color="rgba(0,0,0,0.01)"
        outlined
        :style="'border: 1px solid #f8f8ff1a;'"
        class="mx-auto ma-3"
      >
        <div v-if="$store.state.noise" class="noise"></div>
        <v-card-text>
          <div class="main-text">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </div>
        </v-card-text>
      </v-card>
      <v-card
        color="rgba(0,0,0,0.01)"
        outlined
        :style="'border: 1px solid #f8f8ff1a;'"
        class="mx-auto ma-3"
      >
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">headline</h3>
            <div>description</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn to="/test" text>TEST</v-btn>
          <v-btn to="/about" text>ABOUT</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import path from "path";
export default {
  name: "Main",
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(newBool) {
        return this.$store.dispatch("setDrawer", newBool);
      },
    },
  },
  data() {
    return {
      // src: "./assets/images/pug.jpg",
      src: path.join(__dirname, "src", "assets", "images", "pug.jpg"),
    };
  },
};
</script>

<style scoped>
.main-text {
  /* TEXT COLOR */
  color: #eef1f3;
}
</style>
<template>
  <div @click="drawer = false">
    <v-container>
      <v-card class="mx-auto ma-3" transition>
        <v-card-text>
          <div class="text--primary">TEST PAGE</div>
        </v-card-text>
        <v-card-actions>
          <v-btn to="/" color="primary">text</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import path from "path";
export default {
  name: "Test",
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
</style>
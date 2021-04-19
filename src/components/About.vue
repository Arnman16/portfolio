<template>
  <div @click="drawer = false">
    <v-container>
      <v-card color="rgba(255,255,255,0.04)" class="mx-auto ma-3" transition>
        <v-card-text>
          <div class="text--primary">ABOUT PAGE</div>
        </v-card-text>
        <v-card-actions>
          <v-btn to="/" color="primary">text</v-btn>
        </v-card-actions>
      </v-card>
      <v-card color="rgba(255,255,255,0.04)" class="mx-auto ma-3" transition>
        <v-container v-for="(section, index) in story" :key="index">
          <div v-if="section.type == 'text'">
            <v-card-text class="text--primary">
              <div v-html="section.content" class="content-text"></div>
            </v-card-text>
          </div>
          <div v-else>
            <snippet :code="section.content" />
          </div>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import path from "path";
import Snippet from "./Snippet";
export default {
  name: "about",
  components: {
    Snippet,
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(newBool) {
        return this.$store.dispatch("setDrawer", newBool);
      },
    },
    editorContent: {
      get() {
        return this.$store.getters.editorContent;
      },
      set(newContent) {
        return this.$store.dispatch("setEditorContent", newContent);
      },
    },
    editorContentPlainText: {
      get() {
        return this.$store.getters.editorContentPlainText;
      },
      set(newContent) {
        return this.$store.dispatch("setEditorContentPlainText", newContent);
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
    story() {
      return this.$store.getters.story;
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
.content-text >>> p {
  /* color: red; */
  line-height: 1px;
  margin: 10px 0;
}
.content-text {
  font-size: 16px;
  font-weight: 250;
}
</style>
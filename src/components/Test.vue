<template>
  <div @click="drawer = false">
    <v-container>
      <v-card class="mx-auto ma-3" transition>
        <v-text-field v-model="input"> </v-text-field>
        {{ output }}
      </v-card>
      <Editor />
    </v-container>
  </div>
</template>

<script>
import path from "path";
import Editor from "./Editor";

export default {
  name: "Test",
  components: {
    Editor,
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
    output() {
      return this.slugify(this.input);
    },
  },
  data() {
    return {
      // src: "./assets/images/pug.jpg",
      src: path.join(__dirname, "src", "assets", "images", "pug.jpg"),
      input: "",
    };
  },
  methods: {
    slugify: function (text) {
      var slug = "";
      var textLower = text.toLowerCase();
      // Letter "e"
      slug = textLower
        .replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, "e")
        // Letter "a"
        .replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, "a")
        // Letter "o"
        .replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, "o")
        // Letter "u"
        .replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, "u")
        // Letter "d"
        .replace(/đ/gi, "d")
        // Trim the last whitespace
        .replace(/\s*$/g, "")
        // Change whitespace to "-"
        .replace(/\s+/g, "-")
        //remove special characters
        .replace(/[^\w-]+/g,'')
        // & to and
        .replace(/&/g, `-and-`)
        // -- to -
        .replace(/--/g, `-`);
      return slug;
    },
  },
};
</script>

<style scoped>
</style>
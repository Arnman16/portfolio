<template>
  <div @click="drawer = false">
    <v-container fluid class="pa-0">
      <v-slide-x-transition>
        <v-container v-if="post">
          <v-sheet
            :class="isMobile ? 'pa-1, transparent' : 'pa-3, transparent'"
          >
            <v-container fluid>
              <div :class="isMobile ? 'text-h4' : 'text-h2'">
                {{ post.title | capitalize }}
              </div>
              <v-row>
                <v-col cols="3">
                  <p class="text-caption">{{ post.created | formatDate }}</p>
                  <span v-if="post.modified" class="text-caption"
                    >modified: {{ post.modified | formatDate }}</span
                  >
                </v-col>
                <v-col>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        :to="'/edit/' + post.slug"
                        dense
                        elevation="2"
                        v-bind="attrs"
                        v-on="on"
                        icon
                        ><v-icon>mdi-circle-edit-outline</v-icon></v-btn
                      > </template
                    >Edit Post</v-tooltip
                  ></v-col
                ><v-col></v-col><v-col></v-col></v-row></v-container
          ></v-sheet>
          <v-container
            :class="isMobile ? 'pt-0 pr-2 pb-0 pl-2' : 'pt-0 pr-3 pb-0 pl-3'"
            v-for="(section, index) in post.story"
            :key="index"
          >
            <div v-if="section.type == 'text'">
              <v-card-text class="content-text" v-html="section.content">
              </v-card-text>
            </div>
            <div v-else>
              <snippet :code="section.content" :lang="section.lang" />
            </div>
          </v-container>
        </v-container>
      </v-slide-x-transition>
    </v-container>
  </div>
</template>

<script>
import path from "path";
import moment from "moment";
import Snippet from "./Snippet";
export default {
  components: {
    Snippet,
  },
  name: "Post",
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }

      let date = val.toDate();
      return moment(date).fromNow();
    },
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
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
    loading: {
      get() {
        return this.$store.getters.loading;
      },
      set(isLoading) {
        return this.$store.dispatch("setLoading", isLoading);
      },
    },
    post: {
      get() {
        return this.$store.getters.post;
      },
      set(newPost) {
        return this.$store.dispatch("setPost", newPost);
      },
    },
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
    slug() {
      return this.$route.params.slug;
    },
  },
  data() {
    return {
      // src: "./assets/images/pug.jpg",
      src: path.join(__dirname, "src", "assets", "images", "pug.jpg"),
      testOutput: "",
    };
  },
  methods: {},
  mounted() {
    this.$store.dispatch("fetchPost", this.$route.params.slug);
  },
  created() {
    if (this.post) {
      if (this.post.slug != this.$route.params.slug) this.post = {};
    }
  },
  destroyed() {},
};
</script>

<style>
.CodeMirror {
  height: auto;
}
.content-text {
  color: #e1f5fe;
  font-size: 17px;
  line-height: 1.7em;
  padding: 16px 16px 0px 16px;
}
</style>
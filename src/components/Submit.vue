<template>
  <v-tabs
    dark
    slider-color="green"
    background-color="#000000dc"
    v-model="tab"
    grow
  >
    <v-tab> Compose </v-tab>
    <v-tab @click="createStory"> Preview </v-tab>
    <v-tabs-items class="transparent" v-model="tab">
      <v-tab-item>
        <v-row justify="space-around" align="center">
          <v-spacer v-if="!isMobile"></v-spacer>
          <v-col class="ma-1">
            <v-text-field
              dense
              hide-details="auto"
              outlined
              class="ma-2"
              label="Title"
              v-model="title"
            ></v-text-field>
          </v-col>
          <v-col class="d-flex ma-0">
            <v-select
              dense
              :items="categories"
              hide-details="auto"
              v-model="category"
              label="Category"
              outlined
            ></v-select>
          </v-col>
          <v-spacer v-if="!isMobile"></v-spacer>
        </v-row>
        <v-row class="fill-height" justify="space-around" align="center">
          <v-col class="fill-height" align="center">
            <Editor :submit="save" />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <div>
          <v-row justify="space-around" align="center">
            <v-col align="center">
              <div class="text-h2">{{ title | capitalize }}</div>
            </v-col></v-row
          >
          <v-slide-x-transition>
            <div v-show="showStory">
              <v-container v-for="(section, index) in story" :key="index">
                <span v-if="section.type == 'text'">
                  <div class="content-text" v-html="section.content"></div>
                </span>
                <span v-else>
                  <snippet :code="section.content" :lang="section.lang" />
                </span>
              </v-container>
            </div>
          </v-slide-x-transition>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import path from "path";
import Editor from "./Editor";
import Snippet from "./Snippet";
import moment from "moment";

export default {
  name: "Submit",
  components: {
    Editor,
    Snippet,
  },
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
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
    post: {
      get() {
        return this.$store.getters.post;
      },
      set(newPost) {
        return this.$store.dispatch("setPost", newPost);
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
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(newBool) {
        return this.$store.dispatch("setDrawer", newBool);
      },
    },
  },
  watch: {
    post() {
      this.title = this.post.title;
      this.category = this.post.category;
    },
  },
  data() {
    return {
      // src: "./assets/images/pug.jpg",
      isPublished: false,
      src: path.join(__dirname, "src", "assets", "images", "pug.jpg"),
      input: "",
      title: "",
      tab: null,
      categories: ["Unpublished", "Blog", "Snippet"],
      category: "Unpublished",
      story: "",
      showStory: false,
      published: false,
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
        .replace(/[^\w-]+/g, "")
        // & to and
        .replace(/&/g, `-and-`)
        // -- to -
        .replace(/--/g, `-`);
      return slug;
    },
    async createStory() {
      this.showStory = false;
      this.story = {};
      await this.$store.dispatch("createStory").then((story) => {
        this.story = story;
        this.showStory = true;
      });
      // console.log('TEST TEST TEST MOFO', test);
    },
    save() {
      this.createStory();
      this.loading = true;
      let published = false;
      if (this.category != "Unpublished") {
        published = true;
      }
      const title = this.title;
      const slug = this.slugify(title);
      const category = this.category;
      if (this.$route.name == "Edit") {
        this.$store.dispatch("editPost", {
          title: title,
          slug: slug,
          oldSlug: this.$route.params.slug,
          published: published,
          category: category,
        });
      } else {
        this.$store.dispatch("createPost", {
          title: title,
          slug: slug,
          published: published,
          category: category,
        });
      }
    },
    async fetchData() {
      await this.$store
        .dispatch("fetchPostEdit", this.$route.params.slug)
        .then(() => {
          this.$store.dispatch("setEditorContent", this.post.content);
        });
    },
  },
  created() {
    if (this.$route.name == "Edit") {
      console.log("EDIT");
      this.fetchData();
    }
    this.loading = false;
  },
};
</script>

<style>
.fixed-tabs-bar .v-tabs__bar {
  position: -webkit-sticky;
  position: sticky;
  top: 4rem;
  z-index: 2;
}

.v-window-item .v-window-item--active {
  height: inherit;
}
#toolbar .toolbar-button {
  margin-left: 5px;
  width: 100px;
  color: rgb(56, 54, 54);
  /* background-color: rgb(124, 123, 187); */
}
.ql-container.ql-snow {
  background-color: whitesmoke;
  border: 1.5px solid rgb(61, 61, 61);

  height: auto;
}
.ql-toolbar.ql-snow {
  background-color: rgb(190, 193, 201);
  border: 1.5px solid rgb(61, 61, 61);
  padding: 3px;
  height: 54px;
}
.v-window-item--active {
  height: inherit;
  max-height: inherit;
}

.v-tabs {
  height: inherit;
  max-height: 100%;
  border-radius: 25px;
  border: 1.5px solid rgb(61, 61, 61);
  overflow-y: hidden;
}

.v-tabs-items {
  height: 94%;
  max-height: 100%;
}

.pre {
  white-space: pre-wrap !important;
  max-width: 682px;
  margin-left: auto;
  margin-right: auto;
}
.ql-editor {
  white-space: pre !important;
  height: 350px;
  padding-bottom: 10px;
  overflow-y: scroll;
}

.content-text {
  /* color: #e1f5fe; */
  /* font-size: 17px; */
  line-height: 1.7em;
  max-width: 682px;
  margin-left: auto;
  margin-right: auto;
  padding: 16px 16px 6px 16px;
}

.content-text p {
  white-space: pre-wrap !important;
}
.content-text div {
  white-space: pre-wrap !important;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
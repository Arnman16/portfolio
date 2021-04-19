<template>
  <div @click="drawer = false">
    <v-container>
      <h2>Submit</h2>
      <v-card class="mx-auto ma-3" color="rgba(0,0,0,0.2)" transition>
        <v-tabs fixed-tabs background-color="rgba(0,0,0,0.2)" v-model="tab">
          <v-tab> Compose </v-tab>
          <v-tab> Preview </v-tab>
          <v-tabs-items class="transparent" v-model="tab">
            <v-tab-item>
              <v-container fluid>
                <v-row align="center">
                  <v-col class="d-flex ma-0" cols="4" sm="4">
                    <v-text-field
                      dense
                      outlined
                      label="Title"
                      v-model="title"
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex ma-0" cols="4" sm="4">
                    <v-select
                      dense
                      :items="categories"
                      v-model="category"
                      label="Category"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <Editor />
              <v-container>
                <v-switch
                  flat
                  color="success"
                  :label="published ? 'Public' : 'Private'"
                  v-model="published"
                ></v-switch
                ><v-btn @click="save" outlined>Submit</v-btn>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-fade-transition>
                <div v-show="story">
                  <div class="text-h2">{{ title | capitalize }}</div>
                  <v-container v-for="(section, index) in story" :key="index">
                    <div v-if="section.type == 'text'">
                      <v-card-text class="text--primary">
                        <div
                          v-html="section.content"
                          class="content-text"
                        ></div>
                      </v-card-text>
                    </div>
                    <div v-else>
                      <snippet :code="section.content" :lang="section.lang" />
                    </div>
                  </v-container>
                </div>
              </v-fade-transition>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import path from "path";
import Editor from "./Editor";
import Snippet from "./Snippet";
import moment from "moment";
import { debounce } from "debounce";

export default {
  name: "Edit",
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
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(newBool) {
        return this.$store.dispatch("setDrawer", newBool);
      },
    },
    editorContent() {
      return this.$store.getters.editorContent;
    },
  },
  watch: {
    post() {
      this.title = this.post.title;
      this.category = this.post.category;
      this.published = this.post.published;
    },
    editorContent() {
      this.test2()
    },
  },
  data() {
    return {
      // src: "./assets/images/pug.jpg",
      src: path.join(__dirname, "src", "assets", "images", "pug.jpg"),
      input: "",
      title: "",
      tab: null,
      categories: ["Blog", "Snippet"],
      category: "Blog",
      story: "",
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
      this.story = false;
      this.story = await this.$store.dispatch("createStory");
      // console.log('TEST TEST TEST MOFO', test);
    },
    test() {
      console.log("change")
    },
    save() {
      this.loading = true;
      this.createStory();
      const title = this.title;
      const slug = this.slugify(title);
      const published = this.published;
      const category = this.category;
      this.loading = true;
      this.$store.dispatch("editPost", {
        title: title,
        slug: slug,
        oldSlug: this.$route.params.slug,
        published: published,
        category: category,
      });
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
    // this.post = {
    //   title: "",
    //   content: "",
    //   published: "",
    // };
    this.fetchData();
  },
  mounted() {
    this.test2 = debounce(this.createStory, 5000);
  },
};
</script>
<template>
  <v-container fluid fill-height class="posts">
    <v-fab-transition>
      <v-btn
        v-if="user.isAuthenticated"
        to="/submit"
        fab
        large
        dark
        fixed
        right
        bottom
        elevation="12"
        class="ma-5"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-container fluid :class="isMobile ? 'ma-0 pa-0' : 'ma-2'">
      <div v-if="!posts.length && !loading" class="text--primary">
        <v-row justify="space-around" align="center">
          <v-col align="center">
            There's nothing here...<br />
            <v-btn outlined small to="/submit">Create a Post?</v-btn></v-col
          ></v-row
        >
      </div>
      <v-row align="center" justify="center" class="ba-3 ma-2">
        <v-col align="center" class="d-flex" cols="12" sm="6">
          <h1>Posts - {{ selectedCategory }}</h1>
        </v-col>
        <v-col align="center" class="d-flex" cols="12" sm="6">
          <v-select
            outlined
            hide-details="auto"
            dense
            label="Category"
            width="30px"
            v-model="selectedCategory"
            :items="categories"
          ></v-select
        ></v-col>
      </v-row>
      <transition-group name="list" tag="div" class="py-0">
        <div v-for="(post, i) in posts" :key="post.slug" :v-show="post">
          <v-hover
            v-if="
              post.category == selectedCategory || selectedCategory == 'All'
            "
            v-slot="{ hover }"
          >
            <v-slide-y-transition>
              <v-card
                @click.native="setPost(i)"
                :color="
                  $vuetify.theme.dark
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(255,255,255,0.5)'
                "
                :elevation="hover ? 12 : 2"
                :class="{
                  'on-hover': hover,
                }"
                class="ma-3"
                :to="getLink(post.slug)"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="overline mb-4">{{ post.category }}</div>
                    <v-list-item-title class="headline mb-1">
                      {{ post.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <span>{{ post.plainText | trimLength }}</span>
                    </v-list-item-subtitle>
                    <!-- <v-divider class="ma-3"></v-divider> -->
                    <span class="text-caption my-date">{{
                      post.created | formatDate
                    }}</span>
                  </v-list-item-content>

                  <v-list-item-avatar tile size="120" color="black"
                    ><v-img
                      :src="post.thumbnail ? post.thumbnail : defaultThumb"
                    ></v-img
                  ></v-list-item-avatar>
                </v-list-item>
                <v-list-item v-if="user.isAuthenticated">
                  <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="1" align="center" class="pa-0">
                      <v-btn
                        v-if="user.isAuthenticated"
                        icon
                        class="mx-auto"
                        dense
                        @click.prevent="getDelete(post)"
                        ><v-icon>mdi-delete</v-icon></v-btn
                      ></v-col
                    ></v-row
                  >
                </v-list-item>
              </v-card>
            </v-slide-y-transition>
          </v-hover>
        </div>
      </transition-group>
    </v-container>
    <v-spacer></v-spacer>

    <v-dialog v-model="deleteConfirmation" max-width="500" class="mx-0">
      <v-container fluid fill-height>
        <v-row justify="space-around" align="center">
          <v-col align="center" class="ma-0, pa-0">
            <v-card class="mx-auto">
              <v-app-bar class="transparent" flat height="30">
                <v-spacer></v-spacer
                ><v-btn plain icon @click="deleteConfirmation = false"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </v-app-bar>
              <v-container>
                <v-card-title class="mx-auto py-0, justify-center"
                  >Are you sure you want to delete<br />
                  '{{ deleteThis.title }}' ?
                </v-card-title>
                <v-card-actions class="mx-auto py-0, justify-center">
                  <v-btn @click="confirmDelete" class="mx-4 mb-3" dense
                    >yes</v-btn
                  >
                  <v-btn
                    class="mx-4 mb-3"
                    dense
                    @click="deleteConfirmation = false"
                    >no</v-btn
                  >
                </v-card-actions>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </v-container>
</template>

<script>
// import { postsCollection, firebase } from "../db";
import moment from "moment";
const defaultThumb = require("../projects/images/AaronLogoYellowW.png");
export default {
  name: "posts",
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
    user() {
      return this.$store.getters.user;
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
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      let date = val.toDate();
      return moment(date).fromNow();
    },

    trimLength(val) {
      if (val.length < 200) {
        return val;
      }
      return `${val.substring(0, 200)}...`;
    },
  },
  watch: {
    $route() {
      this.loading = true;
      if (this.$route.name == "Posts") {
        this.$store.dispatch("fetchPosts");
      } else if (this.$route.name == "Unpublished") {
        this.$store.dispatch("fetchUnpublishedPosts");
      }
    },
    posts() {
      this.getCategories();
    },
  },
  data() {
    return {
      categories: [],
      selectedCategory: "All",
      postRef: {},
      signedIn: {},
      defaultThumb: defaultThumb,
      deleteConfirmation: false,
      deleteThis: {
        title: "",
        slug: "",
      },
    };
  },
  methods: {
    setPost(i) {
      this.post = this.posts[i];
    },
    getLink(slug) {
      if (this.$route.name == "Posts") {
        return "/posts/" + slug;
      } else if (this.$route.name == "Unpublished") {
        return "/unpublished/" + slug;
      }
    },
    getDelete(post) {
      this.deleteConfirmation = true;
      this.deleteThis.title = post.title;
      this.deleteThis.slug = post.slug;
    },
    confirmDelete() {
      console.log(this.deleteThis.slug);
      let result = this.$store.dispatch("deletePost", this.deleteThis.slug);
      if (result) {
        this.deleteConfirmation = false;
      }
    },
    getCategories() {
      let categories = new Set().add("All");
      this.posts.forEach((post) => {
        categories.add(post.category);
      });
      this.categories = Array.from(categories);
    },
  },
  created() {
    this.getCategories();
  },
  mounted() {
    this.loading = true;
    if (this.$route.name == "Posts") {
      this.$store.dispatch("fetchPosts");
    } else if (this.$route.name == "Unpublished") {
      this.$store.dispatch("fetchUnpublishedPosts");
    }
  },
};
</script>


<style scoped>
.v-card {
  transition: opacity 0.1s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
  filter: grayscale(90%);
}
.list {
  will-change: opacity;
}

.list-enter,
.list-leave-to {
  opacity: 0;
}
.list-move-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.2s ease;
}

.list-move {
  transition: opacity 0.2s ease-out;
}

.my-date {
  opacity: 0.3;
}
.posts {
  align-content: flex-start;
}
</style>
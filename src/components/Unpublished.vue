<template>
  <div>
    <v-fab-transition>
      <v-btn
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
    <v-container>
      <div v-for="(post, i) in posts" :key="i">
        <v-hover v-slot="{ hover }">
          <v-slide-y-transition>
            <v-card
              @click.native="setPost(i)"
              color="rgba(255,255,255,0.05)"
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
                    <p>{{ post.plainText | trimLength }}</p>
                  </v-list-item-subtitle>
                  <!-- <v-divider class="ma-3"></v-divider> -->
                  <p class="text-caption">{{ post.created | formatDate }}</p>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar>
              </v-list-item>
              <v-list-item>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="1" align="center" class="pa-0">
                    <v-btn
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
    </v-container>
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
  </div>
</template>

<script>
// import { postsCollection, firebase } from "../db";
import moment from "moment";
export default {
  name: "posts",
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
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
  data() {
    return {
      postRef: {},
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
      return "/posts/" + slug;
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
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch("fetchPosts");
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
</style>
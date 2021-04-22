<template>
    <v-container fluid fill-height>
      <v-card class="mx-auto ma-3 ba-2" color="rgba(0,0,0,0.2)" transition>
        <v-card-title>{{ project.name }}</v-card-title>
        <v-img
          outline
          max-height="550px"
          class="ma-3"
          :lazy-src="project.thumbnail"
          :src="project.image"
          transition="fade-transition"
        ></v-img>
        <v-card-text>
          <div class="text--primary">{{ project.details }}</div>
        </v-card-text>
        <v-card-title>Technology Stack:</v-card-title>
        <v-card-text>
          <v-list outlined dense selectable color="background lighten-1">
            <v-list-item v-for="(item, index) in project.stack" :key="index">
              <v-list-item-icon>
                <v-icon v-if="item.icon" color="blue lighten-1">
                  {{ item.icon }}
                </v-icon> </v-list-item-icon
              ><span class="text-caption">{{ item.tech }}</span></v-list-item
            >
          </v-list>
        </v-card-text>
        <v-card-title color="amber">Links:</v-card-title>
        <v-card
          tile
          outlined
          class="mr-3 ml-3 mb-3"
          color="background lighten-1"
        >
          <v-card-actions>
            <v-tooltip
              color="amber darken-1"
              transition="slide-y-reverse-transition"
              top
            >
              <template v-slot:activator="{ on, attrs }">
                <v-fab-transition>
                  <v-btn
                    target="_blank"
                    fab
                    v-show="isVisible"
                    elevation="0"
                    color="amber darken-4"
                    :href="project.github"
                    v-bind="attrs"
                    v-on="on"
                    class="ma-1"
                    ><v-icon>mdi-github</v-icon></v-btn
                  >
                </v-fab-transition>
              </template>
              <span>Check out the code!</span>
            </v-tooltip>
            <div
              v-observe-visibility="{
                callback: visibilityChanged,
                throttle: 200,
              }"
            >
              <v-tooltip
                color="amber darken-1"
                transition="slide-y-reverse-transition"
                top
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-fab-transition>
                    <v-btn
                      target="_blank"
                      fab
                      v-show="isVisible"
                      elevation="0"
                      color="amber darken-4"
                      :href="project.demo"
                      v-bind="attrs"
                      v-on="on"
                      class="ma-1"
                      ><v-icon>mdi-link</v-icon></v-btn
                    ></v-fab-transition
                  >
                </template>
                <span>Check out the app!</span>
              </v-tooltip>
              <v-btn
                fab
                v-show="!isVisible"
                elevation="0"
                color="transparent"
                class="ma-1"
              ></v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-container>
</template>

<script>
import path from "path";
import { ObserveVisibility } from "vue-observe-visibility";
import projects from "../projects";
export default {
  name: "Project",
  directives: {
    ObserveVisibility,
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
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
    project() {
      return this.projects[this.$route.params.id];
    },
  },
  data() {
    return {
      // src: "./assets/images/pug.jpg",
      src: path.join(__dirname, "src", "assets", "images", "pug.jpg"),
      projects: projects,
      testOutput: "",
      isActive: false,
      isVisible: false,
    };
  },
  methods: {
    testButton() {
      console.log(this.$vuetify.breakpoint);
      this.testOutput = this.$vuetify.breakpoint.name;
    },
    visibilityChanged(isVisible, entry) {
      this.isVisible = isVisible;
      const showLog = false;
      if (showLog) {
        console.log(this.isVisible);
        console.log(entry);
      }
    },
  },
  created() {
    this.$store.dispatch("setProject", this.projects[this.$route.params.id]);
  },
};
</script>

<style scoped>
</style>
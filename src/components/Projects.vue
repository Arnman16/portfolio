<template>
    <v-container fluid>
      <!-- <v-btn @click="testButton">HIHIHI</v-btn>
      {{ testOutput }} -->
      <v-row dense>
        <v-col
          v-for="(project, index) in projects"
          :key="index"
          :cols="isMobile ? 12 : 6"
          ><v-hover v-slot="{ hover }">
            <v-lazy
              v-model="isActive[index]"
              :options="{
                threshold: 0.5,
              }"
              min-height="200"
              transition="fade-transition"
            >
              <v-card
                :color="$vuetify.theme.dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)'"
                :elevation="hover ? 12 : 2"
                :class="{
                  'on-hover': (isMobile && isActive[index]) || hover,
                  'ma-0': isMobile,
                  'ma-3': !isMobile,
                }"
              >
                <router-link
                  :to="/projects/ + index"
                  style="text-decoration: none; color: inherit"
                >
                  <v-img
                    :src="project.thumbnail"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,1)"
                    height="300px"
                  >
                    <v-card-title v-text="project.name"></v-card-title>
                    <v-card-text dark>
                      <div>{{ project.summary }}</div>
                    </v-card-text>
                  </v-img></router-link
                >

                <v-card-actions>
                  <v-tooltip
                    v-for="(item, index) in project.stack"
                    :key="index"
                    top
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-hover v-slot="{ hover }">
                        <v-icon
                          :color="hover ? 'red' : 'secondary'"
                          v-bind="attrs"
                          v-on="on"
                          class="pl-2 pr-2"
                        >
                          {{ item.icon }}
                        </v-icon>
                      </v-hover>
                    </template>
                    <span>{{ item.tech }}</span>
                  </v-tooltip>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-lazy>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import path from "path";
import projects from "../projects";
export default {
  name: "Projects",
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
  },
  data() {
    return {
      // src: "./assets/images/pug.jpg",
      src: path.join(__dirname, "src", "assets", "images", "pug.jpg"),
      projects: projects,
      testOutput: "",
      transparent: "rgba(255, 255, 255, 0)",
      isActive: [],
    };
  },
  methods: {
    testButton() {
      console.log(this.$vuetify.breakpoint);
      this.testOutput = this.$vuetify.breakpoint.name;
    },
  },
  mounted() {
    this.projects.forEach(() => {
      this.isActive.push(false);
    });
  },
  destroyed() {
    this.$store.dispatch("setProject", {});
  },
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.1s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.9;
  filter: grayscale(70%);
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
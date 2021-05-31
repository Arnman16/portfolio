<template>
  <v-container fluid>
    <h3>JOBS</h3>
    <transition-group name="list" tag="div" class="py-0">
      <div v-for="(job, index) in orderByDate" :key="job.id">
        <v-lazy
          v-model="isActive[index]"
          :options="{
            threshold: 0.5,
          }"
          min-height="200"
          transition="fade-transition"
        >
          <v-hover v-slot="{ hover }">
            <v-slide-y-transition>
              <v-card
                :href="job.link"
                target="_blank"
                :ripple="{ class: 'indigo--text' }"
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
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="overline mb-4">{{ job.location }}</div>
                    <v-list-item-title class="headline mb-1">
                      {{ job.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <span v-html="job.description"></span>
                    </v-list-item-subtitle>
                    <!-- <v-divider class="ma-3"></v-divider> -->
                    <span class="text-caption my-date">{{
                      job.pubDate | formatDate
                    }}</span>
                  </v-list-item-content>
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
                        ><v-icon>mdi-delete</v-icon></v-btn
                      ></v-col
                    ></v-row
                  >
                </v-list-item>
              </v-card>
            </v-slide-y-transition>
          </v-hover>
        </v-lazy>
      </div>
    </transition-group>
  </v-container>
</template>

<script>
import moment from "moment";
import _ from "lodash";
export default {
  name: "Jobs",
  components: {},
  computed: {
    orderByDate() {
      return _.orderBy(this.jobs_local, "pubDate", "desc");
    },
    jobs: {
      get() {
        return this.$store.getters.jobs;
      },
      set(newJobs) {
        return this.$store.commit("SET_JOBS", newJobs);
      },
    },
    jobs_local: {
      get() {
        return this.$store.getters.jobs_local;
      },
      set(newJobs) {
        return this.$store.commit("SET_JOBS_LOCAL", newJobs);
      },
    },
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }

      // let date = Date.parse(val);
      return moment(val).fromNow();
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
      isActive: [],
    };
  },
  mounted() {
    this.$store.dispatch("fetchJobs");
    this.jobs.forEach(() => {
      this.isActive.push(false);
    });
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
</style>

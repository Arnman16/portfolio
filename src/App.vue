<template>
  <v-app
    class="my-app"
    :style="$vuetify.theme.dark ? { background: $vuetify.theme.themes.dark.background } : { background: $vuetify.theme.themes.light.background }"
  >
    <v-app-bar app flat dense hide-on-scroll dark clipped-right :color="$vuetify.theme.dark ? '#120a23bd' : '#000000dc'">
      <div v-if="noise" class="noise"><span class="bg"></span></div>
      <div v-else></div>
      <NavBar />
      <v-spacer></v-spacer>
      <v-hover v-slot="{ hover }">
        <v-btn
          text
          plain
          icon
          class="hamburger"
          :class="{
            'on-hover': hover,
          }"
        >
          <v-img
            max-width="30"
            :src="hamburgerHover"
            @click.stop="navDrawer = !navDrawer"
          ></v-img>
        </v-btn>
      </v-hover>
    </v-app-bar>

    <v-navigation-drawer
      v-model="navDrawer"
      dark
      :color="$vuetify.theme.dark ? '#120a23bd' : '#000000dc'"
      clipped
      app
      floating
      right
    >
      <!-- <div class="stars"></div> -->
      <div v-if="noise" class="noise"><span class="bg_nav"></span></div>
      <SidePanel />
    </v-navigation-drawer>
    <v-main>
      <transition name="page" mode="out-in">
        <v-container fluid fill-height :class="isMobile ? 'ma-0 pa-0' : 'mainContainer'">
          <router-view></router-view>
        </v-container>
      </transition>
    </v-main>
    <v-footer height="58" outlined padless color="rgba(0,0,0,0.01)">
      <div v-if="noise" class="noise"><span class="bg_nav"></span></div>
      <Footer />
    </v-footer>
    <v-dialog v-model="loginWindow" max-width="500" class="mx-auto">
      <Login />
    </v-dialog>
    <v-dialog v-model="loading" hide-overlay fullscreen>
      <v-container fluid fill-height>
        <v-row justify="space-around" align="center">
          <v-col align="center">
            <v-progress-circular
              :style="{ 'z-index': 2 }"
              class="mx-auto"
              size="70"
              color="00ffff"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </v-app>
</template>

<script>
// import Main from "./components/Main";
import NavBar from "./components/NavBar";
import SidePanel from "./components/SidePanel";
import Footer from "./components/Footer";
import Login from "./components/Login";
// import db from "./db"
const logo = require("./assets/nameLogo3.png");
const logoHover = require("./assets/nameLogo3Hover2.png");
const aboutMe = require("./assets/aboutMe.png");
const aboutMeSelected = require("./assets/aboutMeSelected.png");
const myProjects = require("./assets/myProjects.png");
const myProjectsSelected = require("./assets/myProjectsSelected.png");
const waterPoint = require("./assets/waterPoint.png");
const waterPointHover = require("./assets/waterPointHover.png");
const musicPoint = require("./assets/musicPoint.png");
const musicPointHover = require("./assets/musicPointHover.png");
const wavePoint = require("./assets/wavePoint.png");
const wavePointHover = require("./assets/wavePointHover.png");
const wavePoint1 = require("./assets/wavePoint1.png");
const wavePoint2 = require("./assets/wavePoint2.png");
const wavePoint3 = require("./assets/wavePoint3.png");
const wavePoint4 = require("./assets/wavePoint4.png");
const hamburger = require("./assets/hamburger.png");
const hamburgerHover = require("./assets/hamburgerHover.png");

export default {
  name: "App",
  components: {
    // Main,
    SidePanel,
    Footer,
    Login,
    NavBar,
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
    loginWindow: {
      get() {
        return this.$store.getters.loginWindow;
      },
      set(newBool) {
        return this.$store.dispatch("setLoginWindow", newBool);
      },
    },
    loginError: {
      get() {
        return this.$store.getters.loginError;
      },
      set(newError) {
        return this.$store.dispatch("setLoginError", newError);
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
    project: {
      get() {
        return this.$store.state.project;
      },
      set(newProject) {
        return this.$store.dispatch("setProject", newProject);
      },
    },
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
    currentUser() {
      return this.$store.state.user;
    },
  },
  data: () => ({
    route: {},
    route2: {},
    loginDialog: false,
    isHome: true,
    navDrawer: false,
    isRoute2: false,
    logo: logo,
    logoHover: logoHover,
    aboutMe: aboutMe,
    aboutMeSelected: aboutMeSelected,
    myProjects: myProjects,
    myProjectsSelected: myProjectsSelected,
    waterPoint: waterPoint,
    waterPointHover: waterPointHover,
    musicPoint: musicPoint,
    musicPointHover: musicPointHover,
    wavePoint: wavePoint,
    wavePointHover: wavePointHover,
    wavePoint1: wavePoint1,
    wavePoint2: wavePoint2,
    wavePoint3: wavePoint3,
    wavePoint4: wavePoint4,
    hamburger: hamburger,
    hamburgerHover: hamburgerHover,
    hoverPreload: [
      hamburgerHover,
      wavePointHover,
      musicPointHover,
      myProjectsSelected,
      aboutMeSelected,
      logoHover,
    ],
  }),
  methods: {
    fetchRoute() {
      if (!this.$route.params.id) {
        this.route = this.$route;
        this.isRoute2 = false;
        // console.log("ROUTE 1");
      } else {
        this.route2 = this.$route;
        this.isRoute2 = true;
        // console.log("ROUTE 2");
        if (!this.route.name) {
          const split = this.route2.path.split("/");
          // this is a hacky fix for direct project link bug. I'll make it better eventually
          this.route = {
            name: split[split.length - 2],
            fullPath: "/" + split[split.length - 2],
          };
        }
      }
      if (this.route.name === "Home") {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
  created() {
    this.fetchRoute();
    this.loading = false;
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchRoute",
  },
};
</script>

<style>
.my-app.v-application .primary--text {
  color: white !important;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  /* transform: translateX(-30%); */
}
@font-face {
  font-family: "Blinker";
  src: local("Blinker"),
    url(./assets/fonts/Blinker/Blinker-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Blinker";
  src: local("Blinker-Thin"),
    url(./assets/fonts/Blinker/Blinker-Thin.ttf) format("truetype");
}

.logo {
  font-weight: 100;
  font-size: 40;
}
html {
  overflow-y: auto;
  /* font-family: "Roboto"; */
}

.mainContainer {
  height: 100%;
  padding-left: 15px;
  padding-right: 15px;
  /* box-sizing: border-box; */
  max-width: 70%;
}
.bg {
  background-image: linear-gradient(#120a2334, #120a23);
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.bg_nav {
  background-image: linear-gradient(#120a23, #120a23bd);
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
}

@keyframes move-noise-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@-webkit-keyframes move-noise-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@-moz-keyframes move-noise-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@-ms-keyframes move-noise-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}

.no-uppercase {
  text-transform: unset !important;
}

.aaron {
  -webkit-font-smoothing: antialiased;
  color: aquamarine;
  letter-spacing: -1.8px;
  font-size: 24px;
}

.oCard {
  opacity: 0.2;
}

.noise {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.noise {
  background: transparent url(./assets/noise_color_full.png) repeat top center;
  z-index: -1;
  opacity: 0.1;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  -moz-animation: move-noise-back 200s linear infinite;
  -ms-animation: move-noise-back 200s linear infinite;
  -o-animation: move-noise-back 200s linear infinite;
  -webkit-animation: move-noise-back 200s linear infinite;
  animation: move-noise-back 200s linear infinite;
}

.ham:not(.on-hover) {
  opacity: 0.8;
  filter: grayscale(90%);
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #120a23;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #d2cddb;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.hamburger {
  transition: opacity 0.25s ease-in-out;
}

.hamburger:not(.on-hover) {
  opacity: 0.9;
  filter: grayscale(90%);
}
</style>

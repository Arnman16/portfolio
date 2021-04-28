<template>
  <span class="d-flex align-center">
    <v-btn
      width="240px"
      tile
      text
      plain
      large
      class="no-uppercase align-left"
      to="/"
      ><span class="my-title" v-if="$route.name !== 'Home'">
        <keyframes
          component="span"
          v-if="intro"
          :on-end="afterIntro"
          loop="false"
        >
          <span duration="150"
            >Aaron<span class="my-silver">Noseworth</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="150"
            >Aaron<span class="my-silver">Nosewort</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="150"
            >Aaron<span class="my-silver">Nosewor</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="150"
            >Aaron<span class="my-silver">Nosewo</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="150"
            >Aaron<span class="my-silver">Nosew</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="150"
            >Aaron<span class="my-silver">Nose</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="150"
            >Aaron<span class="my-silver">Nos</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="300"
            >Aaron<span class="my-silver">No</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="300"
            >Aaron<span class="my-silver">N</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="125">Aaron<span class="my-yellow">▌</span></span>
          <span duration="400">Aaro<span class="my-yellow">▌</span></span>
        </keyframes>
        <keyframes
          auto-run="true"
          ref="myKeyframes"
          component="span"
          v-show="!intro"
          loop="true"
        >
          <span duration="600">Aaron<span class="my-clear">▌</span></span>
          <span duration="600">Aaron<span class="my-yellow">▌</span></span>
        </keyframes>
      </span>
      <span class="my-title" v-else>
        <keyframes
          v-if="intro"
          component="span"
          :on-end="afterIntro"
          loop="false"
        >
          <span duration="150"
            >Aaron<span class="my-silver">N</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="150"
            >Aaron<span class="my-silver">No</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="150"
            >Aaron<span class="my-silver">Nos</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="150"
            >Aaron<span class="my-silver">Nose</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="150"
            >Aaron<span class="my-silver">Nosew</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="150"
            >Aaron<span class="my-silver">Nosewor</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="150"
            >Aaron<span class="my-silver">Nosewort</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="300"
            >Aaron<span class="my-silver">Noseworth</span
            ><span class="my-yellow">▌</span></span
          >
          <span duration="300"
            >Aaron<span class="my-silver">Noseworthy</span
            ><span class="my-yellow">▌</span></span
          >
        </keyframes>
        <keyframes component="span" v-show="!intro" loop="true">
          <span duration="600"
            >Aaron<span class="my-silver">Noseworthy</span
            ><span class="my-clear">▌</span></span
          >
          <span duration="600"
            >Aaron<span class="my-silver">Noseworthy</span
            ><span class="my-yellow">▌</span></span
          >
        </keyframes>
      </span>
      <v-spacer></v-spacer>
    </v-btn>
    <v-toolbar-items class="hidden-xs-only">
      <span
        justify="space-around"
        align="center"
        v-for="(item, i) in menuItems"
        :key="i"
      >
        <v-hover v-if="getAccess(item.needsAuth)" v-slot="{ hover }">
          <v-btn
            tile
            text
            plain
            :color="item.color"
            class="no-uppercase btn-trans pa-2"
            :class="{
              'on-hover': hover || $route.name == item.title,
            }"
            :to="item.path"
            ><v-img class="mr-4 sep" width="12" :src="item.seperator"></v-img
            >{{ item.title }}
          </v-btn>
        </v-hover>
      </span>
    </v-toolbar-items>
    <!-- </span> -->
    <!-- </v-row> -->
  </span>
</template>

<script>
const hamburgerHover = require("../assets/hamburgerHover.png");
const waterPoint = require("../assets/waterPoint.png");
const waterPointHover = require("../assets/waterPointHover.png");
const musicPoint = require("../assets/musicPoint.png");
const musicPointHover = require("../assets/musicPointHover.png");
const wavePoint = require("../assets/wavePoint.png");
const wavePointHover = require("../assets/wavePointHover.png");
const starPoint = require("../assets/starPoint.png");
import "vue-keyframes";
export default {
  name: "Navbar",

  watch: {
    $route: "setIntro",
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
    user() {
      return this.$store.getters.user;
    },
    routeName() {
      return this.$route.name;
    },
  },
  data() {
    return {
      lastRoute: "",
      intro: true,
      hamburgerHover: hamburgerHover,
      waterPoint: waterPoint,
      waterPointHover: waterPointHover,
      musicPoint: musicPoint,
      musicPointHover: musicPointHover,
      wavePoint: wavePoint,
      wavePointHover: wavePointHover,
      starPoint: starPoint,
      menuItems: [
        {
          title: "Home",
          path: "/",
          icon: "home",
          color: "blue",
          seperator: waterPointHover,
          needsAuth: false,
        },
        {
          title: "About",
          path: "/about",
          icon: "home",
          color: "green",
          seperator: wavePointHover,
          needsAuth: false,
        },
        {
          title: "Posts",
          path: "/posts",
          icon: "home",
          color: "red",
          seperator: musicPointHover,
          needsAuth: false,
        },
        {
          title: "Projects",
          path: "/projects",
          icon: "home",
          color: "yellow",
          seperator: starPoint,
          needsAuth: false,
        },
        {
          title: "Unpublished",
          path: "/unpublished",
          icon: "home",
          color: "grey",
          seperator: musicPointHover,
          needsAuth: true,
        },
      ],
    };
  },
  methods: {
    afterIntro() {
      this.intro = false;
    },
    getAccess(needsAuth) {
      if (!needsAuth) return true;
      console.log(this.user.isAuthenticated);
      return this.user.isAuthenticated;
    },
    setIntro() {
      this.getFrames();
      if (
        this.lastRoute == "Home" ||
        this.routeName == "Home" ||
        this.lastRoute == ""
      )
        this.intro = true;
      this.lastRoute = this.routeName;
    },
    getFrames() {
      // Spelling out each subpage with keyframes (not working)
      const split = this.$route.name.split("");
      let routeFrames = [];
      let routeFrame = "";
      split.forEach((letter) => {
        routeFrame = routeFrame + letter;
        routeFrames.push(routeFrame);
      });
      this.routeFrames = routeFrames;
      console.log(routeFrames);
    },
    mounted() {
      this.routeName = this.$route.name;
    },
    created() {
      // this.$refs.myKeyframes.stop = false;
      // this.routeFrames = new Array(this.$route.name.length);
      // this.getFrames();
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300&display=swap");
.my-title {
  font-family: "Source Code Pro", monospace;
  font-size: large;
}
.btn-trans {
  transition: opacity 0.25s ease-in-out;
  font-weight: bold;
  font-size: large;
  font-family: "Source Code Pro", monospace;
}

.btn-trans:not(.on-hover) {
  opacity: 0.95;
  font-weight: normal;
  font-size: large;
  filter: grayscale(50%);
  font-family: "Source Code Pro", monospace;
}
.my-silver {
  color: rgb(201, 201, 201);
}
.my-yellow {
  color: rgb(200, 252, 118);
  opacity: 0.5;
}
.my-clear {
  opacity: 0;
}
.sep {
  opacity: 0.7;
}
</style>
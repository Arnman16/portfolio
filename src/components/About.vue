<template>
  <v-container fluid>
    <v-card
      :color="
        $vuetify.theme.dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)'
      "
      class="ma-3"
      ><v-container>
        <div class="content-text-home">
          <h1 class="mx-auto mt-5">About Me</h1>
          <br />
          Hi, I'm Aaron!<br /><br />
          I'm a Software Engineering Technology graduate employed as an Offshore Survey
          Technologist for the past 8 years. <br /><br />
          My current career has been a blast and allowed me to travel all over
          the world and learn a lot of neat technologies, but it's time for me
          to shift back to what I truly love: <strong>coding.</strong>
          <br /><br />
          Over the past few years I have sharpened my programming skills, and
          been challenging myself with personal projects to learn as much as I
          can while also building my portfolio.
          <br /><br />
          When I'm not coding, I spend a lot of my time learning about new and
          exciting development technologies or making music. I've been
          playing piano most of my life and love producing bad electronic music
          and nasty synth patches.
          <br /><br />
          Thank you for taking the time to visit my site, and if you would like
          to get in touch please reach shoot me an email, or reach out using one
          of the other links below:

          <h4 class="ma-2">Say Hello!</h4>
          <v-list
            dense
            :color="
              $vuetify.theme.dark
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(255,255,255,0.5)'
            "
          >
            <v-list-item-group>
              <div v-for="(item, i) in items" :key="i">
                <v-list-item :href="item.link" target="_blank">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-list-item-group>
          </v-list>
          <v-img class="mx-auto mt-3 mb-3" width="25%" :src="profile"></v-img>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
const profile = require("../assets/profile.png");
export default {
  name: "about",
  components: {},
  computed: {},
  data() {
    return {
      profile: profile,
      items: [
        {
          text: "aaron.noseworthy@gmail.com",
          icon: "mdi-email",
          link: "mailto:aaron.noseworthy@gmail.com",
        },
        {
          text: "https://github.com/Arnman16",
          icon: "mdi-github",
          link: "https://github.com/Arnman16",
        },
        {
          text: "https://www.linkedin.com/in/aaron-noseworthy-a69b4215b",
          icon: "mdi-linkedin",
          link: "https://www.linkedin.com/in/aaron-noseworthy-a69b4215b",
        },
      ],
    };
  },
};
</script>

<style scoped>
.content-text >>> p {
  /* color: red; */
  line-height: 1px;
  margin: 10px 0;
}
.content-text {
  font-size: 16px;
  font-weight: 250;
}
</style>
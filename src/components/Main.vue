<template>
  <v-container fluid fill-height>
    <v-row justify="space-around" align="center">
      <v-col align="center">
        <div class="title-text-home">HI!</div>
        <div class="content-text-home">
          <h3>Front-end Developer | Gibraltar</h3>
          <br />
          A graduate of Internet Computing, I combine my education with 6 years
          commercial experience in CSS, JavaScript, React and design to produce
          creative and effective websites for happy clients. I enjoy turning
          complex problems into simple, beautiful and intuitive solutions. When
          I'm not coding or pushing pixels, you'll find me in the gym, playing
          Football or scoring over par on the Golf course.
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Main",
  computed: {},
  data() {
    return {};
  },
};
</script>

<style>
.main-text {
  /* TEXT COLOR */
  color: #eef1f3;
}

.content-text-home {
  color: #e1f5fe;
  font-size: large;
  line-height: 1.7em;
  font-weight: 300;
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  padding: 16px 16px 6px 16px;
}

.content-text-mobile {
  color: #e1f5fe;
  font-size: 17px;
  line-height: 1.7em;
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  padding: 16px 16px 6px 16px;
}

.content-text-home p {
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
}

.title-text-home {
  color: #fff176;
  font-size: xxx-large;
  font-weight: bold;
  line-height: 1.7em;
  padding: 16px 1px 6px 1px;
}
</style>
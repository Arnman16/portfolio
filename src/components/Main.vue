<template>
  <v-container fluid fill-height style="{ 'align-items': center }">
    <v-row justify="space-around" align="center">
      <v-col align="center">
        <div class="title-text-home secondary--text" >Hi, I'm Aaron.</div>
        <div class="content-text-home">
          I love building intuitive apps that just <i>work.</i>
          <h4>
            "When You Do Things Right, People Won’t Be Sure You’ve Done Anything
            at All"
          </h4>
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
  /* color: #e1f5fe; */
  font-size: large;
  line-height: 1.7em;
  font-weight: 300;
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
  /* text-align: left; */
  padding: 0px 16px 6px 16px;
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

h4 {
  padding-top: 10px;
}
.content-text-home p {
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
}

.title-text-home {
  font-size: xxx-large;
  font-weight: bold;
  line-height: 1.7em;
  padding: 16px 1px 1px 1px;
}
</style>
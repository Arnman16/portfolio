<template>
  <v-container class="pa-1" d-flex>
    <v-col>
      <v-row>
        <v-card color="rgba(255,255,255,0.05)" class="mx-auto ma-1">
          <v-card-actions flat class="pa-0">
            <v-btn dark dense v-for="(link, index) in links" :key="index" icon :href="link.url" target="_blank">
              <v-icon small>{{ link.icon }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
      <!-- <v-row>
        <div class="mx-auto ma-1 text-sm-caption">My Portfolio - 2021</div></v-row
      > -->
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      links: [
        {
          icon: "mdi-github",
          url: "https://github.com/Arnman16",
        },
        {
          icon: "mdi-heart",
          url: "https://aaronnoseworthy.com",
        },
        {
          icon: "mdi-twitter",
          url: "https://twitter.com/AaronNoseworthy",
        },
        {
          icon: "mdi-linkedin",
          url: "https://www.linkedin.com/in/aaron-noseworthy",
        },
      ],
    };
  },
};
</script>

<style></style>

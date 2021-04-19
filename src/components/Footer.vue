<template>
  <v-container class="pa-1" d-flex>
    
    <v-col>
      <v-row>
        <v-card
          color="rgba(255,255,255,0.05)"
          class="mx-auto ma-1"
        >
          <v-card-actions flat class="pa-0">
            <v-btn dense v-for="(link, index) in links" :key="index" icon>
              <v-icon small>{{ link }}</v-icon>
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
      links: ["mdi-github", "mdi-heart", "mdi-twitter"],
    };
  },
};
</script>

<style>
</style>
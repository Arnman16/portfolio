<template>
  <v-sheet color="background">
    <v-card color="rgba(255,255,255,0.05)" class="mx-auto ma-0">
      <v-toolbar color="rgba(255,255,255,0.05)" flat class="mx-auto ma-3">
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <v-layout align-center justify-center>
        <v-form @submit.prevent="userLogin" ref="form" min-width="400">
          <v-card-text>
            <v-text-field
              full-width
              :disabled="loggingIn"
              prepend-icon="mdi-account"
              name="username"
              id="username"
              label="Username"
              type="email"
              autocomplete="username"
              v-model="user.email"
            ></v-text-field>
            <v-text-field
              id="password"
              :disabled="loggingIn"
              prepend-icon="mdi-lock"
              name="password"
              label="Password"
              type="password"
              autocomplete="current-password"
              v-model="user.password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="loggingIn"
              elevation="0"
              outlined
              type="submit"
              :style="'border: 1px solid rgba(255,255,255,0.5);'"
              @click.prevent="userLogin"
              ><span v-if="loggingIn"
                ><v-progress-circular indeterminate></v-progress-circular></span
              ><span v-else>Login</span></v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-layout>
      <v-slide-y-transition>
        <v-alert
          text
          :color="loginError.level"
          dense
          v-show="loginError.message"
        >
          <v-layout align-center justify-center>
            {{ loginError.message }}
          </v-layout>
        </v-alert>
      </v-slide-y-transition>
    </v-card>
  </v-sheet>
</template>

<script>
// import firebase from "firebase";
export default {
  name: "Login",
  computed: {
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
    loggingIn: {
      get() {
        return this.$store.getters.loggingIn;
      },
      set(newBool) {
        return this.$store.dispatch("setLoggingIn", newBool);
      },
    },
  },
  watch: {
    loginWindow() {
      this.$refs.form.reset();
    },
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    userLogin() {
      this.loggingIn = true;
      this.$store.dispatch("login", {
        email: this.user.email,
        password: this.user.password,
      });
    },
  },
  created() {
    // console.log(db);
  },
  mounted() {
    // this.db = db;
  },
  destroyed() {},
};
</script>

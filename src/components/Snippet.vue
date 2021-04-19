<template>
  <!-- Two-way Data-Binding -->
  <!-- <codemirror v-model="code" :options="cmOptions" /> -->

  <!-- Or manually control the data synchronization -->
  <div>
    <div class="code-icon-wrapper">
      <v-tooltip top>
        <template #activator="{ on }">
          <v-icon @click="copyText" class="code-icon" v-on="on" dense>{{
            codeInfo.icon
          }}</v-icon>
        </template>
        <span>{{ codeInfo.language }}</span>
      </v-tooltip>
      <codemirror
        class="pa-0"
        ref="cmEditor"
        :value="codeContent"
        :options="cmOptions"
        @ready.passive="onCmReady"
        @focus.passive="onCmFocus"
        @input.passive="onCmCodeChange"
      />
    </div>
    <v-snackbar
      :style="{
        color: 'red',
        opacity: 0.8,
      }"
      text
      v-model="copyMessage"
      timeout="1500"
    >
      <v-container class="ma-0 pa-0" fluid fill-height>
        <v-row justify="space-around" align="center">
          <v-col class="ma-0 pa-0" align="center">
            <span class="text--primary">Code copied to clipboard!</span>
          </v-col>
        </v-row>
      </v-container>
    </v-snackbar>
  </div>
</template>

<script>
// import language js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/vue/vue.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/django/django.js";

import { codemirror } from "vue-codemirror";

// import theme style
// import "codemirror/theme/base16-dark.css";
import "codemirror/theme/material-darker.css";

// import more 'codemirror/some-resource...'

export default {
  name: "snippet",
  props: {
    code: {
      type: String,
      default: "",
      required: false,
      height: "auto",
    },
    lang: {
      type: String,
      default: "javascript",
      required: false,
      height: "auto",
    },
  },
  components: {
    codemirror,
  },
  data() {
    return {
      copyMessage: false,
      codeInfo: {
        mode: "text/javascript",
        icon: "mdi-language-javascript",
        language: "Code",
      },
      cmOptions: {
        tabSize: 4,
        mode: "text/javascript",
        theme: "material-darker",
        lineNumbers: true,
        passive: true,
        line: true,
        readOnly: true,
        matchTags: { bothTags: true },
        // more CodeMirror options...
      },
      codeContent: "",
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    onCmReady(cm) {
      // console.log("the editor is readied!", cm);
    },
    // eslint-disable-next-line no-unused-vars
    onCmFocus(cm) {
      // console.log("the editor is focused!", cm);
    },
    onCmCodeChange(newCode) {
      // console.log("this is new code", newCode);
      this.codeContent = newCode;
    },
    async copyText() {
      await navigator.clipboard.writeText(this.codeContent);
      this.copyMessage = true;
    },
    formatLang(lang) {
      switch (lang.toLowerCase()) {
        default:
          return {
            mode: "text/javascript",
            icon: "mdi-language-javascript",
            language: "Javascript",
          };
        case "html" || "htmlmixed" || "mixedhtml":
          return {
            mode: "htmlmixed",
            icon: "mdi-language-html5",
            language: "HTML",
          };
        case "js" || "javascript" || "text/javascript" || "text":
          return {
            mode: "text/javascript",
            icon: "mdi-language-javascript",
            language: "Javascript",
          };
        case "python" || "py" || "py2" || "py3" || "python2" || "python3":
          return {
            mode: "python",
            icon: "mdi-language-python",
            language: "Python",
          };
        case "vue" || "vuejs" || "vue.js":
          return {
            mode: "vue",
            icon: "mdi-vuejs",
            language: "Vue.js",
          };
        case "css" || "css3" || "scss":
          return {
            mode: "css",
            icon: "mdi-language-css3",
            language: "CSS",
          };
        case "django" || "dj":
          return {
            mode: "django",
            icon: "mdi-alpha-d-box",
            language: "Django",
          };
        case "java":
          return {
            mode: "text/javascript",
            icon: "mdi-language-java",
            language: "Java",
          };
      }
    },
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror;
    },
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
  },
  mounted() {
    this.codeContent = this.code;
    this.codeInfo = this.formatLang(this.lang);
    this.cmOptions.mode = this.codeInfo.mode;
    // this.codemirror...
  },
};
</script>

<style>
.vue-codemirror .CodeMirror {
  height: auto;
}

.CodeMirror {
  height: auto;
  border: 1px solid #eee;
  z-index: 1;
}
.code-icon-wrapper {
  max-width: 700px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 12px;
}
.code-icon {
  position: absolute !important;
  top: 10px;
  right: 10px;
  z-index: 2;
}
.v-snack__content {
  justify-content: flex-start;
}
</style>
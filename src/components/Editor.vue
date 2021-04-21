<template>
  <quill-editor
    id="pasteStuff"
    class="quill-editor"
    v-model="editorContent"
    ref="myQuillEditor"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
    @change="onEditorChange($event)"
  >
    <div id="toolbar" slot="toolbar">
      <!-- Add a bold button -->
      <v-spacer></v-spacer>
      <v-row
        justify="space-around"
        align="center"
        class="ml-5 pl-5 pr-5 mr-5 mt-0 mb-0"
      >
        <v-col class="pa-1" cols="1">
          <button class="ql-bold">Bold</button>
        </v-col>
        <v-col class="pa-1" cols="1">
          <button class="ql-italic">Italic</button>
        </v-col>
        <!-- Add font size dropdown -->
        <v-col class="pa-1" cols="2">
          <select class="ql-size">
            <option value="small"></option>
            <!-- Note a missing, thus falsy value, is used to reset to default -->
            <option selected></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
        </v-col>
        <v-col class="pa-2" cols="2">
          <select class="ql-font">
            <option selected="selected"></option>
            <option value="serif"></option>
            <option value="monospace"></option>
          </select>
        </v-col>
        <!-- Custom -->
        <v-spacer></v-spacer>
        <v-col align="center" class="pa-2 mx-auto" cols="3">
          <v-btn
            light
            small
            block
            color="white"
            class="toolbar-button no-uppercase mx-auto"
            @click.prevent="submit(published)"
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </quill-editor>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "Editor",
  components: {
    quillEditor,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    submit: {
      type: Function,
    },
  },
  watch: {},
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    editorContent: {
      get() {
        return this.$store.getters.editorContent;
      },
      set(newContent) {
        return this.$store.dispatch("setEditorContent", newContent);
      },
    },
    editorContentPlainText: {
      get() {
        return this.$store.getters.editorContentPlainText;
      },
      set(newContent) {
        return this.$store.dispatch("setEditorContentPlainText", newContent);
      },
    },
  },

  data() {
    return {
      published: false,
      content: "",
      editorOption: {
        modules: {
          toolbar: "#toolbar",
        },
      },
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    onEditorBlur(quill) {
      // console.log("editor blur!", quill);
    },
    // eslint-disable-next-line no-unused-vars
    onEditorFocus(quill) {
      // console.log("editor focus!", quill);
    },
    // eslint-disable-next-line no-unused-vars
    onEditorReady(quill) {
      // console.log("editor ready!", quill);
    },
    // eslint-disable-next-line no-unused-vars
    onEditorChange({ quill, html, text }) {
      // console.log("editor change", quill, html, text);
      this.content = html;
      this.editorContentPlainText = text;
    },
    customButtonClick() {
      console.log("HIHI");
    },
  },
  mounted() {
    // quill by default saves lines as <p></p> creating way too much line spacing.
    // rather than using css to modify the p lineheight I have added the following method
    // to register the Blocks as pre and have an accompanying .pre css class to get the
    // aesthetics I'm trying to accomplish.
    // var Block = Quill.import("blots/block");
    // Block.tagName = "DIV";
    // Block.className = "pre";
    // Quill.register(Block, true);
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300&display=swap");

.pre {
  white-space: pre-wrap !important;
  max-width: 682px;
  margin-left: auto;
  margin-right: auto;
}

.ql-editor p {
  white-space: pre-wrap !important;
  max-width: 682px;
  margin-left: auto;
  margin-right: auto;
}

#toolbar {
  font-family: default;
  font-size: small;
}

#toolbar .toolbar-button {
  /* margin-left: 5px; */
  font-size: 16px;
  color: rgb(56, 54, 54);
  margin: 0;
  padding: 0;
  /* background-color: rgb(124, 123, 187); */
}
.v-window-item .v-window-item--active {
  height: inherit;
}

.v-window-item--active {
  height: inherit;
  max-height: inherit;
}

.quill-editor {
  color: rgb(21, 22, 22);
  background-color: rgb(190, 193, 201);
  max-width: 600px;
}
.ql-container.ql-snow {
  background-color: whitesmoke;
  border: 1.5px solid rgb(61, 61, 61);

  height: auto;
}
.ql-toolbar.ql-snow {
  background-color: rgb(190, 193, 201);
  border: 1.5px solid rgb(61, 61, 61);
  height: auto;
  padding: 0px;
}

.ql-editor {
  white-space: pre !important;
  height: 350px;
  padding-bottom: 10px;
  overflow-y: scroll;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
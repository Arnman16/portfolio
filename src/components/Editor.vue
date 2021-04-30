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
      <v-row
        justify="center"
        align="center"
        class="ml-1 mr-1 mt-0 mb-0"
        no-gutters
      >
        <!-- Add font size dropdown -->
        <v-col class="pa-1" cols="auto">
          <select class="ql-size">
            <option value="small"></option>
            <!-- Note a missing, thus falsy value, is used to reset to default -->
            <option selected></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
        </v-col>
        <v-col class="pa-1" cols="auto">
          <button class="ql-bold">Bold</button>
        </v-col>
        <v-col class="pa-1" cols="auto">
          <button class="ql-italic">Italic</button>
                    <button class="ql-code">Code</button>

        </v-col>
        <v-col class="pa-2" cols="auto">
          <select class="ql-align">
            <option selected="selected"></option>
            <!-- <option value="left"></option> -->
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
          </select>
        </v-col>
        <!-- Custom -->
        <!-- <v-spacer></v-spacer> -->
        <v-col align="center" class="pa-1 mx-1 my-auto" cols="auto">
          <v-btn light @click.prevent="submit(published)" icon
            ><v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-col>
        <v-col align="center" class="pa-1 mx-1 my-auto" cols="auto">
          <v-btn light icon @click.prevent="$router.back()"
            ><v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </quill-editor>
</template>

<script>
import { quillEditor, Quill } from "vue-quill-editor";
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
          clipboard: {
            allowed: {
              tags: [
                "a",
                "img",
                "b",
                "strong",
                "u",
                "s",
                "pre",
                "i",
                "p",
                "br",
                "ul",
                "ol",
                "li",
                "span",
              ],
              attributes: ["href", "src", "rel", "target", "class"],
            },
          },
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
  },
  created() {
    this.editorContent = "";
  },
  mounted() {
    // quill by default saves lines as <p></p> creating way too much line spacing.
    // rather than using css to modify the p lineheight I have added the following method
    // to register the Blocks as pre and have an accompanying .pre css class to get the
    // aesthetics I'm trying to accomplish.
    var Block = Quill.import("blots/block");
    Block.tagName = "DIV";
    Block.className = "pre";
    Quill.register(Block, true);
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300&display=swap");

.pre {
  white-space: pre !important;
  max-width: 682px;
  margin-left: auto;
  margin-right: auto;
}

.ql-editor p {
  white-space: pre !important;
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
  font-size: 14px;
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
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router' // <---
import store from './store'
import { Keyframes } from 'vue-keyframes';
import { auth } from './db'
import VueQuillEditor from 'vue-quill-editor'
import VueCodemirror from 'vue-codemirror'
import "quill-paste-smart";
import 'debounce'
import sanitizeHtml from 'sanitize-html'

// https://github.com/surmon-china/vue-codemirror#readme

// import base style
import 'codemirror/lib/codemirror.css'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false;
Vue.use({ VueQuillEditor, VueCodemirror, sanitizeHtml, Keyframes });
Vue.use(Keyframes);
let app
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
  if (user) {
    store.dispatch("fetchUser", user);
  }
})

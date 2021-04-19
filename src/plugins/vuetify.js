import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

// import colors from 'vuetify/lib/util/colors'

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            dark: {
                background: '#120a23'
            }
        }
    },
});

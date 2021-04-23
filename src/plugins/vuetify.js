import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

import colors from 'vuetify/lib/util/colors'

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            dark: {
                background: '#120a23',
                secondary: colors.blue.lighten3,
            },
            light: {
                primary: colors.purple,
                secondary: colors.blue.darken3,
                accent: colors.shades.black,
                error: colors.red.accent3,
                background: 'rgb(210, 210, 210)'
            },
        }
    },
});

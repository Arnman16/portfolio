import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from './db'
import router from './router'
import sanitizeHtml from 'sanitize-html'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        hello: 'WORLD',
        selected: {},
        drawer: false,
        noise: true,
        project: {},
        user: {
            name: '',
            site: '',
            email: '',
            isAuthenticated: false,
        },
        loginWindow: false,
        loginError: {
            message: '',
            level: 'info',
            error: {},
        },
        loggingIn: false,
        editorContent: '',
        editorContentPlainText: '',
        story: [],
        posts: [],
        post: {},
        loading: true,

    },
    getters: {
        selected: (state) => {
            return state.selected;
        },
        drawer: (state) => {
            return state.drawer;
        },
        loginWindow: (state) => {
            return state.loginWindow;
        },
        noise: (state) => {
            return state.drawer;
        },
        project: (state) => {
            return state.project;
        },
        user: (state) => {
            return state.user;
        },
        loginError: (state) => {
            return state.loginError;
        },
        loggingIn: (state) => {
            return state.loggingIn;
        },
        editorContent: (state) => {
            return state.editorContent;
        },
        editorContentPlainText: (state) => {
            return state.editorContentPlainText;
        },
        story: (state) => {
            return state.story;
        },
        posts: (state) => {
            return state.posts;
        },
        post: (state) => {
            return state.post;
        },
        loading: (state) => {
            return state.loading;
        },
    },
    mutations: {
        SET_SELECTED: (state, newSelection) => {
            state.selected = newSelection;
        },
        SET_DRAWER: (state, newBool) => {
            state.drawer = newBool;
        },
        SET_LOGIN_WINDOW: (state, newBool) => {
            state.loginWindow = newBool;
        },
        SET_NOISE: (state, newBool) => {
            state.noise = newBool;
        },
        SET_PROJECT: (state, newProject) => {
            state.project = newProject;
        },
        SET_USER(state, newUser) {
            state.user = newUser;
        },
        SET_LOGIN_ERROR(state, newError) {
            state.loginError = newError;
        },
        SET_LOGGING_IN(state, newBool) {
            state.loggingIn = newBool;
        },
        SET_EDITOR_CONTENT(state, newContent) {
            state.editorContent = newContent;
        },
        SET_EDITOR_CONTENT_PLAIN_TEXT(state, newContent) {
            state.editorContentPlainText = newContent;
        },
        SET_STORY(state, newStory) {
            state.story = newStory;
        },
        SET_POSTS(state, newPosts) {
            state.posts = newPosts;
        },
        SET_POST(state, newPost) {
            state.post = newPost;
        },
        SET_LOADING(state, isLoading) {
            state.loading = isLoading;
        },
        // other mutations
    },
    actions: {
        setSelected: ({ commit, state }, newSelection) => {
            commit('SET_SELECTED', newSelection)
            return state.selected
        },
        setDrawer: ({ commit, state }, newBool) => {
            commit('SET_DRAWER', newBool)
            return state.drawer
        },
        setLoginWindow: ({ commit, state }, newBool) => {
            commit('SET_LOGIN_WINDOW', newBool)
            return state.loginWindow
        },
        setLoggingIn: ({ commit, state }, newBool) => {
            commit('SET_LOGGING_IN', newBool)
            return state.loggingIn
        },
        setNoise: ({ commit, state }, newBool) => {
            commit('SET_NOISE', newBool)
            return state.noise
        },
        setLoading: ({ commit, state }, newBool) => {
            commit('SET_LOADING', newBool)
            return state.loading
        },
        setProject: ({ commit, state }, newProject) => {
            commit('SET_PROJECT', newProject)
            return state.project
        },
        setLoginError: ({ commit, state }, newError) => {
            commit('SET_LOGIN_ERROR', newError)
            return state.loginError
        },
        setEditorContent: ({ commit, state }, newContent) => {
            // newContent = newContent.replace('<p>', '').replace('</p>', '<br>').replace('\\t', '&nbsp;&nbsp;&nbsp;&nbsp;');
            commit('SET_EDITOR_CONTENT', newContent);
            return state.editorContent;
        },
        setEditorContentPlainText: ({ commit, state }, newContent) => {
            // newContent = newContent.replace('<p>', '').replace('</p>', '<br>').replace('\\t', '&nbsp;&nbsp;&nbsp;&nbsp;');
            commit('SET_EDITOR_CONTENT_PLAIN_TEXT', newContent);
            return state.editorContentPlainText;
        },
        createStory: ({ commit, state }) => {
            commit('SET_STORY', []);
            // remove potentially malicious html
            console.log(state.editorContent, state.editorContent.length);
            const cleanedHtml = sanitizeHtml(state.editorContent);
            console.log(cleanedHtml, cleanedHtml.length);

            let contentHtml = cleanedHtml.split('{{{');
            let contentText = state.editorContentPlainText.split('{{{');
            let story = [];
            let langDefault = 'javascript'
            contentText.forEach(function (textSection, index) {
                try {
                    const htmlBlock = contentHtml[index].split('}}}');
                    const plainBlock = textSection.split('}}}');
                    if (plainBlock.length === 1) {
                        // adding vuetify's responsive content css helper class to images. 
                        let newImageFormat = htmlBlock[0].replace('<img', '<img class="v-responsive__content" ')
                        story.push({
                            type: 'text',
                            content: newImageFormat.trim()
                        })
                    }
                    else {
                        let newImageFormat = htmlBlock[1].replace('<img', '<img class="v-responsive__content" ')
                        let code, lang, parseLang;
                        if (plainBlock[0].includes('%%')) {
                            // select the coding language with the opening brackets
                            // ex. {{{python%%
                            parseLang = plainBlock[0].trim().split('%%');
                            code = parseLang[1];
                            lang = parseLang[0];
                            if (lang.charAt(lang.length - 1) === '!') {
                                // If you use an '!' after a lang, it will be set as the
                                // default for the following code sections.
                                // factory default is javascript.
                                // ex. {{{python!%%
                                lang = lang.slice(0, -1);
                                langDefault = lang;
                            }
                            story.push({
                                type: 'code',
                                lang: lang,
                                content: code.trim(),
                            });
                        }
                        else {
                            story.push({
                                type: 'code',
                                lang: langDefault,
                                content: plainBlock[0].trim(),
                            });
                        }
                        story.push({
                            type: 'text',
                            content: newImageFormat.trim()
                        });
                    }
                } catch (error) {
                    console.log(error)
                }
            });
            commit('SET_STORY', story);
            return state.story;
        },
        async login({ dispatch }, form) {
            // reset error message
            dispatch('setLoginError', {
                message: '',
                error: {},
            });
            // sign user in
            await fb.auth.signInWithEmailAndPassword(
                form.email, form.password)
                .then(function (result) {
                    console.log('fetching user.');
                    dispatch('setLoginError', {
                        message: 'Credentials verified, logging in',
                        error: {},
                        level: 'info',
                    });
                    dispatch('fetchUser', result.user);
                    if (router.currentRoute.path === "/login") router.push('/');
                })
                .catch(function (error) {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.email;
                    const credential = error.credential;
                    dispatch('setLoginError', {
                        message: errorMessage,
                        error: error,
                        level: 'error',
                    });
                    dispatch('setLoggingIn', false);
                    console.log(errorCode, errorMessage, email, credential);
                    dispatch('setLoading', false);
                })
            // fetch user profile and set in state
        },
        async signup({ dispatch }, form) {
            // sign user up
            const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            // create user object in userCollections
            await fb.usersCollection.doc(user.uid).set({
                email: form.email,
                name: form.name,
                site: form.site
            })

            // fetch user profile and set in state
            dispatch('fetchUser', user)
        },
        async createPost({ dispatch, state }, post) {
            var user = fb.auth.currentUser;
            if (!user) {
                console.log("Not logged signed in");
                router.push('/login');
                return
            }
            // var name, email, photoUrl, uid, emailVerified;
            // name = user.displayName;
            // email = user.email;
            // photoUrl = user.photoURL;
            // emailVerified = user.emailVerified;
            // uid = user.uid;
            // 
            // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            const content = state.editorContent;
            const plainText = state.editorContentPlainText;
            const story = state.story;
            const created = new Date();
            const modified = '';
            // UPDATE
            await fb.postsCollection.doc(post.slug).set({
                // await fb.postsCollection.add({
                user: {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                },
                author_uid: user.uid,
                title: post.title,
                category: post.category,
                slug: post.slug,
                published: post.published,
                content: content,
                plainText: plainText,
                story: story,
                created: created,
                modified: modified,
            });
            dispatch('fetchPosts');
            router.push('/posts');
        },
        async editPost({ dispatch, state }, post) {
            var user = fb.auth.currentUser;
            if (!user) {
                console.log("Not logged signed in");
                router.push('/login');
                return
            }
            if (post.oldSlug != post.slug) {
                // removes old post if they change the title.
                // this is needed because the post name is tied to the primary key 
                console.log('rename detected, removing old post.')
                fb.postsCollection.doc(post.oldSlug).delete();
            }
            const content = state.editorContent;
            const plainText = state.editorContentPlainText;
            const story = state.story;
            const created = state.post.created;
            const modified = new Date();
            // UPDATE
            await fb.postsCollection.doc(post.slug).set({
                // await fb.postsCollection.add({
                user: {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                },
                title: post.title,
                category: post.category,
                slug: post.slug,
                published: post.published,
                content: content,
                plainText: plainText,
                story: story,
                created: created,
                modified: modified,
            });
            dispatch('fetchPosts');
            router.push('/posts');
        },
        setPost: ({ commit, state }, newPost) => {
            commit('SET_POST', newPost)
            return state.post
        },
        async fetchPost({ commit, state }, slug) {
            if (Object.keys(state.post).length !== 0) return;
            commit('SET_LOADING', true);
            let selection = fb.postsCollection.doc(slug);
            selection.get().then((post) => {
                if (post.exists) {
                    commit('SET_POST', post.data());
                    commit('SET_LOADING', false);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    commit('SET_LOADING', false);
                    router.push('/posts')
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
                commit('SET_LOADING', false);
            });
        },
        async fetchPostEdit({ commit }, slug) {
            let selection = fb.postsCollection.doc(slug);
            selection.get().then((post) => {
                if (post.exists) {
                    const data = post.data();
                    commit('SET_POST', data);
                    commit('SET_EDITOR_CONTENT', data.content);
                    commit('SET_EDITOR_CONTENT_PLAIN_TEXT', data.plainText);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        },
        async fetchPosts({ commit }) {
            let published = false;
            if (router.currentRoute.path === '/posts') published = true;
            console.log('fetchPosts')
            fb.postsCollection.where('published', "==", published).orderBy('created', 'desc').onSnapshot(snapshot => {
                let postsArray = []

                snapshot.forEach(doc => {
                    let post = doc.data()
                    post.id = doc.id

                    postsArray.push(post)
                });
                commit('SET_POSTS', postsArray);
                commit('SET_LOADING', false);
                return postsArray;


            })
        },
        async deletePost({ dispatch }, idToRemove) {
            console.log(idToRemove, 'deleted', dispatch);
            return await fb.postsCollection.doc(idToRemove).delete()
                .then(() => {
                    console.log('Post Deleted.')
                })
                .catch((error) => {
                    console.log("Error deleting post:", error);
                });
        },
        async authCheck({ dispatch }) {
            if (fb.auth.currentUser) await dispatch('fetchUser', fb.auth.currentUser);
            else console.log('oops');
        },
        async fetchUser({ commit, dispatch }, user) {
            commit('SET_LOADING', true);
            // fetch user profile
            // set user profile in state
            try {
                const thisUser = await fb.usersCollection.doc(user.uid).get();
                const userData = thisUser.data();
                if (userData) {
                    userData.isAuthenticated = true;
                    userData.uid = user.uid;
                    dispatch('setLoginError', {
                        message: 'Success!',
                        error: {},
                        level: 'success',
                    });
                    commit('SET_USER', userData);
                    dispatch('setLoginWindow', false);
                    dispatch('setDrawer', false);
                    dispatch('setLoggingIn', false);
                    dispatch('setLoading', false);
                    dispatch('setLoginError', {
                        message: '',
                        error: {},
                        level: '',
                    });
                    if (router.currentRoute.path === '/login/') router.push('/');
                }
            }
            catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
                dispatch('setLoggingIn', false);
                dispatch('setLoginError', {
                    message: errorMessage,
                    error: error,
                    level: 'error'
                });
                console.log(errorCode, errorMessage, email, credential);
                dispatch('setLoading', false);
            }
        },
        setUser: ({ commit, state }, newUser) => {
            commit('SET_USER', newUser)
            return state.user;
        },
        async logout({ dispatch }) {
            fb.auth.signOut()
                .then(function () {
                    dispatch('setUser', {});
                    if (router.currentRoute.path !== '/') router.push('/');

                    // dispatch('setDrawer', false);
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        // other actions
    }
})
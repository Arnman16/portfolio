import VueRouter from "vue-router";
import Vue from 'vue'
// import { auth } from '../db'
import Main from "@/components/Main.vue";
import Test from "@/components/Test.vue";
import Tests from "@/components/Tests.vue";
import About from "@/components/About.vue";
import Projects from "@/components/Projects.vue";
import Project from "@/components/Project.vue";
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import Snippet from "@/components/Snippet.vue";
import Submit from "@/components/Submit.vue";
import Posts from "@/components/Posts.vue";
import Post from "@/components/Post.vue";
// import Unpublished from "@/components/Unpublished.vue";
// import UnpublishedPost from "@/components/UnpublishedPost.vue";
// import Edit from "@/components/Edit.vue";
import store from "@/store"


Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.user.isAuthenticated) {
        next()
        return
    }
    next('/')
}

const ifAuthenticated = (to, from, next) => {
    if (store.getters.user.isAuthenticated) {
        next();
        return;
    }
    // let user = auth.currentUser;
    store.dispatch('authCheck')
        .then(function () {
            if (store.getters.user.isAuthenticated) {
                next();
                return;
            }
            else {
                next('/login');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

const routes = [
    {
        path: "/",
        name: "Home",
        component: Main,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/posts",
        name: "Posts",
        component: Posts,
    },
    {
        path: '/posts/:slug',
        name: "Post",
        component: Post,
    },
    {
        path: '/edit/:slug',
        name: "Edit",
        component: Submit,
        beforeEnter: ifAuthenticated,
    },
    {
        path: "/snippet",
        name: "Snippet",
        component: Snippet,
    },
    {
        path: "/submit",
        name: "Submit",
        component: Submit,
        beforeEnter: ifAuthenticated,
    },
    {
        path: "/unpublished",
        name: "Unpublished",
        component: Posts,
        beforeEnter: ifAuthenticated,
    },
    {
        path: "/unpublished/:slug",
        name: "UnpublishedPost",
        component: Post,
        beforeEnter: ifAuthenticated,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: "/signup",
        name: "Signup",
        component: Signup,
        beforeEnter: ifAuthenticated,
    },
    {
        path: "/projects",
        name: "Projects",
        component: Projects,
    },
    {
        path: '/projects/:id',
        name: "Project",
        component: Project,
        parent: Projects,
    },
    {
        path: "/test",
        name: "Test",
        component: Test,
        children: [
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: 'tests',
                component: Tests
            },
        ]
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    // eslint-disable-next-line no-unused-vars
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});

export default router;
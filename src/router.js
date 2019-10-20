import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import VueRouter from 'vue-router';

Vue.use(Router);
Vue.use(VueRouter);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/SignUp.vue")
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/Settings.vue")
    },
    {
      path: "/create_article",
      name: "create_article",
      component: () => import("@/views/CreateArticle.vue")
    },
    {
      path: "/article/:id",
      name: "show_article",
      component: () => import("@/views/Article.vue")
    },
    {
      path: "/editor/:id",
      name: "update_article",
      component: () => import("@/views/UpdateArticle.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/Profile.vue")
    },
    {
      path: "/:username",
      name: "profile",
      component: () => import("@/views/Profile.vue")
    }
  ]
});

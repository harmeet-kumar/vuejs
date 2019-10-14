import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
import articles from "./modules/articles";
import tags from "./modules/tags";
import comments from "./modules/comments";
import AllIosIcon from "vue-ionicons/dist/ionicons-ios.js";

Vue.use(AllIosIcon);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    articles,
    tags,
    comments
  }
});

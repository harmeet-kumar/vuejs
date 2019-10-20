import Vue from "vue";
import Vuex from "vuex";

import users from "./modules/users";
import articles from "./modules/articles";
import tags from "./modules/tags";
import comments from "./modules/comments";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    articles,
    tags,
    comments
  }
});

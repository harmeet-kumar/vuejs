import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/main.css";
require("vue-ionicons/ionicons.css");
Vue.config.productionTip = false;



// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch("checkAuth")]).then(next)
);

new Vue({
  router : router,
  store,
  render: h => h(App)
}).$mount("#app");

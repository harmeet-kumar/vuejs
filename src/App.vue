<template>
  <div id="app">
    <Header>
      <link
        href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css"
        rel="stylesheet"
      />
    </Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

import { axiosApi } from "./store/api";

export default {
  components: {
    Header,
    Footer
  },
  created: function() {
    axiosApi.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.commit("users/logOutUser");
        }
        throw err;
      });
    });
  }
};
</script>
<style></style>

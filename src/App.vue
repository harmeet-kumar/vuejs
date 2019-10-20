<template>
  <div id="app">
    <Header>
      <link
        href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css"
        rel="stylesheet"
      />
    </Header>
    <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
 // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';
    
import { axiosApi, clearToken } from "./store/api";
import store from "./store";
import { LOGOUT_USER } from "./shared/constants";

export default {
  components: {
    Header,
    Footer,
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true
    }
  },
  methods: {
    doAjax() {
        this.isLoading = true;
        // simulate AJAX
        setTimeout(() => {
          this.isLoading = false
        },3000)
    },
    onCancel() {
    }
  },
  created: function() {
    axiosApi.interceptors.request.use((config) => {
    // trigger 'loading=true' event here
      this.doAjax();
      return config;
      }, (error) => {
        this.onCancel();
      // trigger 'loading=false' event here
      return Promise.reject(error);
    });

    axiosApi.interceptors.response.use((response) => {
      this.onCancel();
      return response;
    }, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          store.commit(LOGOUT_USER);
        }
        throw err;
      });
    });
  }
}
</script>
<style></style>

<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Kratos</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link to="/" class="nav-link active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create_article" v-if="username != null" class="nav-link">
            <i class="ion-compose"></i>&nbsp;New Post
          </router-link>
        </li>
        <li class="nav-item" v-if="username">
          <router-link to="/settings" class="nav-link">
            <i class="ion-gear-a"></i>&nbsp; Settings
          </router-link>
        </li>
        <li class="nav-item" v-if="username == null">
          <router-link to="/login" class="nav-link">Sign In</router-link>
        </li>
        <li class="nav-item" v-if="username == null">
          <router-link to="/signup" class="nav-link">Sign Up</router-link>
        </li>
        <li class="nav-item" v-if="username">
          <router-link :to="`/${username}`" class="nav-link">
            &nbsp;
            <img :src="image" class="user-pic" />
            {{ username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import store from "../store"

export default {
  data: function() {
    return {
      img: ""
    };
  },
  computed: {
    username() {
      return store.getters["user"]
        ? store.getters["user"].username
        : null;
    },
    image() {
      return store.getters["user"]
        ? store.getters["user"].image
        : null;
    }
  },
  created() {
    if (localStorage.getItem("user")) {
      store.commit("updateUserFromLocal");
    }
  }
};
</script>

<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="index.html">Kratos</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link to="/" class="nav-link active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create_article" class="nav-link">
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
            <i class="ion-gear-a"></i>&nbsp;
            {{ username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.getters["users/user"]
        ? this.$store.getters["users/user"].username
        : null;
    }
  },
  created() {
    if (localStorage.getItem("user")) {
      this.$store.commit("users/updateUserFromLocal");
    }
  }
};
</script>

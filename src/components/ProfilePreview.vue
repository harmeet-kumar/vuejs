<template>
  <div class="col-xs-12 col-md-10 offset-md-1" v-if="activeUser">
    <img v-if="activeUser" :src="activeUser.image" onerror="this.src='https://static.productionready.io/images/smiley-cyrus.jpg';" class="user-img" />
    <h4 v-if="activeUser">{{ activeUser.username }}</h4>
    <p>
      {{ activeUser.bio }}
    </p>
    <div v-if="activeUser && admin && activeUser.username == admin.username">
              <router-link
                class="btn btn-sm btn-outline-secondary action-btn"
                to="/settings"
              >
                <i class="ion-gear-a"></i> Edit Profile Settings
              </router-link>
            </div>
    <button
      class="btn btn-sm btn-outline-secondary action-btn"
      @click="followUser" v-bind:class="{ active: flwUser, 'text-danger': flwUser }"
      v-if="activeUser && admin && activeUser.username != admin.username"
    >
      <i class="ion-plus-round"></i>
      &nbsp; <span v-if="!flwUser">Follow </span><span v-if="flwUser">UnFollow </span>{{ activeUser.username }}
    </button>
  </div>
</template>
<script>
export default {
  props: ["activeUser", "admin"],
  data: function() {
    return {
      flwUser: false
    };
  },
  computed: {
    updtFlag() {
      return this.activeUser.following;
    }
  },
  methods: {
    followUser() {
      if (this.activeUser.username != this.admin.username) {
        let operation = "followUser";
        this.flwUser = !this.flwUser;
        if (this.activeUser.following) {
          operation = "unFollowUser";
        }
        this.$emit("click", {
          operation: operation,
          username: this.activeUser.username
        });
      }
    }
  },
  created() {
    this.flwUser = this.activeUser.following;
  }
};
</script>

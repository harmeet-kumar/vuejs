<template>
  <div class="col-xs-12 col-md-10 offset-md-1">
    <img :src="activeUser.image" class="user-img" />
    <h4>{{ activeUser.username }}</h4>
    <p>
      {{ activeUser.bio }}
    </p>
    <button
      class="btn btn-sm btn-outline-secondary action-btn"
      @click="followUser"
      v-if="!activeUser.following && activeUser.username != admin.username"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{ activeUser.username }}
    </button>
  </div>
</template>
<script>
export default {
  props: ["activeUser", "admin"],
  methods: {
    followUser() {
      if (this.activeUser.username != this.admin.username) {
        this.$emit("click", {
          operation: !this.activeUser.following,
          slug: this.activeUser.username
        });
      }
    }
  }
};
</script>

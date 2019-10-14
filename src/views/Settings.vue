<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  v-model="imageURL"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  v-model="username"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  v-model="bio"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  v-model="email"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  v-model="pwd"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logOut">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      imageURL: "",
      pwd: ""
    };
  },
  computed: {
    username() {
      return this.$store.getters["users/user"]
        ? this.$store.getters["users/user"].username
        : null;
    },
    email() {
      return this.$store.getters["users/user"]
        ? this.$store.getters["users/user"].email
        : null;
    },
    bio() {
      return this.$store.getters["users/user"]
        ? this.$store.getters["users/user"].bio
        : null;
    }
  },
  methods: {
    updateUser() {},
    logOut() {
      this.$store.commit("users/logOutUser");
      this.$router.push("/");
    }
  }
};
</script>

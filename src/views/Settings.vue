<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ul class="error-messages" v-if="errors.length>0">
            <li v-for="error in errors" :key="error">{{error}}</li>
          </ul>
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
                  type="text" required maxlength="20" minlength="1"
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
                  type="email" required
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  v-model="password"
                  type="password" minlength="8"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" @click="updateUser">
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
import store from "../store";
import {UPDATE_USER,USER,LOGOUT_USER} from "../shared/constants";

export default {
  data: function() {
    return {
      imageURL: "",
      password: "",
      bio: "",
      username : "",
      email: "",
      currentUser: '',
      errors: []
    };
  },
  computed: {
    
  },
  methods: {
    /**
     * Update the User Profile.
     */
    updateUser() {
      let user = {
        username : this.username != '' ? this.username : this.currentUser.username,
        password : this.password != '' ? this.password : this.currentUser.password,
        email : this.email != '' ? this.email : this.currentUser.email,
        image : this.imageURL != '' ? this.imageURL : this.currentUser.image,
        bio : this.bio != '' ? this.bio : this.currentUser.bio,
      };
      try {
        store.dispatch(UPDATE_USER,user).then((response)=> {
          this.$router.push("/"+this.username);
        })
      } catch(err) {
        let error = err.response.data.errors;
        for (var key in error){
          this.errors.push(key+" "+error[key]);   
        }
      }
    },
    /**
     * LogOut the signed in User.
     */
    logOut() {
      store.commit(LOGOUT_USER);
      this.$router.push("/");
    }
  },
  created() {
    this.errors = [];
    let user = store.getters[USER];
    if (user) {
      this.username = user.username;
      this.bio = user.bio;
      this.email = user.email;
      this.imageURL = user.image;
      this.currentUser = user;
    }
  }
};
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link to="login">Have an account?</router-link>
          </p>

          <ul class="error-messages" v-if="errors.length > 0">
            <li v-for="error in errors" :key="error">{{error}}</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="username"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </fieldset>
            <button type="button" class="btn btn-lg btn-primary pull-xs-right" @click="signUp">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import store from "../store";
import {SIGNUP_USER} from "../shared/constants";

export default {
  data : function() {
    return {
        email: '',
        password: '',
        username: '',
        errors: []
      };
  },
  methods: {
    /**
     * Register the User.
     */
    signUp() {
      this.errors = [];
      store.dispatch(SIGNUP_USER, {
          email: this.email,
          password : this.password,
          username : this.username
        }).then(() => {
          this.errors = [];
          this.$router.push("/");
        }).catch(err => {
          let error = err.response.data.errors;
          for (var key in error) {
            this.errors.push(key+" " + error[key]);   
          }
      });
    }
  }
}

</script>

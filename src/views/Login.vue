<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link to="signup">Need an account?</router-link>
          </p>

          <ul class="error-messages" v-if="errors.length>0">
            <li v-for="error in errors" :key="error">{{error}}</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button @click="login" type="button" class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import {LOGIN_USER} from "../shared/constants";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    /**
     * Login user on login button click
     */
    login() {
      this.errors = [];
      store.dispatch(LOGIN_USER, {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.errors = [];
          this.$router.push("/");
        })
        .catch(err => {
            let error = err.response.data.errors;
            for (var key in error) {
              this.errors.push(key+" " + error[key]);   
            }
        });
    },
    created() {
      this.errors = [];
    }
  }
};
</script>

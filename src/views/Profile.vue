<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <ProfilePreview
            v-if="selectedUser"
            :activeUser="selectedUser"
            :admin="activeUser"
            @click="followUser"
          ></ProfilePreview>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link"
                  v-bind:class="{ active: userArticles }"
                  @click="getUserArticles()"
                  >My Articles</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  v-bind:class="{ active: !userArticles }"
                  @click="getUserFavoriteArticle()"
                  >Favorited Articles</a
                >
              </li>
            </ul>
          </div>

          <div v-if="articles">
            <ArticlePreview
              v-for="article in articles"
              :key="article.slug"
              :article="article"
              @click="getArticle"
            ></ArticlePreview>
          </div>
          <hr />
          <div class="info" v-if="articles.length == 0">
            <span>No favorites by the user...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProfilePreview from "../components/ProfilePreview";
import ArticlePreview from "../components/ArticlePreview";

export default {
  data: function() {
    return {
      userArticles: false,
      userid: ""
    };
  },
  components: {
    ArticlePreview,
    ProfilePreview
  },
  computed: {
    articles() {
      return this.$store.getters["articles/articles"];
    },
    activeUser() {
      return this.$store.getters["users/user"];
    },
    selectedUser() {
      return this.$store.getters["users/selectedUser"];
    }
  },
  methods: {
    getUserArticles() {
      this.$store.dispatch("articles/getArticles", {
        option: "author",
        value: this.userid
      });
      this.userArticles = true;
    },
    getUserFavoriteArticle() {
      this.$store.dispatch("articles/getArticles", {
        option: "favorited",
        value: this.userid
      });
      this.userArticles = false;
    },
    UpdateFavorites() {
      if (!this.userArticles) {
        this.getUserFavoriteArticle();
      }
    },
    getArticle(arg) {
      console.log(arg);
      if (arg.operation === "getArticle") {
        this.$router.push("/article/" + arg.slug);
      } else if (arg.operation === "favArticle") {
        this.$store.dispatch("articles/favouriteArticle", arg.slug).then(() => {
          this.UpdateFavorites();
        });
      } else {
        this.$store
          .dispatch("articles/unFavouriteArticle", arg.slug)
          .then(() => {
            this.UpdateFavorites();
          });
      }
    },
    getSelectedUser(userid) {
      this.$store.dispatch("users/getSelectedUser", userid).then(() => {
        this.getUserArticles(this.userid);
      });
    },
    followUser(args) {
      if (args.operation == false) {
        this.$store.dispatch("articles/followUser", args.username);
      } else {
        this.$store.dispatch("articles/unFollowUser", args.username);
      }
    }
  },
  created() {
    this.userid = this.$route.params.username;
    console.log(this.userid);
    this.getSelectedUser(this.userid);
  }
};
</script>

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
                <span @click="getUserArticles();resetPagination()">
                  <router-link to=""
                  class="nav-link"
                  v-bind:class="{ active: userArticles }"
                  >My Articles</router-link>
                  </span>
              </li>
              <li class="nav-item">
                <span @click="getUserFavoriteArticle()">
                  <router-link to=""
                  class="nav-link"
                  v-bind:class="{ active: !userArticles }"
                  @click="getUserFavoriteArticle();resetPagination()"
                  >Favorited Articles</router-link>
                </span>
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
          <Pagination :pages="pages" :currentPage.sync="currentPage" />
          <hr />
          <div class="info" v-if="articles.length == 0">
            <span v-if="userArticles">No Articles created by the user...</span>
            <span v-if="!userArticles">No favorites by the user...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import ProfilePreview from "../components/ProfilePreview";
import ArticlePreview from "../components/ArticlePreview";
import Pagination from "../components/Pagination";
import store from "../store";
import {SELECTED_USER,ARTICLES,USER,GET_ARTICLES,FAVOURITE_ARTICLE,GET_ARTICLE,ACTION_FAV_ARTICLE,
UNFAVOURITE_ARTICLE,FOLLOW_USER,UNFOLLOW_USER,GET_SELECTED_USER,ARTICLES_COUNT} from "../shared/constants";

export default {
  data: function() {
    return {
      userArticles: false,
      userid: "",
      currentPage : 1,
      itemsPerPage: 10,
      offset: 0,
    };
  },
  components: {
    ArticlePreview,
    ProfilePreview,
    Pagination
  },
  computed: {
    pages() {
      if (this.isLoading || store.getters[ARTICLES_COUNT] <= this.itemsPerPage) {
        return [];
      }
      return [
        ...Array(Math.ceil(store.getters[ARTICLES_COUNT] / this.itemsPerPage)).keys()
      ].map(e => e + 1);
    },
    articles() {
      return store.getters[ARTICLES];
    },
    activeUser() {
      return store.getters[USER];
    },
    selectedUser() {
      return store.getters[SELECTED_USER];
    }
  },
  watch: {
    $route (to){
      this.userid = to.params.username;
      this.getSelectedUser(this.userid);
    },
    currentPage(newValue) {
      this.offset = (newValue - 1) * this.itemsPerPage;
      if(this.userArticles) {
        this.getUserArticles();
      } else {
        this.getUserFavoriteArticle();
      }
    }
  },
  methods: {
    /**
     * Get all the articles created by the user.
     */
    getUserArticles() {
      store.dispatch(GET_ARTICLES, {
        author: this.$route.params.username,
        limit: 10,
        offset : this.offset
      });
      this.userArticles = true;
    },
    /**
     * Get all the favourite articles of the user.
     */
    getUserFavoriteArticle() {
      store.dispatch(GET_ARTICLES, {
        favorited: this.$route.params.username,
        limit: 10,
        offset : this.offset
      }).then(()=> {
        this.userArticles = false;
      })
    },
    /**
     * Update the favourites of the signed in user on favorite button click.
     */
    UpdateFavorites() {
      if (!this.userArticles) {
        this.getUserFavoriteArticle();
      }
    },
    /**
     * Update Fav/UnFav for the user.
     */
    getArticle(arg) {
      if (arg.operation === GET_ARTICLE) {
        this.$router.push("/article/" + arg.slug);
      } 
      else if (arg.operation === ACTION_FAV_ARTICLE) {
        store.dispatch(FAVOURITE_ARTICLE, arg.slug).then(() => {
        }); 
      }
       else {
        store
          .dispatch(UNFAVOURITE_ARTICLE, arg.slug)
          .then(() => {
          });
      }
    },
    /**
     * Get the seleceted user.
     */
    getSelectedUser(userid) {
      store.dispatch(GET_SELECTED_USER, userid).then(() => {
        this.getUserArticles(this.userid);
      });
    },
    /**
     * Follow the selected user, only if the user is signed in.
     */
    followUser(args) {
      if (args.operation == FOLLOW_USER) {
        store.dispatch(FOLLOW_USER, args.username);
      } else {
        store.dispatch(UNFOLLOW_USER, args.username);
      }
    },
    /**
     * Reset pagination on tab switch.
     */
    resetPagination() {
      this.offset = 0;
      this.currentPage = 1;
    }
  },
  created() {
    this.userid = this.$route.params.username;
    this.getSelectedUser(this.userid);
  }
};
</script>

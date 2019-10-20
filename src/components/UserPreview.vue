<template>
  <div class="article-meta">
    <span @click="userProfile()"><router-link to=""><img :src="article.author.image" onerror="this.src='https://static.productionready.io/images/smiley-cyrus.jpg';"/></router-link></span>
    <div class="info">
      <span @click="userProfile()"><router-link to="" class="author">{{ article.author.username }}</router-link></span>
      <span class="date">{{ formatDate(article.createdAt) }}</span>
    </div>

    <span v-if="isAdmin">
      <button class="btn btn-sm btn-outline-secondary" @click="editArticle">
        <i class="ion-edit"></i> <span>&nbsp;Edit Article</span>
      </button>
      <span>&nbsp;&nbsp;</span>
      <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
        <i class="ion-trash-a"></i> <span>&nbsp;Delete Article</span>
      </button>
    </span>
    <span v-if="!isAdmin">
      <button
        class="btn btn-sm btn-outline-secondary"
        @click="followUser"
        v-bind:class="{ active: article.author.following }">
        <i class="ion-plus-round"></i>
        &nbsp; <span v-if="!article.author.following">Follow {{ article.author.username }}</span> <span v-if="article.author.following">UnFollow {{ article.author.username }}</span> <span class="counter"></span>
      </button>
      &nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        @click="favPost()"
        v-bind:class="{ active: article.favorited }"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter" v-bind:class="{ active: article.favorited }"
          >({{ article.favoritesCount }})</span
        >
      </button>
    </span>
  </div>
</template>
<script>
import moment from "moment";
import store from "../store"

export default {
  props: ["article", "isAdmin"],
  methods: {
    formatDate(date) {
      return moment(date).format("MMM Do, YYYY");
    },
    performAction(operation) {
      this.$emit("click", { operation, article: this.article });
    },
    favPost() {
      let operation = null;
      if(store.getters["user"]!=null) {
        if (this.article.favorited == false) {
          operation = "favouriteArticle";
        } else {
          operation = "unFavouriteArticle";
        }
        this.performAction(operation);
      } else {
        this.$router.push("/login");
      }
    },
    editArticle() {
      this.performAction("editArticle");
    },
    deleteArticle() {
      this.performAction("deleteArticle");
    },
    followUser(){
      if(store.getters["user"]!=null) {
        let operation = "followUser";
        if(this.article.author.following) {
          operation = "unFollowUser";
        } 
        this.performAction(operation);
      } else {
        this.$router.push("/login");
      }
    },
    userProfile() {
      this.$router.push("/" +this.article.author.username);
    }
  }
};
</script>
<style scoped>

.active{background:green;}

</style>

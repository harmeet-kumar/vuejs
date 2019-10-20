<template>
  <div class="article-preview" v-if="article.author!=null">
    <div class="article-meta">
      <span @click="setSelectedUser()"><router-link to=""><img :src="article.author.image" onerror="this.src='https://static.productionready.io/images/smiley-cyrus.jpg';"/></router-link></span>
      <div class="info">
        <span @click="setSelectedUser()"><router-link to="" class="author">{{
          article.author.username
        }}</router-link></span>
        <span class="date">{{ formatDate(article.createdAt) }}</span>
      </div>
      <button
        class="btn btn-outline-primary btn-sm pull-xs-right"
        @click="performOperation('favArticle')"
        v-bind:class="{ active: article.favorited, 'text-danger': article.favorited }"
      >
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <a href="#"  class="preview-link">
        <h1 @click="performOperation('getArticle')" class="info">{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
    </a>
    <div class="tag-list">
      <a
        v-for="tag in article.tagList"
        :key="tag"
        class="tag-pill tag-default"
        >{{ tag }}</a
      >
    </div>
  </div>
</template>
<script>
import moment from "moment";
import store from "../store"

export default {
  props: ["article"],
  methods: {
    formatDate(date) {
      return moment(date).format("MMM Do, YYYY");
    },
    performOperation(operation) {
      if( operation === 'favArticle'){
        if(store.getters['user']) {
          if (this.article.favorited == true) {
            operation = "unFavArticle";
          }
        } else {
          this.$router.push('/login');
        }
      }
      this.$emit("click", { operation: operation, slug: this.article.slug });
    },
    setSelectedUser(){
      store.commit("setSelectedUser",this.article.author);
      this.$router.push("/"+this.article.author.username);
    }
  }
};
</script>
<style scoped>
.active{background:green;}

</style>
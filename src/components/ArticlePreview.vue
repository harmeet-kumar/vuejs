<template>
  <div class="article-preview">
    <div class="article-meta">
      <a href="profile.html"><img :src="article.author.image"/></a>
      <div class="info">
        <router-link :to="`${article.author.username}`" class="author">{{
          article.author.username
        }}</router-link>
        <span class="date">{{ formatDate(article.createdAt) }}</span>
      </div>
      <button
        class="btn btn-outline-primary btn-sm pull-xs-right"
        @click="getArticle('favArticle')"
        v-bind:class="{ active: article.favorited }"
      >
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <a href="#" @click="getArticle('getArticle')" class="preview-link">
      <h1>{{ article.title }}</h1>
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

export default {
  props: ["article"],
  methods: {
    formatDate(date) {
      return moment(date).format("MMM Do, YYYY");
    },
    getArticle(operation) {
      if (operation == "favArticle" && this.article.favorited == true) {
        operation = "unFavArticle";
      }
      this.$emit("click", { operation: operation, slug: this.article.slug });
    }
  }
};
</script>

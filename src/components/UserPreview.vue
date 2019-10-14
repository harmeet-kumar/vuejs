<template>
  <div class="article-meta">
    <a href=""><img :src="article.author.image"/></a>
    <div class="info">
      <a href="" class="author">{{ article.author.username }}</a>
      <span class="date">{{ formatDate(article.createdAt) }}</span>
    </div>

    <button
      class="btn btn-sm btn-outline-secondary"
      v-bind:class="{ active: article.author.following }"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{ article.author.username }} <span class="counter"></span>
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
    getArticle() {
      this.$emit("click");
    },
    favPost() {
      if (this.article.favorited == false) {
        this.$store.dispatch("articles/favouriteArticle", this.article.slug);
      } else {
        this.$store.dispatch("articles/unFavouriteArticle", this.article.slug);
      }
    }
  }
};
</script>

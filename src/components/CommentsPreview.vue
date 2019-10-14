<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ comment.body }}</p>
    </div>
    <div class="card-footer">
      <a href="" class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" />
      </a>
      &nbsp;
      <a href="" class="comment-author">{{ comment.author.username }}</a>
      <span class="date-posted">{{ formatDate(comment.createdAt) }}</span>
      <span class="mod-options">
        <i class="ion-edit" v-if="currentUser == comment.author.username"></i>
        <i
          class="ion-trash-a"
          v-if="currentUser == comment.author.username"
          @click="deleteComment(comment.id)"
        ></i>
      </span>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  props: ["comment", "currentUser"],
  methods: {
    formatDate(date) {
      return moment(date).format("MMM Do, YYYY");
    },
    deleteComment(id) {
      this.$emit("click", { action: "delete", id });
    }
  }
};
</script>

<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ title }}</h1>

        <UserPreview v-if="article" :article="article"></UserPreview>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <h2 id="introducing-ionic">{{ description }}</h2>
          <p>{{ body }}</p>
          <div class="tag-list">
            <a v-for="tag in tagList" :key="tag" class="tag-pill tag-default">{{
              tag
            }}</a>
          </div>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <UserPreview v-if="article" :article="article"></UserPreview>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                v-model="commentBox"
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="currentUser.image" class="comment-author-img" />
              <button
                class="btn btn-sm btn-primary"
                type="button"
                @click="addComment(article.slug)"
              >
                Post Comment
              </button>
            </div>
          </form>

          <CommentsPreview
            v-for="comment in comments"
            :comment="comment"
            :currentUser="currentUser.username"
            :key="comment.id"
            @click="performActionOnComment"
          ></CommentsPreview>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import UserPreview from "../components/UserPreview";
import CommentsPreview from "../components/CommentsPreview";

export default {
  components: {
    UserPreview,
    CommentsPreview
  },
  data: function() {
    return {
      commentBox: "",
      title: "",
      description: "",
      body: "",
      tagList: []
    };
  },
  computed: {
    article() {
      return this.$store.getters["articles/searchedArticle"];
    },
    comments() {
      return this.$store.getters["comments/commentsForArticle"];
    },
    currentUser() {
      return this.$store.getters["users/user"];
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format("MMM Do, YYYY");
    },
    updateValues(article) {
      (this.title = article.title),
        (this.description = article.description),
        (this.body = article.body),
        (this.tagList = article.tagList);
    },
    addComment(slug) {
      if (this.commentBox != "") {
        this.$store
          .dispatch("comments/addCommentToArticle", {
            slug,
            commentBody: this.commentBox
          })
          .then(() => {
            this.commentBox = "";
          });
      }
    },
    performActionOnComment(arg) {
      if (arg.action == "delete") {
        this.$store.dispatch("comments/deleteComment", {
          slug: this.article.slug,
          id: arg.id
        });
      }
    }
  },
  created() {
    this.$store
      .dispatch("articles/getArticleForSlug", this.$route.params.id)
      .then(() => {
        this.updateValues(this.$store.getters["articles/searchedArticle"]);
        this.$store
          .dispatch("comments/getCommentsForArticle", this.$route.params.id)
          .then(() => {});
      });
  }
};
</script>

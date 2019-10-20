<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ title }}</h1>

        <UserPreview v-if="article!=null" :article="article" :isAdmin="(currentUser != null ? currentUser.username : '')== (article !=null ? article.author.username : '')" @click="performActionForFavBtn"></UserPreview>
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
        <UserPreview v-if="article" :article="article" :isAdmin="((currentUser != null ? currentUser.username : '')==(article !=null ? article.author.username : ''))" @click="performActionForFavBtn"></UserPreview>
      </div>
      <p show-authed="false" v-if="currentUser == null" style="display: inherit;">
          <a ui-sref="app.login"  href="#/login">Sign in</a> or <a ui-sref="app.register" href="#/signup">sign up</a> to add comments on this article.
        </p>
      <div class="row" >
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form" v-if="currentUser != null">
            <div class="card-block">
              <textarea
                v-model="commentBox"
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="currentUser != null ? currentUser.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'" class="comment-author-img" />
                &nbsp;<span >{{ currentUser.username }}</span>
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
            :currentUser="currentUser != null ? currentUser.username : ''"
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
import store from "../store";
import {SELECTED_ARTICLE,COMMENTS_FOR_ARTICLE,USER,DATE_FORMAT,ACTION_DELETE,UNFAVOURITE_ARTICLE,ADD_COMMENT,
EMPTY,ADD_COMMENTS,DELETE_COMMENT,FAVOURITE_ARTICLE,EDITOR,EDIT_ARTICLE,FOLLOW_USER,UNFOLLOW_USER,
DELETE_ARTICLE,GET_ARTICLE_FROM_SLUG,GET_COMMENTS_FOR_ARTICLE} from "../shared/constants"

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
      this.updateValues(store.getters[SELECTED_ARTICLE]);
      return store.getters[SELECTED_ARTICLE];
    },
    comments() {
      return store.getters[COMMENTS_FOR_ARTICLE];
    },
    currentUser() {
      return store.getters[USER];
    }
  },
  methods: {
    /**
     * Format date to required format i.e. Month date Year
     */
    formatDate(date) {
      return moment(date).format(DATE_FORMAT);
    },
    /**
     * Updated the selected article.
     */
    updateValues(article) {
      if(article) {
        (this.title = article.title),
        (this.description = article.description),
        (this.body = article.body),
        (this.tagList = article.tagList);
      }
    },
    /**
     * Add new comment to the article.
     */
    addComment(slug) {
      if (this.commentBox != EMPTY) {
        store
          .dispatch(ADD_COMMENT, {
            slug,
            commentBody: this.commentBox
          })
          .then(() => {
            this.commentBox = EMPTY;
          });
      }
    },
    /**
     * Edit or Delete the comment. Edit could only be done on UI as no API to edit comments.
     */
    performActionOnComment(arg) {
      if (arg.action == ACTION_DELETE) {
        store.dispatch(DELETE_COMMENT, {
          slug: this.article.slug,
          id: arg.id
        });
      }
    },
    /**
     * Favourite or Unfav an article. Only if you are signed in.
     */
    performActionForFavBtn(arg){
      if (arg.operation === FAVOURITE_ARTICLE) {
        store.dispatch(FAVOURITE_ARTICLE, arg.article.slug);
      } else if (arg.operation === UNFAVOURITE_ARTICLE) {
        store.dispatch(UNFAVOURITE_ARTICLE, arg.article.slug);
      } else if(arg.operation === EDIT_ARTICLE) {
        this.$router.push("/"+EDITOR+"/"+arg.article.slug);
      } else if(arg.operation === FOLLOW_USER) {
        store.dispatch(FOLLOW_USER,arg.article.author.username);
      } else if(arg.operation === UNFOLLOW_USER) {
        store.dispatch(UNFOLLOW_USER,arg.article.author.username);
      } else {
        store.dispatch(DELETE_ARTICLE,arg.article.slug);
        this.$router.push("/");
      }
    },
    /**
     * Get article for slug.
     */
    getArticleData(id) {
      store
      .dispatch(GET_ARTICLE_FROM_SLUG, id)
      .then((response) => {
        this.updateValues(store.getters[SELECTED_ARTICLE]);
        store
          .dispatch(GET_COMMENTS_FOR_ARTICLE, id)
          .then((response) => {
            this.updateValues(store.getters[SELECTED_ARTICLE]);
          });
      });
    },
    /**
     * Reset values.
     */
    resetValues() {
      this.title = '';
      this.description = '';
      this.body = '';
      this.tagList = '';
    }
  },
  created() {
    this.resetValues();
    this.getArticleData(this.$route.params.id);
  }
};
</script>

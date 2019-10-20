<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">KRATOS</h1>
        <p>A NAGP assignment made by Harmeet Kumar.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link"
                  v-bind:class="{ active: userFeedRequested }"
                  href="#"
                  @click="userFeed();resetPagination()"
                  v-if="activeUser"
                  >Your Feed</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  v-bind:class="{
                    active: !userFeedRequested && !tagFeedRequested
                  }"
                  href="#"
                  @click="removeTag();resetPagination()"
                  >Global Feed</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link active" v-if="selectedTag">{{
                  selectedTag
                }}</a>
              </li>
            </ul>
          </div>
          <div class="info" v-if="articles.length == 0">
            <span>Please follow a user to view an Article. Open an article and click on Follow User button...</span> &nbsp;
          </div>
          <div v-if="articles">
            <ArticlePreview
              v-for="article in articles"
              :key="article.slug"
              :article="article"
              @click="getArticle"
            ></ArticlePreview>
          </div>
        </div>
        
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <TagPreview
                v-for="tag in tags"
                :tag="tag"
                :key="tag"
                :disable="false"
                @click="tagSelected(tag);resetPagination()"
              ></TagPreview>
            </div>
          </div>
        </div>

        <Pagination :pages="pages" :currentPage.sync="currentPage" />
      </div>
    </div>
  </div>
</template>
<script>
import ArticlePreview from "../components/ArticlePreview";
import TagPreview from "../components/TagPreview";
import Pagination from "../components/Pagination";
import { clearToken } from "../store/api";
import store from "../store";
import {ARTICLES,SELECTED_TAG,TAGS,USERNAME,ACTION_FAV_ARTICLE,GET_ARTICLE,ARTICLES_COUNT,
FAVOURITE_ARTICLE,UNFAVOURITE_ARTICLE,GET_ARTICLES,GET_TAGS,GET_USER_FEED,SET_SELECTED_TAG} from "../shared/constants"

export default {
  components: {
    ArticlePreview,
    TagPreview,
    Pagination
  },
  data: function() {
    return {
      userFeedRequested: false,
      tagFeedRequested: false,
      currentPage : 1,
      itemsPerPage: 10,
      offset: 0,
      tag : null
    };
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
    tags() {
      return store.getters[TAGS];
    },
    activeUser() {
      return store.getters[USERNAME];
    },
    selectedTag() {
      return store.getters[SELECTED_TAG];
    }
  },
  watch: {
    currentPage(newValue) {
      this.offset = (newValue - 1) * this.itemsPerPage;
      if(this.userFeedRequested) {
        this.userFeed();
      } else if (this.tagFeedRequested) {
        this.tagSelected(this.tag);
      } else {
        this.getArticles();
      }
    }
  },
  methods: {
    /**
     * Get article for slug.
     */
    getArticle(arg) {
      if (arg.operation === GET_ARTICLE) {
        this.$router.push("/article/" + arg.slug);
      } else if (arg.operation === ACTION_FAV_ARTICLE) {
        store.dispatch(FAVOURITE_ARTICLE, arg.slug);
      } else {
        store.dispatch(UNFAVOURITE_ARTICLE, arg.slug);
      }
    },
    /**
     * Get all the articles for global feed.
     */
    getArticles(params) {
      store.dispatch(GET_ARTICLES, {
        limit : 10,
        offset : this.offset
      })
      this.globalFeedRequested = true;
    },
    /**
     * Get global tags.
     */
    getTags() {
      store.dispatch(GET_TAGS);
    },
    /**
     * Get articles for the selected tag.
     */
    tagSelected(selectedTag) {
      this.tag = selectedTag;
      store.commit(SET_SELECTED_TAG, selectedTag);
      store.dispatch(GET_ARTICLES, {
        tag: selectedTag,
        offset: this.offset,
        limit: 10
      });
      this.userFeedRequested = false;
      this.tagFeedRequested = true;
    },
    /**
     * Remove the selected tag feed, if user click on his feed or global feed.
     */
    removeTag() {
      store.commit(SET_SELECTED_TAG, null);
      this.getArticles();
      this.userFeedRequested = false;
      this.tagFeedRequested = false;
    },
    /**
     * Get user feed.
     */
    userFeed() {
      store.dispatch(GET_USER_FEED,this.offset);
      if (this.tagFeedRequested) {
        this.removeTag();
      }
      this.userFeedRequested = true;
    },
    /**
     * Reset pagination on each tab switch.
     */
    resetPagination() {
      this.offset = 0;
      this.currentPage = 1;
    }
  },
  created() {
    this.removeTag();
    this.getArticles();
    this.getTags();
    this.resetPagination();
  }
};
</script>

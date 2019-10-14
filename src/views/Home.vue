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
                  @click="userFeed()"
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
                  @click="removeTag()"
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
                @click="tagSelected(tag)"
              ></TagPreview>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArticlePreview from "../components/ArticlePreview";
import TagPreview from "../components/TagPreview";
import { clearToken } from "../store/api";

export default {
  components: {
    ArticlePreview,
    TagPreview
  },
  data: function() {
    return {
      userFeedRequested: false,
      tagFeedRequested: false
    };
  },
  computed: {
    articles() {
      return this.$store.getters["articles/articles"];
    },
    tags() {
      return this.$store.getters["tags/tags"];
    },
    activeUser() {
      return this.$store.getters["users/username"];
    },
    selectedTag() {
      return this.$store.getters["tags/selectedTag"];
    }
  },
  methods: {
    getArticle(arg) {
      console.log(arg);
      if (arg.operation === "getArticle") {
        this.$router.push("/article/" + arg.slug);
      } else if (arg.operation === "favArticle") {
        this.$store.dispatch("articles/favouriteArticle", arg.slug);
      } else {
        this.$store.dispatch("articles/unFavouriteArticle", arg.slug);
      }
    },
    getArticles() {
      this.$store.dispatch("articles/getArticles", { option: "", value: "" });
      this.globalFeedRequested = true;
    },
    getTags() {
      this.$store.dispatch("tags/getTags");
    },
    tagSelected(tag) {
      this.$store.commit("tags/setSelectedTag", tag);
      this.$store.dispatch("articles/getArticles", {
        option: "tag",
        value: tag
      });
      this.userFeedRequested = false;
      this.tagFeedRequested = true;
    },
    removeTag() {
      this.$store.commit("tags/setSelectedTag", null);
      this.getArticles();
      this.userFeedRequested = false;
      this.tagFeedRequested = false;
    },
    userFeed() {
      this.$store.dispatch("articles/getArticles", {
        option: "favorited",
        value: this.activeUser
      });
      if (this.tagFeedRequested) {
        this.removeTag();
      }
      this.userFeedRequested = true;
    },
    favClick(arg) {
      console.log(arg);
    }
  },
  created() {
    this.getArticles();
    this.getTags();
  },
  beforeCreate() {
    clearToken();
  }
};
</script>

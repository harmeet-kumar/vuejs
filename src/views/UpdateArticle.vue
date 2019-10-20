<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  v-model="title"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  v-model="description"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  v-model="body"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="tagList"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                @click="updateArticle"
                type="button"
              >
                Update Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../store";
import {UPDATE_ARTICLE,SET_SEARCHED_ARTICLE,GET_ARTICLE_FROM_SLUG,SEARCHED_ARTICLE} from "../shared/constants";

export default {
  data: function() {
    return {
      title: "",
      description: "",
      body: "",
      tagList: "",
      slug: "",
      article: null
    };
  },
  methods: {
    /**
     * Update the UI properties
     */
    updateProps(article) {
      if (article) {
        this.title = article.title;
        this.description = article.description;
        this.body = article.body;
        this.tagList = article.tagList.join(' ');
        this.slug = article.slug
        this.article = article
      } else {
        this.$router.push("/article/" + this.$route.params.id)
      }
    },
    /**
     * Update the article.
     */
    updateArticle() {
      this.article.title = this.title;
      this.article.description = this.description;
      this.article.body = this.body;
      this.article.tagList = this.tagList.split(" ");
      store.dispatch(UPDATE_ARTICLE, {title : this.title,
        description : this.description,
        body : this.body,
        slug : this.slug,
        tagList : this.tagList.split(" ")}).then (() => {
        store.commit(SET_SEARCHED_ARTICLE, this.article);
        store.dispatch(GET_ARTICLE_FROM_SLUG, this.$route.params.id).then((response)=>{
             this.$router.push("/article/"+ this.$route.params.id);
           })
        });
    }
  },
  created() {
    if (store.getters[SEARCHED_ARTICLE]) {
      this.updateProps(store.getters[SEARCHED_ARTICLE]);
    } else {
      store
      .dispatch(GET_ARTICLE_FROM_SLUG, this.$route.params.id)
      .then(() => {
        this.updateProps(store.getters[SEARCHED_ARTICLE]);
      });
    }
  }
};
</script>

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
                  v-model="tagString"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="createNewArticle"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import store from "../store"
import {CREATE_ARTICLE} from "../shared/constants";

export default {
  data: function() {
    return {
      title: "",
      description: "",
      body: "",
      tagString: "",
      tagList: []
    };
  },
  methods: {
    /**
     * Creates a new article.
     */
    createNewArticle() {
      this.tagList = this.tagString.split(" ");
      store.dispatch(CREATE_ARTICLE, {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList
      }).then(()=>{
        this.resetValues();
        this.$router.push("/");
      });
    },
    /**
     * Reset UI on each article generation.
     */
    resetValues() {
      this.title = "";
      this.description = "";
      this.body = "";
      this.tagString = "";
      this.tagList = [];
    }
  }
};
</script>

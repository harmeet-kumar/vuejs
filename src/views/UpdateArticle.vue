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
export default {
  data: function() {
    return {
      title: "",
      description: "",
      body: "",
      tagList: ""
    };
  },
  computed: {
    article() {
      return this.updateProps(this.$store.getters["searchedArticle"]);
    }
  },
  methods: {
    updateProps(article) {
      if (article) {
        this.title = article.title;
        this.description = article.description;
        this.body = article.body;
        this.tagList = article.tagList.toString();
      }
    },
    updateArticle() {
      this.$store.dispatch("updateArticle", this.article.slug);
    }
  }
};
</script>

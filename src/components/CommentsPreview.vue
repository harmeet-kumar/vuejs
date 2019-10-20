<template>
  <div class="card" v-if="comment">
    <div class="card-block">
      <p class="card-text" :contenteditable="editFlag">{{ comment.body }}</p>
    </div>
    <div class="card-footer">
      <span @click="toUserProfile()"><router-link to="" class="comment-author">
        <img :src="comment.author.image" onerror="this.src='https://static.productionready.io/images/smiley-cyrus.jpg';" class="comment-author-img" />
      </router-link></span>
      &nbsp;
      <span @click="toUserProfile()"><router-link to=""  class="comment-author">{{ comment.author.username }}</router-link></span>
      <span class="date-posted">{{ formatDate(comment.createdAt) }}</span>
      <span class="mod-options">
        <span v-if="editFlag == true">Click on text to edit.</span>&nbsp;
        <span v-if="editFlag == false"
          ><i
            class="ion-edit"
            v-if="currentUser == comment.author.username"
            @click="enableEditing(comment)"
          ></i> </span
        >&nbsp;
        <i
          class="ion-trash-a"
          v-if="currentUser == comment.author.username"
          @click="deleteComment(comment.id)"
        ></i>
        &nbsp;
        <button
          v-if="editFlag == true"
          class="btn btn-sm btn-primary"
          @click="updateComment(comment)"
        >
          Save
        </button>
      </span>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  props: ["comment", "currentUser"],
  data: function() {
    return {
      editFlag: false
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("MMM Do, YYYY");
    },
    deleteComment(id) {
      this.$emit("click", { action: "delete", id });
    },
    enableEditing() {
      this.editFlag = true;
    },
    updateComment(comment) {
      this.editFlag = false;
      this.$emit("click", { action: "update", comment });
      alert(
        "Changes won't persist after refresh, as no api endpoint to update comment!!"
      );
    },
    toUserProfile() {
      this.$router.push('/'+ this.comment.author.username);
    }
  },
  created() {
    this.editFlag = false;
  }
};
</script>

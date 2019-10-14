import { axiosApi } from "../api";

export default {
  namespaced: true,
  state: {
    allCommentsForArticle: [],
    newComment: null
  },
  getters: {
    commentsForArticle(state) {
      return state.allCommentsForArticle;
    }
  },
  mutations: {
    setArticleComments(state, payload) {
      state.allCommentsForArticle = payload;
    },
    addNewComment(state, payload) {
      state.allCommentsForArticle.unshift(payload);
    },
    deleteComment(state, id) {
      state.allCommentsForArticle.splice(
        state.allCommentsForArticle.findIndex(function(i) {
          return i.id === id;
        }),
        1
      );
    }
  },
  actions: {
    getCommentsForArticle: async function({ commit }, slug) {
      try {
        await axiosApi.get(`/articles/${slug}/comments`).then(response => {
          if (response.data.comments) {
            console.log(response.data.comments);
            commit("setArticleComments", response.data.comments);
          }
        });
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    addCommentToArticle: async function({ commit }, { slug, commentBody }) {
      try {
        const response = await axiosApi.post(
          `/articles/${slug}/comments`,
          {
            comment: {
              body: commentBody
            }
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
              Authorization:
                "Token " + JSON.parse(window.localStorage.getItem("token"))
            }
          }
        );
        if (response.data.comment) {
          console.log("Add COmment :" + response.data.comment);
          commit("addNewComment", response.data.comment);
        }
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    deleteComment: async function({ commit }, { slug, id }) {
      try {
        const response = await axiosApi.delete(
          `/articles/${slug}/comments/${id}`,
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
              Authorization:
                "Token " + JSON.parse(window.localStorage.getItem("token"))
            }
          }
        );
        if (response) {
          console.log("Delete COmment :" + response.data);
          commit("deleteComment", id);
        }
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    }
  }
};

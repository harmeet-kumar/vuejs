
import CommentsService from "../../shared/services/comments.service";
import {SET_ARTICLE_COMMENTS,ADD_NEW_COMMENT,DELETE_COMMENT,GET_COMMENTS_FOR_ARTICLE,ADD_COMMENT} from "../../shared/constants"

export const state = {
    allCommentsForArticle: [],
    newComment: null
  }
export const getters = {
    commentsForArticle(state) {
      return state.allCommentsForArticle;
    }
  }
  export const mutations = {
    [SET_ARTICLE_COMMENTS](state, payload) {
      state.allCommentsForArticle = payload;
    },
    [ADD_NEW_COMMENT](state, payload) {
      state.allCommentsForArticle.unshift(payload);
    },
    [DELETE_COMMENT](state, id) {
      state.allCommentsForArticle.splice(
        state.allCommentsForArticle.findIndex(function(i) {
          return i.id === id;
        }),
        1
      );
    }
  }
export const actions = {
    async [GET_COMMENTS_FOR_ARTICLE]({ commit }, slug) {
      try {
        CommentsService.get(slug)
        .then(response => {
          if (response.data.comments) {
            commit(SET_ARTICLE_COMMENTS, response.data.comments);
          }
        });
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    async [ADD_COMMENT]({ commit }, { slug, commentBody }) {
      try {
        CommentsService.add(slug,{comment:{body:commentBody}})
        .then((response)=> {
          if (response.data.comment) {
            commit(ADD_NEW_COMMENT, response.data.comment);
          }
        })
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    async [DELETE_COMMENT]({ commit }, { slug, id }) {
      try {
        CommentsService.remove(slug,id)
        .then((response)=> {
          if (response) {
            commit(DELETE_COMMENT, id);
          }
        })
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    }
  }

  export default {
    state,
    actions,
    mutations,
    getters
  };
  

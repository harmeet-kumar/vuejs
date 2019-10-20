import ArticlesService from "../../shared/services/articles.service";
import FavouriteService from "../../shared/services/favourite.service";
import UsersService from "../../shared/services/users.service";
import Vue from "vue";
import { GET_USER_FEED,CREATE_ARTICLE,SET_ARTICLES,DELETE_ARTICLE,SET_SEARCHED_ARTICLE,
  FAVOURITE_ARTICLE,UNFAVOURITE_ARTICLE,FOLLOW_USER,UNFOLLOW_USER,GET_ARTICLES,TOKEN,
  GET_ARTICLE_FROM_SLUG,UPDATE_ARTICLE,ARTICLES_COUNT
 } from "../../shared/constants";

 export const state = {
    articles: [],
    articlesCount: 500,
    searchedArticle: null,
    isLoading: false,
    articlesCount: 0
  }

  export const getters = {
    articles(state) {
      return state.articles || null;
    },
    articlesCount(state) {
      return state.articlesCount;
    },
    searchedArticle(state) {
      return state.searchedArticle;
    },
    articlesCount(state) {
      return state.articlesCount;
    },
    isLoading(state) {
      return state.isLoading;
    }
  }

export const mutations = {
    [SET_ARTICLES](state, payload) {
      state.articles = payload;
    },
    [CREATE_ARTICLE]() {

    },
    [ARTICLES_COUNT] (state,payload) {
      state.articlesCount = payload;
    },
    [DELETE_ARTICLE](state, slug) {
      state.articles.splice(
        state.articles.findIndex(function(i) {
          return i.slug === slug;
        }),
        1
      );
    },
    [SET_SEARCHED_ARTICLE](state, payload) {
      let result = state.articles.find(x => x.slug === payload.slug);
      if (result) {
        payload.favorited = result.favorited;
        payload.favoritesCount = result.favoritesCount;
      }
      state.searchedArticle = payload;
    },
    [FAVOURITE_ARTICLE](state, slug) {
      let result = state.articles.find(x => x.slug === slug);
      if (result && !result.favorited) {
        state.articles.find(x => x.slug === slug).favorited = true;
        state.articles.find(x => x.slug === slug).favoritesCount =
          state.articles.find(x => x.slug === slug).favoritesCount + 1;
      }
      if (state.searchedArticle && state.searchedArticle.slug === slug && !state.searchedArticle.favorited) {
        state.searchedArticle.favorited = true;
        state.searchedArticle.favoritesCount =
          state.searchedArticle.favoritesCount + 1;
      }
    },
    [UNFAVOURITE_ARTICLE](state, slug) {
      let result = state.articles.find(x => x.slug === slug);
      if (result && result.favorited) {
        state.articles.find(x => x.slug === slug).favorited = false;
        state.articles.find(x => x.slug === slug).favoritesCount =
          state.articles.find(x => x.slug === slug).favoritesCount > 0
            ? state.articles.find(x => x.slug === slug).favoritesCount - 1
            : 0;
      }

      if (state.searchedArticle && state.searchedArticle.slug === slug && state.searchedArticle.favorited) {
        state.searchedArticle.favorited = false;
        state.searchedArticle.favoritesCount =
          state.searchedArticle.favoritesCount - 1;
      }
    },
    [FOLLOW_USER](state, payload) {
      let result = state.articles.find(
        x => x.author.username === payload.username
      );
      if (result && !result.author.following) {
        state.articles.find(
          x => x.author.username === payload.username
        ).author.following = true;
        if (
          state.searchedArticle &&
          state.searchedArticle.author.username == payload.username
        ) {
          state.searchedArticle.author.following = true;
        }
      }
    },
    [UNFOLLOW_USER](state, payload) {
      let result = state.articles.find(
        x => x.author.username === payload.username
      );
      if (result && result.author.following) {
        state.articles.find(
          x => x.author.username === payload.username
        ).author.following = false;
        if (
          state.searchedArticle &&
          state.searchedArticle.author.username == payload.username
        ) {
          state.searchedArticle.author.following = false;
        }
      }
    }
  }

export const actions = {
    async [GET_USER_FEED]({ commit },offset) {
      try
      {
        ArticlesService.userFeed({limit:10,offset:offset})
        .then(response => {
          commit(SET_ARTICLES, response.data.articles);
          commit(ARTICLES_COUNT,response.data.articlesCount);
        });
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    async [GET_ARTICLES]({ commit }, params) {
      try
      {
        return ArticlesService.query(params).then(response => {
          commit(SET_ARTICLES, response.data.articles);
          commit(ARTICLES_COUNT,response.data.articlesCount);
        });
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    async [GET_ARTICLE_FROM_SLUG]({ commit }, slug) {
      try 
      {
        return ArticlesService.get(slug)
        .then(response => {
          commit(SET_SEARCHED_ARTICLE, response.data.article);
          return response.data.article;
        });
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    async [CREATE_ARTICLE]({commit},newArticle) {
      try {
        return ArticlesService.create(newArticle)
        .then (()=>{
          commit(CREATE_ARTICLE);
        })
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    async [UPDATE_ARTICLE]({ commit }, updatedArticle) {
      try {
          return ArticlesService.update(updatedArticle.slug,updatedArticle)
          .then(response => {
            commit(SET_SEARCHED_ARTICLE, response.data.article);
          });
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    async [DELETE_ARTICLE]({ commit }, slug) {
      try {
        return ArticlesService.destroy(slug)
          .then(response => {
            commit(DELETE_ARTICLE, slug);
          });
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    async [FAVOURITE_ARTICLE]({ commit }, slug) {
      try {
        return FavouriteService.add(slug)
        .then((response) => {
          commit(FAVOURITE_ARTICLE, slug);
        })
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    async [UNFAVOURITE_ARTICLE]({ commit }, slug) {
      try {
        return FavouriteService.remove(slug)
         .then((response) => {
          commit(UNFAVOURITE_ARTICLE, slug);
        });
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    async [FOLLOW_USER]({ commit }, usename) {
      try {
        return UsersService.followUser(usename)
        .then((response)=> {
          commit(FOLLOW_USER, response.data.profile);
        })
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    async [UNFOLLOW_USER]({ commit }, usename) {
      try {
        return UsersService.unFollowUser(usename)
        .then((response)=>{
          commit(UNFOLLOW_USER, response.data.profile);
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

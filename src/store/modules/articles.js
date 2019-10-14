import { axiosApi } from "../api";

export default {
  namespaced: true,
  state: {
    articles: [],
    searchedArticle: null
  },
  getters: {
    articles(state) {
      return state.articles || null;
    },
    searchedArticle(state) {
      return state.searchedArticle;
    }
  },
  mutations: {
    setArticles(state, payload) {
      state.articles = payload;
    },
    setSearchedArticle(state, payload) {
      let result = state.articles.find(x => x.slug === payload.slug);
      if (result) {
        payload.favorited = result.favorited;
        payload.favoritesCount = result.favoritesCount;
      }
      state.searchedArticle = payload;
    },
    favouriteArticle(state, slug) {
      let result = state.articles.find(x => x.slug === slug);
      if (result) {
        console.log(result);
        state.articles.find(x => x.slug === slug).favorited = true;
        state.articles.find(x => x.slug === slug).favoritesCount =
          state.articles.find(x => x.slug === slug).favoritesCount + 1;
      }
      console.log(state.searchedArticle);
      if (state.searchedArticle && state.searchedArticle.slug === slug) {
        state.searchedArticle.favorited = true;
        state.searchedArticle.favoritesCount =
          state.searchedArticle.favoritesCount + 1;
      }
    },
    unFavouriteArticle(state, slug) {
      let result = state.articles.find(x => x.slug === slug);
      if (result) {
        console.log(result);
        state.articles.find(x => x.slug === slug).favorited = false;
        state.articles.find(x => x.slug === slug).favoritesCount =
          state.articles.find(x => x.slug === slug).favoritesCount > 0
            ? state.articles.find(x => x.slug === slug).favoritesCount - 1
            : 0;
      }

      if (state.searchedArticle && state.searchedArticle.slug === slug) {
        state.searchedArticle.favorited = false;
        state.searchedArticle.favoritesCount =
          state.searchedArticle.favoritesCount - 1;
      }
    },
    followUser(state, payload) {
      let result = state.articles.find(
        x => x.author.username === payload.username
      );
      if (result) {
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
    unFollowUser(state, payload) {
      let result = state.articles.find(
        x => x.author.username === payload.username
      );
      if (result) {
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
  },
  actions: {
    getArticles: async function({ commit }, getCriteria) {
      let url = "/articles";
      if (getCriteria.option != "") {
        url = url + "?" + getCriteria.option + "=" + getCriteria.value;
      }
      console.log(url);
      await axiosApi
        .get(url, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            Authorization:
              "Token " + JSON.parse(window.localStorage.getItem("token"))
          }
        })
        .then(response => {
          console.log(response.data);
          commit("setArticles", response.data.articles);
        });
    },
    getArticleForSlug: async function({ commit }, slug) {
      await axiosApi.get(`/articles/${slug}`).then(response => {
        commit("setSearchedArticle", response.data.article);
        return response.data.article;
      });
    },
    createArticle: async function(newArticle) {
      try {
        console.log(JSON.parse(window.localStorage.getItem("token")));
        await axiosApi.post(
          "/articles",
          {
            article: {
              title: newArticle.title,
              description: newArticle.description,
              body: newArticle.body,
              tagList: newArticle.tagList
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
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    updateArticle: async function({ commit }, updatedArticle) {
      try {
        console.log(JSON.parse(window.localStorage.getItem("token")));
        await axiosApi.put(
          `/articles/${updatedArticle.slug}`,
          {
            article: {
              title: updatedArticle.title,
              description: updatedArticle.description,
              body: updatedArticle.body,
              tagList: updatedArticle.tagList
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
        commit("setSearchedArticle", null);
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    favouriteArticle: async function({ commit }, slug) {
      try {
        const response = await axiosApi.post(
          `/articles/${slug}/favorite`,
          {},
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
          console.log("fav");
          commit("favouriteArticle", slug);
        }
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    unFavouriteArticle: async function({ commit }, slug) {
      try {
        console.log(JSON.parse(window.localStorage.getItem("token")));
        const response = await axiosApi.delete(`/articles/${slug}/favorite`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            Authorization:
              "Token " + JSON.parse(window.localStorage.getItem("token"))
          }
        });
        if (response) {
          console.log("UnFav");
          commit("unFavouriteArticle", slug);
        }
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    followUser: async function({ commit }, usename) {
      try {
        const response = await axiosApi.post(
          `/profiles/${usename}/follow`,
          {},
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
        if (response.data) {
          commit("articles/followUser", response.data.profile);
        }
      } catch (exp) {
        localStorage.removeItem("token");
        console.error(exp);
        throw exp;
      }
    },
    unFollowUser: async function({ commit }, usename) {
      try {
        const response = await axiosApi.delete(
          `/profiles/${usename}/follow`,
          {},
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
        if (response.data) {
          commit("articles/unFollowUser", response.data.profile);
        }
      } catch (exp) {
        localStorage.removeItem("token");
        console.error(exp);
        throw exp;
      }
    }
  }
};

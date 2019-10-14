import { axiosApi } from "../api";

export default {
  namespaced: true,
  state: {
    tags: [],
    selectedTag: null
  },
  getters: {
    tags(state) {
      return state.tags || null;
    },
    selectedTag(state) {
      return state.selectedTag || null;
    }
  },
  mutations: {
    setTags(state, payload) {
      state.tags = payload;
    },
    setSelectedTag(state, payload) {
      state.selectedTag = payload;
    }
  },
  actions: {
    getTags: async function({ commit }) {
      const response = await axiosApi.get("/tags");
      commit("setTags", response.data.tags);
    }
  }
};

import TagsService from "../../shared/services/tags.service"
import {GET_TAGS, SET_TAGS, SET_SELECTED_TAG} from "../../shared/constants"

export const state = {
    tags: [],
    selectedTag: null
  }

export const getters = {
    tags(state) {
      return state.tags || null;
    },
    selectedTag(state) {
      return state.selectedTag || null;
    }
  }

export const mutations = {
    [SET_TAGS](state, payload) {
      state.tags = payload;
    },
    [SET_SELECTED_TAG](state, payload) {
      state.selectedTag = payload;
    }
  }
export const actions = {
    async [GET_TAGS]({ commit }) {
      try 
      {
        TagsService.get()
        .then((response)=>{
          commit(SET_TAGS, response.data.tags);
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

import { setToken, clearToken } from "../api";
import JwtService from "../../shared/services/jwt.service";
import ApiService from "../../shared/services/api.service";
import AuthService from "../../shared/services/auth.service";
import UsersService from "../../shared/services/users.service"
import { LOGIN_USER,GET_USERS,UPDATE_USER,SET_USER,GET_SELECTED_USER,
  SIGNUP_USER,LOGOUT_USER,USER, TOKEN, SET_SELECTED_USER } from "../../shared/constants";

export const state = {
    user: localStorage.getItem(USER) || null,
    profile: null,
    token: localStorage.getItem(TOKEN) || "",
    selectedUser: null
  }
export const getters = {
    username(state) {
      return (state.user && state.user.username) || null;
    },
    user(state) {
      return state.user;
    },
    selectedUser(state) {
      return state.selectedUser;
    }
  }

  export const mutations = {
    [SET_USER](state, payload) {
      state.user = payload;
      if (
        window.LocalStorage /* function to detect if localstorage is supported*/
      ) {
        window.localStorage.setItem("kratosUser", payload);
      }
    },
    [LOGOUT_USER](state) {
      clearToken();
      state.user = null;
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USER);
    },
    updateUserFromLocal(state) {
      state.token = JSON.parse(localStorage.getItem(TOKEN));
      state.user = JSON.parse(localStorage.getItem(USER));
    },
    [SET_SELECTED_USER](state, payload) {
      state.selectedUser = payload;
    },
    [UPDATE_USER](state, payload) {
      state.user = payload;
    }
  }

  export const actions = {
    async [GET_USERS]({ commit }) {
      try 
      {
        AuthService.get()
        .then((user)=>{
          commit(SET_USER, user);
        })
      } catch (exp) {
        console.error(exp);
        throw exp;
      }
    },
    async [LOGIN_USER]({ commit }, { email, password }) {
      debugger
      const token = JSON.parse(localStorage.getItem(TOKEN));
      const user = JSON.parse(localStorage.getItem(USER));
      if (token && user) {
        this.updateUserFromLocal();
        setToken(token);
      } else {

          return AuthService.login({user:{email,password}})
          .then((response)=> {
            if (response.data.user) {
              localStorage.setItem(
                TOKEN,
                JSON.stringify(response.data.user.token)
              );
              localStorage.setItem(USER, JSON.stringify(response.data.user));
              setToken(response.data.user.token);
              commit(SET_USER, response.data.user);
            }
          })

      }
    },
    async [SIGNUP_USER]({ commit }, { email, password, username }) {
      const token = JSON.parse(localStorage.getItem(TOKEN));
      const user = JSON.parse(localStorage.getItem(USER));
      if (token && user) {
        this.updateUserFromLocal();
        setToken(token);
      } else {
        return AuthService.signUp({user:{email,password,username}})
          .then((response)=>{
            if (response.data.user) {
              localStorage.setItem(
                TOKEN,
                JSON.stringify(response.data.user.token)
              );
              localStorage.setItem(USER, JSON.stringify(response.data.user));
              setToken(response.data.user.token);
              commit(SET_USER, response.data.user);
            }
          })

      }
    },
    async [GET_SELECTED_USER]({ commit }, userid) {
      try 
      {
        return UsersService.getProfile(userid)
        .then(response => {
          commit(SET_SELECTED_USER, response.data.profile);
        });
      } catch (exp) {
        throw exp;
      }
    },
    async [UPDATE_USER]({ commit }, user) {
      return AuthService.update(user)
        .then(response => {
          commit(SET_USER, response.data.user);
        });
    },
    checkAuth(context) {
      if (JwtService.getToken()) {
        ApiService.setHeader();
      }
    }
  }

export default {
  state,
  actions,
  mutations,
  getters
};

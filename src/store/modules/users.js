import { axiosApi, setToken, clearToken } from "../api";

export default {
  namespaced: true,
  state: {
    user: localStorage.getItem("user") || null,
    profile: null,
    token: localStorage.getItem("token") || "",
    selectedUser: null
  },
  getters: {
    username(state) {
      return (state.user && state.user.username) || null;
    },
    user(state) {
      return state.user;
    },
    selectedUser(state) {
      return state.selectedUser;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      if (
        window.LocalStorage /* function to detect if localstorage is supported*/
      ) {
        window.localStorage.setItem("kratosUser", payload);
      }
    },
    logOutUser(state) {
      clearToken();
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log("Log Out Done");
    },
    updateUserFromLocal(state) {
      state.token = JSON.parse(localStorage.getItem("token"));
      state.user = JSON.parse(localStorage.getItem("user"));
    },
    setSelectedUser(state, payload) {
      state.selectedUser = payload;
    }
  },
  actions: {
    getUsers: async function({ commit }) {
      const user = await axiosApi.get("/user");
      commit("setUser", user);
    },
    loginUser: async function({ commit }, { email, password }) {
      //clearToken();
      const token = JSON.parse(localStorage.getItem("token"));
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(token);
      console.log(user);
      console.log(token != null);
      if (token && user) {
        this.updateUserFromLocal();
        setToken(token);
      } else {
        try {
          const response = await axiosApi.post("/users/login", {
            user: {
              email,
              password
            }
          });
          if (response.data.user) {
            localStorage.setItem(
              "token",
              JSON.stringify(response.data.user.token)
            );
            localStorage.setItem("user", JSON.stringify(response.data.user));
            console.log(response.data.user.token);
            console.log(response.data.user);
            setToken(response.data.user.token);
            commit("setUser", response.data.user);
          }
        } catch (exp) {
          localStorage.removeItem("token");
          console.error(exp);
          throw exp;
        }
      }
    },
    getSelectedUser: async function({ commit }, userid) {
      await axiosApi.get(`/profiles/${userid}`).then(response => {
        console.log(response.data.profile);
        commit("setSelectedUser", response.data.profile);
      });
    }
  }
};

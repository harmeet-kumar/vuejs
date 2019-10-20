import { axiosApi } from "../../store/api";

const AuthService = {
  get() {
    return axiosApi.get("/user");
  },
  login(params) {
    return axiosApi.post("/users/login",params);
  },
  signUp(params) {
      return axiosApi.post("/users",params);
  },
  update(user) {
    return axiosApi.put(`/user`,user);
  }
}

export default AuthService;
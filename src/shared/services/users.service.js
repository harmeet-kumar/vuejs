import { axiosApi } from "../../store/api";

const UsersService = {
  followUser(usename) {
    return axiosApi.post(`/profiles/${usename}/follow`);
  },
  unFollowUser(usename) {
    return axiosApi.delete(`/profiles/${usename}/follow`);
  },
  getProfile(userid) {
    return axiosApi.get(`/profiles/${userid}`)
  }
}

export default UsersService;
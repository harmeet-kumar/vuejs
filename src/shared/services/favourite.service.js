import { axiosApi } from "../../store/api";

const FavouriteService = {
  add(slug) {
    return axiosApi.post(`articles/${slug}/favorite`);
  },
  remove(slug) {
    return axiosApi.delete(`articles/${slug}/favorite`);
  }
}

export default FavouriteService;
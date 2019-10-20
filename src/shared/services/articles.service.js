import { axiosApi } from "../../store/api";


const ArticlesService = {
  userFeed() {
    return axiosApi.get("articles/feed");
  },
  query( params) {
    return axiosApi.get("articles",{params});
  },
  get(slug) {
    return axiosApi.get(`articles/${slug}`);
  },
  create(params) {
    return axiosApi.post("articles", { article: params } );
  },
  update(slug, params) {
    return axiosApi.put(`articles/${slug}`, { article: params });
  },
  destroy(slug) {
    return axiosApi.delete(`articles/${slug}`);
  }
}

export default ArticlesService;
import { axiosApi } from "../../store/api";

const CommentsService = {
    get(slug){
        return axiosApi.get(`articles/${slug}/comments`);
    },
    add(slug,params) {
        return axiosApi.post(`articles/${slug}/comments`,params);
    },
    remove(slug,id) {
        return axiosApi.delete(`articles/${slug}/comments/${id}`);
    }
}

export default CommentsService;
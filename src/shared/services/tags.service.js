import { axiosApi } from "../../store/api";

const TagsService = {
    get(){
        return axiosApi.get(`tags`);
    }
}

export default TagsService;
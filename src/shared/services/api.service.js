
import axiosApi from "../../store/api";
import JwtService from "./jwt.service"

const ApiService = {

  setHeader() {
    axiosApi.setToken(JwtService.getToken());
  },
  getHeaders() {
    return {
      headers : {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Authorization":"Token " + JwtService.getToken()
        }
      }    
  }
}

export default ApiService;

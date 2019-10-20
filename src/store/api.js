import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://conduit.productionready.io/api"
});

export function setToken(jwt) {
  axiosApi.defaults.headers.common["Authorization"] = `Token ${jwt}`;
  axiosApi.defaults.headers.common["Content-Type"] = "application/json;charset=UTF-8";
  axiosApi.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  axiosApi.defaults.headers.common["Access-Control-Allow-Headers"] = "*";
}

export function clearToken() {
  delete axiosApi.defaults.headers.common["Authorization"];
  delete axiosApi.defaults.headers.common["Content-Type"];
  delete axiosApi.defaults.headers.common["Access-Control-Allow-Origin"];
  delete axiosApi.defaults.headers.common["Access-Control-Allow-Headers"];
  window.localStorage.removeItem("JWT");
}

export default {axiosApi,setToken,clearToken};

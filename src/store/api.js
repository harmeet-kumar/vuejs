import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://conduit.productionready.io/api"
});

export function setToken(jwt) {
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function clearToken() {
  delete axiosApi.defaults.headers.common["Authorization"];
  window.localStorage.removeItem("JWT");
}

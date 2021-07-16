import axios from "axios";

const api = axios.create({
  baseURL: "https://alerta-ufes-api.herokuapp.com/",
});

export default api;

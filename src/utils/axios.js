import axios from "axios";
import { store } from "../app/store";
import { authChange } from "../features/authSlice";





const adminAxios = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
adminAxios.interceptors.request.use((config) => {
  const token = store.getState()?.auth?.refreshToken;
  config.headers.authorization = `Bearer ${token}`;
  return config;
});

adminAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 403 || error.response.status === 401) {
      
      store.dispatch(authChange({ adminName: "", accessToken: "", refreshToken: "" }))


    } else {
      return Promise.reject(error);
    }

  }
);

export default adminAxios;
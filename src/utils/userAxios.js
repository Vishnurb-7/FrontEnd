import axios from "axios";
import { store } from "../app/store";
import {  userAuthChange, } from "../features/userAuthSlice";


const userAxios = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
});
userAxios.interceptors.request.use((config) => {
    const token = store.getState()?.userLogin?.refreshToken;
    config.headers.authorization = `Bearer ${token}`;
    return config;
});

userAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 403 || error.response.status === 401) {


            store.dispatch(userAuthChange({ user: "", accessToken: "", refreshToken: "", id: "" }))

        } else {
            return Promise.reject(error);
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
    }
);

export default userAxios;
import axios from "axios";
import { store } from "../app/store";
import { managersAuthChange,  } from "../features/managersAuthSlice";



const managerAxios = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
});
managerAxios.interceptors.request.use((config) => {
    const token = store.getState()?.managersLogin?.refreshToken;
    config.headers.authorization = `Bearer ${token}`;
    return config;
});

managerAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 403 || error.response.status === 401) {

            store.dispatch(managersAuthChange({ managers: "", accessToken: "", refreshToken: "", managerId: "" }))

        } else {
            return Promise.reject(error);
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
    }
);

export default managerAxios;
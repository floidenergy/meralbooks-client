import axios from "axios";
import store from "../store/store";

import { logout } from "../store/features/user";

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_LINK,
  withCredentials: true
})

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && response.status === 511) {
        store.dispatch(logout());
    }

    return Promise.reject(error)
  }
)

export default API;
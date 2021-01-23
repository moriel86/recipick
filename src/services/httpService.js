import axios from "axios";
import { toast } from "react-toastify";

const tokenKey = "token";

axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(tokenKey)

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 403;
    if (expectedError) toast("Unexpected error");
    return Promise.reject(error);
})

const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete
};
export default http;
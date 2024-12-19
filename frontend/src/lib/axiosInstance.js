import axios from "axios";

const axiosInstanace = axios.create({
    baseURL: "http://localhost:2000/api",
    withCredentials: true
})

export default axiosInstanace
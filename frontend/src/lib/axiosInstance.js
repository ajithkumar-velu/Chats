import axios from "axios";

const axiosInstanace = axios.create({
    baseURL: "https://chats-bnackend.vercel.app/api",
    withCredentials: true
})

export default axiosInstanace

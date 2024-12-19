import axios from "axios";

const axiosInstanace = axios.create({
    baseURL: "https://chats-backend-beige.vercel.app"+ "/api",
    withCredentials: true
})

export default axiosInstanace

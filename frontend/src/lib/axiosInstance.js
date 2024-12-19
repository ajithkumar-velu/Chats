import axios from "axios";

const axiosInstanace = axios.create({
    baseURL: "https://chats-backend-beige.vercel.app"+ "/api",
    withCredentials: true,
     headers: {
        "Content-Type": "application/json",
    },
})

export default axiosInstanace

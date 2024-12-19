import { create } from 'zustand'
import axiosInstanace from '../lib/axiosInstance';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client'

const BASE_UTR = "http://localhost:2000"

export const useAuthStore = create((set, get) => ({

    authUser: null,
    isSignup: false,
    isLogin: false,
    isChecking: true,
    socket: null,
    onlineUsers: null,
    profileInfoUser: null,
    isprofileUpdate: false,
    isnameEdit: false,

    check: async () => {
        try {
            set({ isChecking: true })
            const res = await axiosInstanace.post("/user/check")
            set({ authUser: res.data })
            get().connectSocket()
        } catch (error) {
            console.log("Error in checkAuth", error.message);
            set({ authUser: null })
        } finally {
            set({ isChecking: false })
        }
    },

    signup: async (data) => {
        try {
            set({ isSignup: true })
            const res = await axiosInstanace.post('/user/signup', data)
            set({ authUser: res.data })
            get().connectSocket()
            toast.success("Account created Successfully")

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.message);
        } finally {
            set({ isSignup: false })
        }
    },
    login: async (data) => {
        try {
            set({ isLogin: true })
            const res = await axiosInstanace.post('/user/login', data)
            set({ authUser: res.data })
            get().connectSocket()
            toast.success("Login Successfully");

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.message);
        } finally {
            set({ isLogin: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstanace.get('/user/logout')
            set({ authUser: null })
            get().disconnectSocket()
            toast.success("Logout successfully")

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error.message);
        }
    },

    connectSocket: () => {
        const { authUser } = get()

        if (!authUser && get().socket) return

        const socket = io(BASE_UTR, {
            query: { userId: authUser._id }
        })

        socket.connect()

        socket.on("getOnlineUsers", (userId) => {
            set({ onlineUsers: userId })
        })

        set({ socket: socket })

    },

    profileUpdate: async (data) => {
        try {
            set({isprofileUpdate: true})
            const  res = await axiosInstanace.put('/user/update-profile', {profile: data})
            set({authUser: res.data})
            // console.log(res.data);
            toast.success("Profile update Successfully!")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error.message);
        } finally {
            set({isprofileUpdate : false})
        }
    },

    nameEdit: async (data)=>{
        set({ isnameEdit: true})
        try {

            const res = await axiosInstanace.put('/user/edit-name', {name: data})
            // console.log(get().profileInfoUser);
            
            
            set({ authUser: res.data})
            // set({ setProfileInfoUser: res.data})
            // console.log(get().authUser);
            
            // console.log(get().profileInfoUser);
            toast.success("Name Updated Successfully")
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.message);
        } finally{
            set({isnameEdit: false})
        }
    },

    disconnectSocket: () => {
        if (get().socket) get().socket.disconnect()
    },

    setProfileInfoUser: (profileInfoUser)=>set({profileInfoUser})

}))

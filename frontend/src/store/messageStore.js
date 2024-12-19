import { create } from 'zustand'
import axiosInstanace from '../lib/axiosInstance'
import { toast } from 'react-hot-toast'
import { useAuthStore } from './userAuth'
import { groupMessagesByDate } from '../lib/utils'

export const useMessageStore = create((set, get) => ({

    messages: [],
    users: [],
    selectedUser: null,
    isMessageCheck: false,
    isSendMessage: false,
    isSidebar: true,


    sidebarUsers: async () => {
        try {
            set({isSidebar: true})
            const res = await axiosInstanace.post('/message/sidebar-users')
            set({users: res.data})
            // console.log(res.data);
        } catch (error) {
            console.log("Error in sidebarUsers: ", error.message);
            toast.error(error.response.data.message)
        } finally{
            set({isSidebar: false})
        }
    },

    getMessage: async (data) => {
        try {
            set({isMessageCheck: true})

            const res = await axiosInstanace.post(`/message/${data}`)
            let msg = groupMessagesByDate(res.data)
            
            set({messages: msg})

        } catch (error) {
            console.log("Error in getMessages: ", error.message);
            toast.error(error.response.data.message)
        } finally{
            set({isMessageCheck: false})

        }
    },

    sendMessage: async (data) =>{
        const { selectedUser, messages } = get()
        console.log(data);
        
        try {
            set({setisSendMessage: true})
            const res = await axiosInstanace.post(`/message/send/${selectedUser._id}`, {text: data})
          
            // set({messages: {...messages.Today, messages[Today]:val}})
            // set((state) => ({
            //     messages: {
            //         ...state.messages, // Keep the current messages structure
            //         Today: [...state.messages.Today, res.data], // Append the new message to `Today`
            //     },
            // }));

            set({messages: {...messages, Today: [...messages.Today, res.data]}})

            console.log(res.data);
            
            
        } catch (error) {
            console.log("Error in sendMessage: ", error.message);
            toast.error(error.response.data.message)
        } finally {
            set({isSendMessage: false})
        }
    },

    subscribeMessage: () =>{

        const { selectedUser } = get()

        if(!selectedUser) return

        const socket = useAuthStore.getState().socket

        socket.on("newMessage", (newMessage)=>{
            // console.log(newMessage.senderId, selectedUser._id);
            
            if(newMessage.senderId === selectedUser._id){

                set({messages: {...get().messages, Today: [...get().messages.Today, newMessage] }})
            }
        })
    },
    unsubscribeMessage: () =>{
        const socket = useAuthStore.getState().socket
        socket.off("newMessage")
    },

    setSelectedUser: (selectedUser) => set({selectedUser: selectedUser})
})) 

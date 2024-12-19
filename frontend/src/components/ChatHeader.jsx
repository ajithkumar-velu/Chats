
import { images } from '../assets/assets'
import { useMessageStore } from '../store/messageStore'
import { XCircle } from "lucide-react"
import { useAuthStore } from '../store/userAuth'
import { useNavigate } from 'react-router-dom'

const ChatHeader = () => {
    const { onlineUsers } = useAuthStore()
    const { selectedUser, setSelectedUser } = useMessageStore()
    const { setProfileInfoUser } = useAuthStore()
    const navigate = useNavigate()

    const handleOnclick = (user) =>{
        setProfileInfoUser(user)
        navigate('/profile')
    }

    const handleCancel = () =>{
        setProfileInfoUser(null)
        setSelectedUser(null)
    }
    return (
        <div className='bg-base-300 flex justify-between items-center rounded-box' >
            <div className='flex gap-4 items-center px-4 py-2 cursor-pointer' >


                <img onClick={()=>handleOnclick(selectedUser)} src={ selectedUser.profile ||images.user_avatar} className='size-12' alt="" />
                <div>

                    <p>{selectedUser.name}</p>
                    <p className='text-xs opacity-50' >{onlineUsers.includes(selectedUser._id) ? "online" : "offline"}</p>
                </div>
            </div>
            <p className='mr-5 btn btn-ghost btn-circle' >
                <XCircle onClick={handleCancel} className='' />
            </p>
        </div>
    )
}

export default ChatHeader
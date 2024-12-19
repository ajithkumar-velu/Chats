
import { images } from "../assets/assets"
import Sidebar from "../components/Sidebar"
import { useMessageStore } from "../store/messageStore"
import { useAuthStore } from "../store/userAuth"
import { Mail, User,  } from "lucide-react"



const Profile = () => {
  const { selectedUser } = useMessageStore()
  const { onlineUsers } = useAuthStore()


  return selectedUser && (
    <div className="md:p-2 p-2 md:pl-[74px] pt-[85px] flex gap-2 h-screen bg-red-300" >
      <Sidebar />
      
      <div className={`bg-base-100 overflow-hidden flex-col items-center rounded-box flex-1  ${selectedUser ? "flex" : "hidden md:flex"}`} >
        <div className="bg-base-200 max-w-2xl size-full flex flex-col items-center pt-24 " >


          <div className=" flex flex-col gap-5 relative text-center ">



            <div className={`overflow-hidden ring-4 rounded-full flex items-center justify-center ${onlineUsers.includes(selectedUser._id) ? "ring-success" : "ring-neutral-content"}`} >
              <img className="size-32" src={selectedUser.profile || images.user_avatar} />
            </div>

            <p className=" capitalize" >{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</p>

          </div>
          <div className="w-full flex flex-col justify-center gap-3 items-center" >
            <label className="form-control w-full max-w-md ">
              <div className="label">
                <p className="flex items-center gap-1.5" >

                  <User className="size-5" />
                  Username
                </p>
              </div>
              <div className="input input-bordered w-full max-w-md bg-base-300 flex items-center" >

                <input readOnly value={selectedUser.name} type="text" placeholder="Type here" className="grow" />


              </div>
            </label>
            <label className="form-control w-full max-w-md ">
              <div className="label">
                <p className="flex items-center gap-1.5" >

                  <Mail className="size-5" />
                  Email
                </p>
              </div>
              <input readOnly value={selectedUser.email} type="text" placeholder="Type here" className="input input-bordered w-full max-w-md bg-base-300" />

            </label>
          </div>
          <div className="flex justify-between w-full max-w-md mt-10 border-t-2 border-gray-500 pt-5" >
            <p>Since</p>
            <p>{selectedUser.createdAt.toString().split('T')[0]}</p>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Profile
import { images } from "../assets/assets"
import Sidebar from "../components/Sidebar"
import { useMessageStore } from "../store/messageStore"
import { useAuthStore } from "../store/userAuth"
import { Camera, Mail, Pencil, Save, User, X } from "lucide-react"
import { useState } from "react"
const LogeduserProfile = () => {
    const { selectedUser } = useMessageStore()
    const { authUser, profileUpdate, isprofileUpdate, nameEdit, isnameEdit } = useAuthStore()
    const [profileImage, setProfileImage] = useState(null)
    const [username, setUsername] = useState('')
    const [isname, setIsname] = useState(false)

    const handleProfileChange = (e) => {
        const profile = e.target.files[0]
        if (!profile) return

        const reader = new FileReader()
        reader.readAsDataURL(profile)

        reader.onload = async () => {
            setProfileImage(reader.result)
            await profileUpdate(reader.result)
        }
    }

    const handleNameEdit = () => {
        if (!username) return

        nameEdit(username)
        setIsname(false)
        setUsername("")
    }



    return authUser && (
        <div className="md:p-2 p-2 md:pl-[74px] pt-[85px] flex gap-2 h-screen bg-red-300" >
            <Sidebar />
            <div className={`bg-base-100 overflow-hidden flex-col items-center rounded-box flex-1  ${selectedUser ? "flex" : "hidden md:flex"}`} >
                <div className="bg-base-200 max-w-2xl size-full flex flex-col items-center pt-24 " >


                    {/* Profile */}
                    <div className=" flex flex-col gap-5 relative text-center ">

                        <div className={`overflow-hidden ring-4 rounded-full flex items-center justify-center ring-success`} >
                            {isprofileUpdate ?
                                <div className="size-32 flex items-center justify-center" >
                                    <p className=" loading " ></p>
                                </div> :
                                <img className="size-32" src={profileImage || authUser.profile || images.user_avatar} />
                            }
                            <label htmlFor="profile" className=" absolute bottom-12 -right-4 p-2 btn bg-base-300 btn-circle hover:bg-base-100" >
                                <input onChange={handleProfileChange} className="hidden" type="file" name="profile" id="profile" />

                                <Camera className="size-6" />
                            </label>
                        </div>

                        <p className=" capitalize" >Online</p>

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
                                {
                                    isname ?
                                        <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Type here" className="grow" /> :
                                        <input readOnly value={authUser.name} type="text" placeholder="Type here" className="grow capitalize" />
                                }

                                <div>
                                    {isname ?
                                        <div className="flex gap-" >
                                            <div className="btn btn-circle btn-ghost" >
                                                <Save onClick={handleNameEdit} className="size-5" />
                                            </div>
                                            <div onClick={() => setIsname(false)} className="btn btn-circle btn-ghost" >
                                                <X className="size-5" />
                                            </div>
                                        </div> :
                                        <div onClick={() => setIsname(true)} className="btn btn-circle btn-ghost" >
                                            {isnameEdit ?
                                                <div className=" flex items-center justify-center" >
                                                    <p className=" loading " ></p>
                                                </div> :
                                                <Pencil className="size-5" />}
                                        </div>
                                    }
                                </div>

                            </div>
                        </label>
                        <label className="form-control w-full max-w-md ">
                            <div className="label">
                                <p className="flex items-center gap-1.5" >

                                    <Mail className="size-5" />
                                    Email
                                </p>
                            </div>
                            <input readOnly value={authUser.email} type="text" placeholder="Type here" className="input input-bordered w-full max-w-md bg-base-300" />

                        </label>
                    </div>
                    <div className="flex justify-between w-full max-w-md mt-10 border-t-2 border-gray-500 pt-5" >
                        <p>Since</p>
                        <p>{authUser.createdAt?.toString().split('T')[0]}</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default LogeduserProfile
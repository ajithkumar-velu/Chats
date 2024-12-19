import { useEffect} from "react";
import { useMessageStore } from "../store/messageStore"
import { images } from "../assets/assets";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { Link } from "react-router-dom";



const Sidebar = () => {
    const { users, sidebarUsers, setSelectedUser, selectedUser,  isSidebar } = useMessageStore()
    

    useEffect(() => {
        sidebarUsers()
    }, [sidebarUsers, selectedUser])

    

    if(isSidebar){
        return <SidebarSkeleton />
    }
    

    return (
        <div className={`w-full md:w-64 bg-base-100 overflow-hidden rounded-box ${selectedUser ? "hidden md:block" : ""}`} >
            <ul className="menu menu-md bg-base-200 w-full ">
                {
                    users.map((user, idx) => (


                        <li  key={idx} onClick={() => setSelectedUser(user)} className={`flex rounded-box ${user._id === selectedUser?._id && "bg-base-300"} `} >


                            <Link to={'/'} className="flex gap-2 items-center" >

                                <div className="avatar" >
                                    <div className="w-12 rounded-full">
                                        <img src={user.profile || images.user_avatar} />
                                    </div>
                                </div>
                                <p>{user.name}</p>
                            </Link >
                        </li>

                    ))
                }
            </ul>

        </div>
    )
}

export default Sidebar
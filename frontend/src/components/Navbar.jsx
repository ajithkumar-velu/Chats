import { LogOut, MessageSquareText, Moon, Sun } from "lucide-react"
import { useAuthStore } from "../store/userAuth"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { images } from "../assets/assets"
import { useThemeStore } from "../store/useTemeStore"

const Navbar = () => {
  const { logout, authUser, setProfileInfoUser } = useAuthStore()
  const [mode, setMode] = useState(true)
  const { setTheme } = useThemeStore()


  useEffect(() => {
    if (mode) return setTheme("dark")
    setTheme("light")
  }, [mode])

  const navigate = useNavigate()

  return (
    <div className=" " >

      <div className="navbar md:fixed h-[98%] top-2 hidden bg-base-300 ml-2 md:flex flex-col  justify-between items-center w-[58px] rounded-box py-3">
        <Link to={'/'} className="bg-red-300/20 p-2 rounded-xl flex items-center justify-center">
          <MessageSquareText className="size-7 text-red-500" />
        </Link>

        <div className="flex flex-col gap-1" >
          <div className="navbar-center">

            {/* profile update */}

            {/* {authUser && <label htmlFor="profile" className="btn btn-ghost btn-circle">
              <input onChange={handleProfileChange} className="hidden" type="file" name="profile" id="profile" />
              <img src={profileImage || authUser?.profile || images.user_avatar} className="size-9 rounded-full" />
            </label>} */}


            <div onClick={()=>navigate('your-profile')}  className="btn btn-ghost btn-circle">
              <img src={ authUser?.profile || images.user_avatar} className="size-9 rounded-full" />
            </div>


            <button onClick={() => setMode(!mode)} className="btn btn-ghost btn-circle">
              {mode ?
                <Sun className="h-5 w-5" /> :
                <Moon className="h-5 w-5" />
              }
            </button>

          </div>

          {/* <div className="nva">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <Settings className="h-5 w-5" />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><NavLink to={'/'}>Homepage</NavLink></li>
                <li><NavLink to={"/login"}>login</NavLink></li>
                <li><NavLink to={"/signup"}>signup</NavLink></li>
              </ul>
            </div>
          </div> */}
          {/* <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Chats</a>
        </div> */}
          {authUser &&
            <div className="navbar-center">
              <button className="btn btn-ghost btn-circle">
                <LogOut onClick={logout} className="h-5 w-5" />
              </button>

            </div>}
        </div>

      </div>

      {/* mobile screen navbar */}
      <div className="md:hidden flex justify-between navbar fixed top-2 w-[98%] ml-1.5 rounded-box  bg-base-100" >
        <Link to={'/'} className="bg-red-300/20 p-2 rounded-xl flex items-center justify-center">
          <MessageSquareText className="size-7 text-red-500" />
        </Link>


        <div className="">

          <button onClick={() => setMode(!mode)} className="btn btn-ghost btn-circle">
            {mode ?
              <Sun className="h-5 w-5" /> :
              <Moon className="h-5 w-5" />
            }
          </button>
          {/* <div className="btn btn-ghost btn-circle" >

            <Settings className="size-6 " />
          </div> */}

          {authUser &&
            <div className="navbar-center">
              <button className="btn btn-ghost btn-circle">
                <LogOut onClick={logout} className="h-5 w-5" />
              </button>

            </div>}


        </div>
      </div>


    </div>

  )
}

export default Navbar
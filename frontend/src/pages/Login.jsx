import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/userAuth'
const Login = () => {

  const [showPassword, setShowPassword] = useState(false)
  const { login, isLogin, authUser } = useAuthStore()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData)
  }

  const onchangeHandler = (e) => {
    e.preventDefault()

    const name = e.target.name
    const value = e.target.value

    setFormData((prev) => ({ ...prev, [name]: value }))

  }

  if (isLogin && !authUser) {
    return (
      <div className='h-screen flex items-center justify-center' >
        <p className='loading loading-dots loading-lg' ></p>
      </div>
    )
  }

  return (
    <div className=' h-screen' >
      <div className='md:grid grid-cols-2 h-full' >
        <form onSubmit={handleSubmit} className='flex h-full md:pl-[74px] items-center justify-center bg-red-300 px-3' >
          <div className='flex flex-col gap-3 w-full max-w-sm' >

            <label className="input input-bordered flex items-center gap-2">
              <Mail className="h-4 w-4 opacity-70" />
              <input onChange={onchangeHandler} name='email' type="email" className="grow" placeholder="Email" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <Lock className="h-4 w-4 opacity-70" />
              <input onChange={onchangeHandler} name='password' type={showPassword ? "text" : "password"} className="grow" placeholder="••••••••" />
              <div className=' cursor-pointer' onClick={() => setShowPassword(!showPassword)} >
                {
                  showPassword ?
                    <Eye className="h-4 w-4 opacity-70" /> :
                    <EyeOff className="h-4 w-4 opacity-70" />
                }
              </div>
            </label>
            <div className=' bg-base-100 rounded-full' >

<button type='submit' className='btn btn-ghost btn-circle w-full' >
  <p className='' >

  Login
  </p>
  </button>
</div>
            <p className='text-base-300 text-right font-semibold mr-2'>
              Don&apos;t have an account? {" "}
              <Link className='link link-primary' to={"/signup"} >Create account</Link>
            </p>
          </div>
        </form>
        <div className=' text-center md:flex flex-col gap-5 items-center justify-center hidden px-3' >

          <p className='text-4xl font-bold' >Welcome Back!</p>
          <p>Log in to reconnect with your friends and continue the conversation.</p>
        </div>
      </div>
    </div>
  )
}

export default Login
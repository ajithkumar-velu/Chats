import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/signup';
import Home from './pages/Home';
import { useAuthStore } from './store/userAuth';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import { useThemeStore } from './store/useTemeStore';
import Profile from './pages/Profile';
import LogeduserProfile from './pages/LogeduserProfile';
const App = () => {
  const {  check, isChecking, authUser, profileInfoUser } = useAuthStore()
  

  // console.log(onlineUsers);
  
  const { theme } = useThemeStore()
  useEffect(()=>{
    check()
  }, [check])  
  if(isChecking && !authUser){
    return (
      <div className='h-screen flex items-center justify-center' >
        <p className='loading loading-spinner loading-lg' ></p>
      </div>
    )
  }
  return (
    <div data-theme={theme} >
      
      <Navbar />
      <Toaster/>      

      <Routes>
        <Route path='/' element={authUser ? <Home />: <Navigate to ="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={'/'} />} />
        <Route path='/profile' element={authUser && profileInfoUser ? <Profile /> : <Navigate to={'/login'} />} />
        <Route path='/your-profile' element={authUser ? <LogeduserProfile /> : <Navigate to={'/login'} />} />
      </Routes>
    </div>
  )
}

export default App
import React from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import Home from '../Pages/Home'
import LoginForm from '../Pages/LoginForm'
import ForgotPass from '../Pages/ForgotPass'
import ProfileForm from '../Pages/ProfileForm'
import MainPage from '../Pages/MainPage'
 
import { useSelector } from 'react-redux/es/hooks/useSelector'
 


function Routee() {
    //  const authCtx = useContext(AuthContext);
    const isLoggedIn=useSelector(state=>state.auth.isAuthenticated)
    console.log(isLoggedIn + "we are in route")

    
  return (
    <Routes>

   <Route path="/" element={<LoginForm/>}></Route>
   <Route path="/mainpage" element={isLoggedIn ? (<MainPage/>) :
  (<Navigate to="/" replace />)}></Route>

   <Route path='/submitdetails' element={<ProfileForm/>}></Route>
   <Route path="/forgotpass" element = {<ForgotPass/>}></Route>
         <Route path="/home" element={isLoggedIn ? (<Home />) : 
          (<Navigate to="/" replace />)}/>          
    </Routes>
  )
}

export default Routee
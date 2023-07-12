import React from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import Home from '../Pages/Home'
import AuthContext from '../LoginStore/Auth-context'
import { useContext } from 'react'
import LoginForm from '../Pages/LoginForm'
import ForgotPass from '../Pages/ForgotPass'
import ProfileForm from '../Pages/ProfileForm'
import MainPage from '../Pages/MainPage'

function Routee() {
     const authCtx = useContext(AuthContext);
    
  return (
    <Routes>

   <Route path="/" element={<LoginForm/>}></Route>
   <Route path="/mainpage" element={authCtx.isLoggedIn ? (<MainPage/>) :
  (<Navigate to="/" replace />)}></Route>

   <Route path='/submitdetails' element={<ProfileForm/>}></Route>
   <Route path="/forgotpass" element = {<ForgotPass/>}></Route>
         <Route path="/home" element={authCtx.isLoggedIn ? (<Home />) : 
          (<Navigate to="/" replace />)}/>          
    </Routes>
  )
}

export default Routee
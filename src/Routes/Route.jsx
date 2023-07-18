import React from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import Home from '../Pages/Home'
import LoginForm from '../Pages/LoginForm'
import ForgotPass from '../Pages/ForgotPass'
import ProfileForm from '../Pages/ProfileForm'
import MainPage from '../Pages/MainPage'

import { useSelector } from 'react-redux/es/hooks/useSelector'
import LoggedIn from '../Pages/LoggedIn'
 


function Routee() {
    //  const authCtx = useContext(AuthContext);
    const isLoggedIn=useSelector(state=>state.auth.isAuthenticated)
     

    
  return (
    <Routes>
       <Route path="/loggedin" element={isLoggedIn ? (<LoggedIn />) : 
          (<Navigate to="/login" replace />)}/>
       <Route path="/" element={isLoggedIn ? (<Home />) : 
          (<Navigate to="/login" replace />)}/>

   <Route path="/" element={<Home/>}></Route>
   <Route path='/login' element={<LoginForm/>}></Route>
   <Route path="/mainpage" element={isLoggedIn ? (<MainPage/>) :
  (<Navigate to="/" replace />)}></Route>

   <Route path='/submitdetails' element={<ProfileForm/>}></Route>
   <Route path="/forgotpass" element = {<ForgotPass/>}></Route>
                  
    </Routes>
  )
}

export default Routee
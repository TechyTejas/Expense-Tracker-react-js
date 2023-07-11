import React from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import Home from '../Pages/Home'
import AuthContext from '../LoginStore/Auth-context'
import { useContext } from 'react'
import LoginForm from '../Pages/LoginForm'


function Routee() {
     const authCtx = useContext(AuthContext);
    
  return (
    <Routes>
   <Route path="/" element={<LoginForm/>}></Route>
         <Route path="/home" element={authCtx.isLoggedIn ? (<Home />) : 
          (<Navigate to="/" replace />)}/>          
    </Routes>
  )
}

export default Routee
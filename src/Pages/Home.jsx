import React from 'react'
import classes from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import LoggedIn from './LoggedIn';
import AuthContext from '../LoginStore/Auth-context';
import { useContext } from 'react';

function Home() {
  const authCtx= useContext(AuthContext);
  const navigate=useNavigate();
  const nextPageHandler = (event) => {
    navigate('/submitdetails')
  }

  const logoutHandler = () => {
     authCtx.logout();
  }

  return (
    <>
   <div>
      <ui  className={classes.navbar}>
        
        <h3> Welcome to expense tracker</h3>

        <div className={classes.headerdiv}>
          <li><button onClick={logoutHandler}>Logout</button></li>
        <li> <h4>Your Profile is incomplete</h4> </li>
        <li className={classes.link} onClick={nextPageHandler}> <h4>Complete now</h4></li>
        </div>
        </ui>
      </div>
      
        <br/><br/>
        <LoggedIn/>
        </>
    
    

  )
}

export default Home
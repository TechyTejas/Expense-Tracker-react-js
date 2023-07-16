import React from 'react'
import classes from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import LoggedIn from './LoggedIn';
import { authActions } from '../LoginStore/auth-reducer';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';


function Home() {
  const isPremium=useSelector(state=>state.auth.ispremium);
  

  const dispatch=useDispatch();
  useSelector(state=>state.auth.isAuthenticated)

  const navigate=useNavigate();
  const nextPageHandler = (event) => {
    navigate('/submitdetails')
  }

  const logoutHandler = () => {
    //  authCtx.logout();
    dispatch(authActions.isLogout())
  }
  
  useEffect(() => {
    const logoutTimeout = setTimeout(() => {
      logoutHandler();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds
  
    return () => {
      clearTimeout(logoutTimeout);
    };
  }, []);

  function themeChangeHandler () {
      dispatch(authActions.isToggle())   
  } 

  

  return (
    <>
   <div>
      <ui  className={classes.navbar}>
        
        <h3> Welcome to expense tracker</h3>

        <div className={classes.headerdiv}>
          {isPremium && <li><buttton>Primeee</buttton></li>}
          <li><button onClick={themeChangeHandler}>Dark</button></li>
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
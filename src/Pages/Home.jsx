import React from 'react'
import classes from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import LoggedIn from './LoggedIn';

function Home() {
  const navigate=useNavigate();
  const nextPageHandler = (event) => {
    navigate('/submitdetails')
  }

  return (
   <div>
      <ui  className={classes.navbar}>
        
        <h3> Welcome to expense tracker</h3>

        <div className={classes.headerdiv}>
        <li> <h4>Your Profile is incomplete</h4> </li>
        <li className={classes.link} onClick={nextPageHandler}> <h4>Complete now</h4></li>
        </div>

        
        </ui>
        <br/><br/>
        <LoggedIn/>
    </div>
    

  )
}

export default Home
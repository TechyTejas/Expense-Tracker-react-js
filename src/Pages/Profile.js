import React from 'react'
import classes from './profile.module.css'
import { useNavigate } from 'react-router-dom'


function Profile() {
    const navigate=useNavigate();
    const nextPageHandler = (event) => {
      navigate('/submitdetails')
    }
  
  return (
    <div>
        <ul>
         <h4>Your Profile is incomplete</h4>
        <h4 className={classes.link} onClick={nextPageHandler}> Complete now</h4>
        </ul>
    </div>
  )
}

export default Profile
import React,{useRef} from 'react'
import AuthContext from '../LoginStore/Auth-context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Forgotpass.module.css'


function ForgotPass() {
    const navigate = useNavigate();
    const passchangeRef = useRef();
    const authCtx = useContext(AuthContext);

    
    const passwordChangeHandler = (event) => {
        event.preventDefault();
        const newPass = passchangeRef.current.value;
        console.log(newPass  + " this is updated password")
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA0zbgxIYwUu9iBaOHgx81CkJJN4aSO6Xc',
            {
              method: 'POST',
              body: JSON.stringify({
                idToken: authCtx.token,
                password: newPass,
                returnSecureToken: false,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          ).then((res) => {
            navigate('/');
          });
        };
      
        
    
  return (
    <form onSubmit={passwordChangeHandler} className={classes.forgot}>

        <label><h2>Enter New Pass and Remember it..!</h2></label>
        <br/>
        <input type="password" ref={passchangeRef} ></input>
        <br/>
        <button>Submit</button>
    </form>
  )
}

export default ForgotPass
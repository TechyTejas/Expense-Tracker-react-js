import { useRef, useState} from "react";
import classes from "./LoginForm.module.css";
// import AuthContext from "../LoginStore/Auth-context";
import { useNavigate } from "react-router-dom";
import { authActions } from "../LoginStore/auth-reducer";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";

function LoginForm() {
  const navigate = useNavigate();

  const dispatch=useDispatch()
  const isLoggedin=useSelector(state=>state.auth.isAuthenticated);

  // const authCtx = useContext(AuthContext);

  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const CnfmpasswordRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // const enterCnfmpassword = CnfmpasswordRef.current.value;
    console.log(enteredEmail, enteredPassword);
    localStorage.setItem('email', enteredEmail);

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0zbgxIYwUu9iBaOHgx81CkJJN4aSO6Xc";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0zbgxIYwUu9iBaOHgx81CkJJN4aSO6Xc";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        //here we passing data
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          //The response holds error
          return response.json().then((data) => {
            let errorMessage = "Authentication failed!";

            //if(data && data.error && data.error.message){
            //   errorMessage=data.error.message;
            // }
            // alert(errorMessage)
            // console.log(data);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // authCtx.login(data.idToken); //here we passing that token which we getting from firbase
        dispatch(authActions.isLogin(data.idToken))
        //  console.log(data.idToken + " tejass ")
        // console.log(data)
        console.log(isLoggedin)
        navigate("/home");
        console.log("login successfulyy");
      })
      .catch((err) => {
        alert(err.message);
      });

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  const forgotPassHandler = () => {
    navigate('/forgotpass');
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authActions.isLogin(token));
    } 
  }, []);
  

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
          {isLogin && (
            <button
              style={{
                textDecoration: "underline",
                border: "none",
                background: "none",
              }}
              onClick={forgotPassHandler}
            >
              forgot password
            </button>
          )}

          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="password"
                ref={CnfmpasswordRef}
                required
              />
            </div>
          )}
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default LoginForm;

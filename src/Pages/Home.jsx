import React from "react";
import classes from "./Home.module.css";
import { useEffect } from "react";
import { authActions } from "../LoginStore/auth-reducer";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



function Home() {
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const isPremium = useSelector((state) => state.auth.ispremium);

  const Islogin = useSelector((state) => state.auth.isAuthenticated)
  // console.log(Islogin  + " i guess ye they are logg in")

  useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.isLogout());
    navigate("/login")
  };

  useEffect(() => {
    const logoutTimeout = setTimeout(() => {
      logoutHandler();
    }, 5*60*1000); // 5 minutes in milliseconds

    return () => {
      clearTimeout(logoutTimeout);
    };
  }, []);



  return (
    <div>
      <ui className={classes.navbar}>
        <h3> Welcome to expense tracker</h3>

        <div className={classes.headerdiv}>
          {isPremium && (
              <buttton className={classes.buttonn}>Primeee</buttton> 
          )}
         { Islogin  && <button onClick={logoutHandler} className={classes.buttonn}>
            Logout
          </button>}
        </div>
      </ui>
      <br />
      <br />
    
    </div>
  );
}

export default Home;

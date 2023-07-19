import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import classes from "./Loggin.module.css";
import { useEffect } from "react";
import { authActions } from "../LoginStore/auth-reducer";
import { useDispatch } from "react-redux";

function LoggedIn() {
  //  useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch();

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(authActions.isLogin(token));
  }, []);

  const navigate = useNavigate();
  const [emailIsVerified, setEmailIsVerified] = useState(false);
  async function verifyHandler() {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    console.log(email + "and " + token);

    const data = {
      requestType: "VERIFY_EMAIL",
      idToken: token,
    };

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA0zbgxIYwUu9iBaOHgx81CkJJN4aSO6Xc",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData + "Verification email sent here");
      if (responseData.email === email) {
        setEmailIsVerified(true);
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  }
  const changeHandler = () => {
    navigate("/mainpage");
  };



  return (
    <div className={classes.container}>
      <div>
        <h1>Login successfully</h1>
      </div>

      <div className={classes.card}>
        <Profile />
      </div>

      <div className={classes.card}>
        <h2>Visit Expense Tracker</h2>
        <br />
        <button onClick={changeHandler} className={classes.button}>
          tracker
        </button>
      </div>

      <div className={classes.card}>
        <h2>Verify your EmailId</h2>
        <br />

        <button onClick={verifyHandler} className={classes.button}>
          Verify
        </button>
      </div>

      <div className={classes.card}>
        {emailIsVerified ? (
          <h2 style={{ color: "green" }}>Email is verified</h2>
        ) : (
          <h2 style={{ color: "red" }}>Email is not verified</h2>
        )}
      </div>
    </div>
  );
}

export default LoggedIn;

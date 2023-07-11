import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoggedIn() {
    const navigate=useNavigate();
  const [emailIsVerified, setEmailIsVerified] = useState(false);
  async function verifyHandler() {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    console.log(email +"and "+ token)

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
      console.log( responseData + "Verification email sent here");
      if (responseData.email === email) {
        setEmailIsVerified(true);
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  }
  const changeHandler = () => {
      navigate('/submitdetails')
  }

  return (
    <div>
      <h2>Login successfully</h2>
      <button onClick={changeHandler} >Update</button>
      <button onClick={verifyHandler}>Verify</button>
      {emailIsVerified ? (
        <h2>Email is verified</h2>
      ) : (
        <h2>Email is not verified</h2>
      )}
    </div>
  );
}

export default LoggedIn;

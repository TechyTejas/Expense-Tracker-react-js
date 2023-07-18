import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProfileForm.module.css";

function ProfileForm() {
    const navigate=useNavigate();
  const nameRef = useRef();
  const UrlRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const name = nameRef.current.value;
    const url = UrlRef.current.value;
    const Token = localStorage.getItem("token");

    const details = {
      idToken: Token,
      CustName: name,
      CustUrl: url,
      returnSecureToken: true,
    };
    console.log("may details", details);
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA0zbgxIYwUu9iBaOHgx81CkJJN4aSO6Xc",
      {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile updatation done", data);
      })
      .catch((error) => {
        alert("please submit again");
      });

    // const data= await response.json();
    // console.log(data);

    nameRef.current.value = "";
    UrlRef.current.value = "";
  }

  async function fetchData() {
    const Token = localStorage.getItem("token");
    console.log("TOKEN", Token);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA0zbgxIYwUu9iBaOHgx81CkJJN4aSO6Xc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: Token,
        }),
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data", data);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const changeHandler = () => {
    navigate('/loggedin')
  }

  return (
    <div className={classes.div}>
      <h2>Winners never quit, quitters never win</h2>
      <form onSubmit={submitHandler} className={classes.formm}>
        <label className={classes.labell}>Contact Details</label>
        
        <br />

        <label className={classes.labell}>Full Name</label>
        <input ref={nameRef}></input>
        <label className={classes.labell}>Image URL</label>
        <input ref={UrlRef}></input>
        <br />
        <button className={classes.buttonn}>Submit</button>
        <br/>
        <button onClick={changeHandler} className={classes.buttonn}>Previous</button>
      </form>
    </div>
  );
}

export default ProfileForm;

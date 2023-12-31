import React, { useEffect, useRef, useState } from "react";
import { authActions } from "../LoginStore/auth-reducer";
import { useDispatch  } from "react-redux";
import classes from './mainpage.module.css'


function MainPage() {
  const dispatch=useDispatch();

  const [details, setDetails] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);

  const amountRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();

  //in order to make cart user specific data sshould be post by the emailid which we can get from localst
  const enteredEmail=localStorage.getItem('email');
  const updatedEmail = enteredEmail ? enteredEmail.replace('@', '').replace('.', '') : '';

  async function submitHandler(event) {
    event.preventDefault();
    if (edit) {
      const amount = amountRef.current.value;
      const desc = descRef.current.value;
      const category = categoryRef.current.value;

      const updatedDetails = {
        amount: amount,
        desc: desc,
        category: category,
      };

      fetch(
        `https://expense-tracker-be3e3-default-rtdb.firebaseio.com/${updatedEmail}/${id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(updatedDetails),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            console.log("Expense data edited successfully!");
            fetchItems();
            setEdit(false);
            setId(null);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });

      amountRef.current.value = "";
      descRef.current.value = "";
      categoryRef.current.value = "";
    } else {
      const amount = amountRef.current.value;
      const desc = descRef.current.value;
      const category = categoryRef.current.value;

      const newItem = {
        amount: amount,
        desc: desc,
        category: category,
      };

      // In Firebase Realtime Database, the .json appended to the URL path indicates the RESTful API endpoint for accessing and manipulating
      // JSON data in the database. When you include .json in the URL, it instructs Firebase to interpret the data as JSON format.

      fetch(
        `https://expense-tracker-be3e3-default-rtdb.firebaseio.com/${updatedEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify(newItem),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        //here we going to check weather the response is getting correctly or not
        .then((response) => {
          if (response.ok) {
            console.log("data have been saved successfully!");
          }
          fetchItems();
        })
        .catch((error) => {
          console.log("This error we are getting here:", error);
          alert(error);
        });

      amountRef.current.value = "";
      descRef.current.value = "";
      categoryRef.current.value = "";
    }
  }



  async function fetchItems() {
    // Fetching entered data from Firebase Realtime Database
    fetch(
      `https://expense-tracker-be3e3-default-rtdb.firebaseio.com/${updatedEmail}.json`
    )
      .then((response) => {
        if (response.ok) {
          console.log("data is getting nicely");
          return response.json();
        } else {
          throw new Error("Failed to fetch expenses data");
        }
      })
      .then((data) => {
        console.log(data + "we are getting data here guys");
        const FetchDetails = [];
        for (const key in data) {
          FetchDetails.push({
            id: key,
            amount: data[key].amount,
            desc: data[key].desc,
            category: data[key].category,
          });
        }
        setDetails(FetchDetails);
        console.log(FetchDetails[0].id + "here we are getting desc back");
      })
      .catch((error) => {
        console.log("Error occurred while fetching expenses data:", error);
      });
  }

  async function deleteExpense(id) {
    // when data is passing to that li id is also passing (just look upper code) so we are getting that id from there
    // just have to pass that id to delete function and we can achieve it
    fetch(
      `https://expense-tracker-be3e3-default-rtdb.firebaseio.com/${updatedEmail}/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Expense data deleted successfully!");
          fetchItems(); // Fetch the updated data after deleting an item
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  async function editExpense(id, descri, category, amount) {
    setId(id);
    setEdit(true);
    amountRef.current.value = amount;
    descRef.current.value = descri;
    categoryRef.current.value = category;
  }
   

  // function to download the file
  function downloadExpensesAsTxt () {
    const data = details.map((expense)=>{
      return `Amount :${expense.amount}   Description :${expense.desc}    Category :${expense.category}`
    })

    const text= data.join("\n");
    const blob= new Blob([text],{type : "text/plain"})
    const url= URL.createObjectURL(blob)

    const link=document.createElement("a")
    link.href=url;
    link.download="expenses.txt"
    link.click();

    URL.revokeObjectURL(url);
  }

  const sum = details.reduce(
    (total, expense) => total + parseInt(expense.amount),
    0
  );
  if(sum){
    dispatch(authActions.ispremium(sum))
  }

  const token = localStorage.getItem("token");
  console.log(token + " hi itejas token in oaimpage")
  
  useEffect(() => {
    fetchItems();
    //if we add fetchItems function in submit hadnler so the data will automatically get added to ui no need to do refresh
    dispatch(authActions.isLogin(token))
  }, []);
  
 
  

// const isDarkMode = useSelector(state=>state.auth.isDarkToggle)

  return (
    <div className={classes.div}>
    <h2>This is real Tracker</h2>
      <form onSubmit={submitHandler} className={classes.formm}>
        <label className={classes.labell}>Enter amount</label>
        <input type="number" ref={amountRef} className={classes.inputt}/>
        <br />
        <label className={classes.labell}>Enter description</label>
        <input ref={descRef}className={classes.inputt} />
        <br />
        <label className={classes.labell}>Select category</label>
        <select ref={categoryRef}>
          <option>Select Category</option>
          <option>Electronics</option>
          <option>Medicle</option>
          <option>Food</option>
        </select>
        <br />
        {edit ? <button className={classes.buttonn} >Update</button> : <button className={classes.buttonn} >Submit</button>}
        <span>Total amount:{sum}</span>
        <br/>
        <button onClick={downloadExpensesAsTxt} className={classes.buttonn}>DownLoad File</button>
      </form>

      <ul className={classes.ul}>
        {details.map((item, index) => (
          <li key={index}>
            Amount: {item.amount}, Description: {item.desc}, Category: {item.category}
            <button onClick={() => deleteExpense(item.id)} className={classes.buttonn}>delete</button>
            <button
              onClick={() =>
                editExpense(item.id, item.desc, item.category, item.amount)  
              }
              className={classes.buttonn}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default MainPage;

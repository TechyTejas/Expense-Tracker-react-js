import React, { useEffect, useRef, useState } from "react";

function MainPage() {
  const [details, setDetails] = useState([]);

  const amountRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();


  async function submitHandler(event) {
    event.preventDefault();
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
      "https://expense-tracker-be3e3-default-rtdb.firebaseio.com/Expense.json",
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
      })
      .catch((error) => {
        console.log("This error we are getting here:", error);
        alert(error);
      });

   
    amountRef.current.value = "";
    descRef.current.value = "";
    categoryRef.current.value = "";
  }

  async function fetchItems() {
    // Fetch expenses data from Firebase Realtime Database
    fetch(
      "https://expense-tracker-be3e3-default-rtdb.firebaseio.com/Expense.json"
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
        console.log(FetchDetails[0].desc + "here we are getting desc back");
      })
      .catch((error) => {
        console.log("Error occurred while fetching expenses data:", error);
      });
  }

  useEffect(() => {
    fetchItems();
    //if we add fetchItems function in submit hadnler so the data will automatically get added to ui no need to do refresh
  }, []);

  return (
    <div>
      <h2>This is real Tracker</h2>
      <form onSubmit={submitHandler}>
        <label>Enter amount</label>
        <input type="number" ref={amountRef} />
        <br />
        <label>Enter description</label>
        <input ref={descRef} />
        <br />
        <label>Select category</label>
        <select ref={categoryRef}>
          <option>Select Category</option>
          <option>Electronics</option>
          <option>Medicle</option>
          <option>Food</option>
        </select>
        <br />
        <button>Submit</button>
      </form>
      <ul>
        {details.map((item, index) => (
          <li key={index}>
            Amount: {item.amount}, Description: {item.desc}, Category:{" "}
            {item.category}
            <button>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainPage;

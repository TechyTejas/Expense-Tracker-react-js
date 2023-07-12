import React, { useRef, useState } from 'react'

function MainPage() {
  const amountRef = useRef()
  const descRef = useRef()
  const categoryRef = useRef()
  const [listItems, setListItems] = useState([])

  const submitHandler = (event) => {
    event.preventDefault()
    const amount = amountRef.current.value
    const desc = descRef.current.value
    const category = categoryRef.current.value

    const li = `${amount}    ${desc}    ${category}`

    setListItems([...listItems, li])
  }

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
          <option>SkinCare</option>
          <option>Food</option>
        </select>
        <br />
        <button>Submit</button>
      </form>
      <ul>
        {listItems.map((li, index) => (
          <li key={index}>{li}</li>
        ))}
      </ul>
    </div>
  )
}

export default MainPage

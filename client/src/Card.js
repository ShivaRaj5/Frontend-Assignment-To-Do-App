import React, { useEffect, useState } from 'react'
import Check from './check.png'
const Card = (props) => {




  const [complete, setComplete] = useState(true);
  const { title, setTitle, id, setToggle, toggle,editval } = props;
  const toggleBtn = async () => {
    try {
      setToggle(false);

      const editData = await fetch(`http://localhost:5000/todos/${props.id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      })
      const jsonData = await editData.json();
      console.log(jsonData.title)
      setTitle(jsonData.title);
    } catch (err) {
      alert(err);
    }
    setComplete(false)
  }

  const updateData = async (e) => {
    e.preventDefault();

    try {
      const editData = await fetch(`http://localhost:5000/todos/${props.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ title:editval })
      })
      if (editData)
        alert("Data has been updated successfully. Please refresh the page to see the changes!")
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => { setTitle(editval);
  console.log(editval) },[editval])

  const toggleBtnone = () => {
    setComplete(true);
  }

  const deleteCard = async () => {
    try {
      const deletedData = await fetch(`http://localhost:5000/todos/${props.id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      if (deletedData)
        alert("Data has been deleted. Please refresh the page to see the changes!");
      else
        alert("Data has not been deleted!")
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>{complete ?
      <div className="card">
        <h2>{props.title}</h2>
        <div style={{ height: '1px', backgroundColor: '#5C5C5C', margin: '20px 0px' }}></div>
        <div className="btnContainer">


          {complete ? <button onClick={toggleBtn} style={{ backgroundColor: '#C620A7', border: 'none', outline: 'none', padding: '10px 30px', borderRadius: '5px', color: 'white' }}>Mark as completed</button> :
            <button onClick={toggleBtnone} style={{ border: 'none', outline: 'none', color: 'white', backgroundColor: '#2F2F2F' }}>Mark as incomplete</button>}
          <button onClick={deleteCard} style={{ border: 'none', outline: 'none', color: 'white', backgroundColor: '#2F2F2F' }}>Delete</button>
        </div>
      </div>
      :
      <div className="card extraCard">
        <div className="headImg">
          <h2>{props.title}</h2>
          <img src={Check} alt="logo" />
        </div>
        <div style={{ height: '1px', backgroundColor: '#5C5C5C', margin: '20px 0px' }}></div>
        <div className="btnContainer">
          {complete ? <button onClick={toggleBtn} style={{ backgroundColor: '#C620A7', border: 'none', outline: 'none', padding: '10px 30px', borderRadius: '5px', color: 'white' }}>Mark as completed</button> :
            <button onClick={toggleBtnone} style={{ border: 'none', outline: 'none', color: 'white', backgroundColor: '#2F2F2F' }}>Mark as incomplete</button>}
          <button onClick={deleteCard} style={{ border: 'none', outline: 'none', color: 'white', backgroundColor: '#2F2F2F' }} >Delete</button>
        </div>
      </div>}


{(!toggle && !complete)? <button style={{ position:'absolute' ,top:'185px',left:'1000px',border: 'none', outline: 'none', color: 'white', backgroundColor: '#C620A7',padding:'13px 20px',borderRadius:'5px',cursor:'pointer'}} onClick={updateData}  >Update</button>:null}
      
    </>
  )
}

export default Card;
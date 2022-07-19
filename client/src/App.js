import React, { useEffect, useState } from 'react'
import Card from './Card'
import './index.css'
const App = (props) => {
  const [title,setTitle]=useState("");
  const [cardData,setCardData]=useState([]);
  const [toggle,setToggle]=useState(true);
  

  const submitData = async (e) => {
    e.preventDefault();
    try {
      if (!title)
        return alert("Please fill the title!")
      const postData = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title })
      })
      if (postData) {
        alert("Data has been saved. Please refresh the page to see the changes!");
      }
      else
        alert("Data has not been saved");
    } catch (err) {
      console.log(err);
    }
  }
  
  const getData=async ()=>{
      const fetchData=await fetch("http://localhost:5000/todos",{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
        },
      })
      const jsonData=await fetchData.json();
      // console.log(jsonData)
      setCardData(jsonData);
  }
  useEffect(()=>{
    getData();
  },[])
  
  // const updateData=async (e,id)=>{
  //   e.preventDefault();
  //   try{
  //     const editData=await fetch(`http://localhost:5000/todos/${props.id}`,{
  //       method:'PATCH',
  //       headers:{
  //         "Content-Type":"application/json",
  //         "Accept":"application/json"
  //       },
  //       body:JSON.stringify(title)
  //     })
  //     if(editData)
  //       alert("Data has been updated successfully")
  //   }catch(err){
  //     console.log(err);
  //   }
  // }
  
  return (
    <>
      <div className="todoContainer">
        <h1 style={{textAlign:'center',marginTop:'20px'}}>To-Do List</h1>
        <div className="todoContent">
          <div className="addCard">
            <h2>Add a new task in the list</h2>
            <form method='POST'>
              <input type="text" name='title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
              {toggle  ? <button onClick={submitData}>Submit</button> :null}
            </form>
          </div>
        </div>
      </div>
      <div className="addCardContainer">
        <h2>Added task in to-do list</h2>
        <ol style={{color:'white'}}>
        <div className="cardContainer">
          {cardData.map((ele,idx,arr)=>{
            return (
              <li key={ele._id}><Card title={ele.title} editval = {title}id={ele._id} setTitle={setTitle} setToggle={setToggle} toggle={toggle} /></li>
            )
          })}
        </div>
        </ol>
      </div>
    </>
  )
}

export default App
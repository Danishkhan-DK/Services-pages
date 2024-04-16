 import React from 'react'
import { useState } from 'react';
import { BiSolidDollarCircle, BiSolidTimeFive } from "react-icons/bi";
import { FaUser } from 'react-icons/fa6';
import { RiCalendar2Fill } from "react-icons/ri";

const Cooking = () => {
  const [userData, setUserData] = useState({
    cooking_dishes:"",
    cooking_date: "",
    cooking_time: "",
    cooking_amount: "",
  });

  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUserData({ ...userData, [name]: value});  
  }

  //connect with firebase
  const submitData = async (event) => {
    event.preventDefault();
    const { cooking_dishes, cooking_date, cooking_time,cooking_amount }  = userData;

    if ( cooking_dishes && cooking_date && cooking_time && cooking_amount){
    const res = await fetch(
      "https://homeapp-hana-default-rtdb.firebaseio.com/userDataRecords.json",
      {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        cooking_dishes,
        cooking_date,
        cooking_time,
        cooking_amount
      }),
    }
      );

    if (res){
      setUserData({
        cooking_dishes:"",
        cooking_date: "",
        cooking_time: "",
        cooking_amount: "",
      });
      alert("Data Stored");
    }else{
      alert("Please fill the data");
    }
  }else{
    alert("Please fill the data");
  }
  };

  return (
    <div className="border-box">
      <form action="">
        <h1 class="form-title"> Cooking </h1>

        <div class='organization-text' id='dishes'>
            <div class="form-input-group">
          <span><FaUser style={{color: "#8692f7",}}  size="15"/></span>
                <input type="text" class="form-input" placeholder="Type of Dishes"
                name= "cooking_dishes"
                id=""
                 value={userData.cooking_dishes}
                 onChange={postUserData}
                />  
            </div>
        </div>


        <div className="sign-email" id='date'>
          <div class="form-input-group">
            <span>
              <RiCalendar2Fill style={{ color: "#8692f7" }} size="16" />
              <span className="Time-title">Date</span>
            </span>
            <input
              type="date"
              name= "cooking_date"
              id=""
              class="form-input-time"
              placeholder="Date"
              value={userData.cooking_date}
              onChange={postUserData}
            />
          </div>
        </div>

        <div class="sign-email" id='time'>
          <div class="form-input-group">
            <span className="Time-icon">
              <BiSolidTimeFive style={{ color: "#8692f7" }} size="16"/>
              <span className="Time-title">Time</span>
            </span>
              <input type="time" class="form-input-time" placeholder="Time"
              name= "cooking_time"
              id=""
               value={userData.cooking_time}
               onChange={postUserData}
              />  
          </div>
        </div>

        <div class="sign-email" id='Amount'>
          <div class="form-input-group">
            <span>
            <BiSolidDollarCircle style={{ color: "#8692f7" }} size="16" />
            </span>
            <input
              type="number"
              class="form-input"
              autofocus
              placeholder="Amount"
              name= "cooking_amount"
              id=""
              value={userData.cooking_amount}
              onChange={postUserData}
            />
          </div>
        </div>

        <div className="btn-div">
          <button type='submit' onClick={submitData} class="form-button"> CONFIRMATION </button>
        </div>

      </form>
    </div>
  )
}

export default Cooking

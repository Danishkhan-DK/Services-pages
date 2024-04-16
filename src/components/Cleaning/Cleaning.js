import React, { useState } from "react";
import './Cleaning.css'
import { BiSolidDollarCircle, BiSolidTimeFive } from "react-icons/bi";
import { RiCalendar2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


const Cleaning = () => {
  const [userData, setUserData] = useState({
    cleaning_date: "",
    cleaning_time: "",
    cleaning_amount: "",
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
    const { cleaning_date, cleaning_time, cleaning_amount }  = userData;

    if ( cleaning_date && cleaning_time && cleaning_amount){
    const res = await fetch(
      "https://homeapp-hana-default-rtdb.firebaseio.com/userDataRecords.json",
      {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        cleaning_date,
        cleaning_time,
        cleaning_amount
      }),
    }
      );

    if (res){
      setUserData({
        cleaning_date: "",
        cleaning_time: "",
        cleaning_amount: "",
      });
      alert("Data Stored");
    }else{
      alert("Please fill the data");
    }
  }else{
    alert("Please fill the data");
  }
  };

  const navigate = useNavigate()
  
  return (
    <div className="border-box">
      <form method="POST">
        <h1 class="form-title"> Cleaning </h1>

        <div className="sign-name" id='date'>
          <div class="form-input-group">
            <span>
              <RiCalendar2Fill style={{ color: "#8692f7" }} size="16" />
              <span className="Time-title">Date</span>
            </span>
            <input
              type="date"
              name= "cleaning_date" //2024-02-04
              id=""
              class="form-input-time"
              placeholder="Date"
              value={userData.cleaning_date}
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
              <input type="time" 
              name= "cleaning_time"
              id=""
              class="form-input-time"
              placeholder="Time"
              value={userData.cleaning_time}
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
              name= "cleaning_amount"
              id=""
              class="form-input"
              autofocus
              placeholder="Amount"
              value={userData.cleaning_amount}
              onChange={postUserData}
            />
          </div>
        </div>

        <div className="place-text">
        <input type="checkbox"/> <label onClick={() => navigate('/location')}>Place</label>
        </div>

        <div className="btn-div">
          <button type="submit" class="form-button" onClick={submitData}> CONFIRMATION </button>
        </div> 

      </form>
    </div>
  );
};

export default Cleaning;

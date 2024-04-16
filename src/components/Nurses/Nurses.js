import React from 'react'
import { useState } from 'react';
import { BiSolidDollarCircle, BiSolidTimeFive } from "react-icons/bi";
import { FaUser } from 'react-icons/fa6';


const Nurses = () => {
  const [userData, setUserData] = useState({
    nurses_treatment:"",
    nurses_time:"",
    nurses_amount:"",
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
    const { nurses_treatment, nurses_time, nurses_amount }  = userData;

    if ( nurses_treatment && nurses_time && nurses_amount){
    const res = await fetch(
      "https://homeapp-hana-default-rtdb.firebaseio.com/userDataRecords.json",
      {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        nurses_treatment,
        nurses_time,
        nurses_amount
      }),
    }
      );

    if (res){
      setUserData({
        nurses_treatment:"",
        nurses_time:"",
        nurses_amount:"",
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
        <h1 class="form-title"> Nurses </h1>

        <div class='organization-text' id='treatment'>
            <div class="form-input-group">
          <span><FaUser style={{color: "#8692f7",}}  size="15"/></span>
                <input type="text" class="form-input" placeholder="Type of Treatment"
                name= "nurses_treatment"
                id=""
                 value={userData.nurses_treatment}
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
              name= "nurses_time"
              id=""
               value={userData.nurses_time}
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
              name= "nurses_amount"
              id=""
               value={userData.nurses_amount}
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

export default Nurses

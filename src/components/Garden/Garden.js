import React from 'react'
import './Garden.css'
import { BiSolidDollarCircle, BiSolidTimeFive } from "react-icons/bi";
import { FaUser } from 'react-icons/fa6';
import { RiCalendar2Fill } from "react-icons/ri";
import { useState } from 'react';

const Garden = () => {
  const [userData, setUserData] = useState({
    organization_type:"",
    home_garden_organizers_date:"",
    home_garden_organizers_time:"",
    home_garden_organizers_amount:"",
    venue:"",
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
    const { organization_type, home_garden_organizers_date, home_garden_organizers_time, home_garden_organizers_amount, venue}  = userData;

    if ( organization_type && home_garden_organizers_date && home_garden_organizers_time && home_garden_organizers_amount && venue){
    const res = await fetch(
      "https://homeapp-hana-default-rtdb.firebaseio.com/userDataRecords.json",
      {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        organization_type,
    home_garden_organizers_date,
    home_garden_organizers_time,
    home_garden_organizers_amount,
    venue
      }),
    }
      );

    if (res){
      setUserData({
        organization_type:"",
        home_garden_organizers_date:"",
        home_garden_organizers_time:"",
        home_garden_organizers_amount:"",
        venue:"",
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
        <h1 class="form-title"> Home Garden Organizers </h1>

        <div class='organization-text'>
            <div class="form-input-group">
          <span><FaUser style={{color: "#8692f7",}}  size="15"/></span>
                <input type="text" class="form-input" placeholder="Organization Type"
                 name= "organization_type"
                 id=""
                  value={userData.organization_type}
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
              name= "home_garden_organizers_date"
              id=""
              class="form-input-time"
              placeholder="Date"
              value={userData.home_garden_organizers_date}
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
               name= "home_garden_organizers_time"
               id=""
                value={userData.home_garden_organizers_time}
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
              name= "home_garden_organizers_amount"
              id=""
               value={userData.home_garden_organizers_amount}
               onChange={postUserData}
            />
          </div>
        </div>

        <div className="place-text">
        <input type="checkbox"
         name= "venue"
         id=""
         onChange={postUserData}
        /> <label className='checkbox-name'>Venue</label>
        </div>

        <div className="btn-div">
          <button type='submit' onClick={submitData} class="form-button"> CONFIRMATION </button>
        </div>

      </form>
    </div>
  )
}

export default Garden

import React from 'react'
import { useState } from 'react';
import { BiSolidDollarCircle, BiSolidTimeFive } from "react-icons/bi";
import { FaUser } from 'react-icons/fa6';
import { RiCalendar2Fill } from "react-icons/ri";

const Party = () => {
  const [userData, setUserData] = useState({
    organization_type:"",
    party_staff_date:"",
    party_staff_time:"",
    party_staff_amount:"",
    determine_the_type_of_organization:"",
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
    const { organization_type, party_staff_date, party_staff_time, party_staff_amount, determine_the_type_of_organization, venue  }  = userData;

    if ( organization_type && party_staff_date && party_staff_time && party_staff_amount && determine_the_type_of_organization && venue){
    const res = await fetch(
      "https://homeapp-hana-default-rtdb.firebaseio.com/userDataRecords.json",
      {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        organization_type,
    party_staff_date,
    party_staff_time,
    party_staff_amount,
    determine_the_type_of_organization,
    venue
      }),
    }
      );

    if (res){
      setUserData({
        organization_type:"",
    party_staff_date:"",
    party_staff_time:"",
    party_staff_amount:"",
    determine_the_type_of_organization:"",
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
        <h1 class="form-title"> Party Staff </h1>

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
              name= "party_staff_date"
              id=""
              class="form-input-time"
              placeholder="Date"
              value={userData.party_staff_date}
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
              name= "party_staff_time"
              id=""
               value={userData.party_staff_time}
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
              name= "party_staff_amount"
                 id=""
                  value={userData.party_staff_amount}
                  onChange={postUserData}
            />
          </div>
        </div>

        <div className="place-text">
        <input type="checkbox"
        name= "determine_the_type_of_organization"
        id=""
         onChange={postUserData}
        /> <label className='checkbox-name'>Determine the type of organization</label>
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

export default Party

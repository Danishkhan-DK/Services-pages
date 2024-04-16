import React from 'react'
import { useState } from 'react';
import { BiSolidDollarCircle } from 'react-icons/bi'

const Teachers = () => {
  const [userData, setUserData] = useState({
    materials:"",
    duration_of_education:"",
    choose_the_type_of_teachers:"",
    teachers_amount:"",
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
    const { materials, duration_of_education, choose_the_type_of_teachers, teachers_amount }  = userData;

    if ( materials || duration_of_education || choose_the_type_of_teachers || teachers_amount ){
    const res = await fetch(
      "https://homeapp-hana-default-rtdb.firebaseio.com/userDataRecords.json",
      {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        materials,
        duration_of_education,
        choose_the_type_of_teachers,
        teachers_amount
      }),
    }
      );

    if (res){
      setUserData({
        materials:"",
        duration_of_education:"",
        choose_the_type_of_teachers:"",
        teachers_amount:"",
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
        <h1 class="form-title"> Teachers </h1>

        <div className="place-text">
        <input type="checkbox"
        name= "materials"
        id=""
        //  value={userData.materials} 
         onChange={postUserData}
        /> <label>Materials</label>
        </div>

        <div className="place-text">
        <input type="checkbox" 
        name= "duration_of_education"
        id=""
        //  value={userData.duration_of_education}
         onChange={postUserData}
        /> <label>Duration of Education</label>
        </div>

        <div className="place-text">
        <input type="checkbox"
        name= "choose_the_type_of_teachers"
        id=""
        //  value={userData.choose_the_type_of_teachers}
         onChange={postUserData}
        /> <label>Choose the Type of Teachers</label>
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
              required
              name= "teachers_amount"
              id=""
               value={userData.teachers_amount}
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

export default Teachers

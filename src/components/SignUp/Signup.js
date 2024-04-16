import React from 'react';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import { IoMdLock } from 'react-icons/io';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate(); // Move useNavigate here

  const [userData, setUserData] = useState({
    signup_name: '',
    signup_email: '',
    signup_password: '',
  });

  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };

  // connect with firebase
  const submitData = async (event) => {
    event.preventDefault();
    const { signup_name, signup_email, signup_password } = userData;

    if (signup_name && signup_email && signup_password) {
      const res = await fetch(
        "https://homeapp-hana-default-rtdb.firebaseio.com/userDataRecords.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            signup_name,
            signup_email,
          }),
        }
      );

      if (res.ok) {
        setUserData({
          signup_name: '',
          signup_email: '',
          signup_password: '',
        });
        alert("Data Stored");
        // Only navigate to '/customer' after successful data storage
        handleClick();
      } else {
        alert("Error storing data. Please try again.");
      }
    } else {
      alert("Please fill the data");
    }
  };

  const handleClick = () => {
    navigate('/customer');
  };

  return (
    <div className='border-box'>
      <form action=''>
        <h1 className='form-title'> Sign Up </h1>

        <div className='sign-name'>
          <div className='form-input-group'>
            <span><FaUser style={{ color: "#8692f7" }} size="15" /></span>
            <input type="name" className='form-input' placeholder='Name'
              name="signup_name"
              id=""
              value={userData.signup_name}
              onChange={postUserData}
            />
          </div>
        </div>

        <div className='sign-email'>
          <div className='form-input-group'>
            <span><FaUser style={{ color: "#8692f7" }} size="15" /></span>
            <input type="email" className='form-input' placeholder='Email'
              name="signup_email"
              id=""
              value={userData.signup_email}
              onChange={postUserData}
            />
          </div>
        </div>

        <div className='password'>
          <div className='form-input-group'>
            <span><IoMdLock style={{ color: "#8692f7" }} /></span>
            <input type="password" className='form-input' autoFocus placeholder='Password'
              name="signup_password"
              id=""
              value={userData.signup_password}
              onChange={postUserData}
            />
          </div>
        </div>
        <div className='btn-div'>
          <button className='form-button' type='submit' onClick={async (event) => { await submitData(event); }}> SIGN UP </button>
        </div>

        <p className='form-text' id='form-link' onClick={() => navigate(-1)}>Already a user? Login </p>

      </form>
    </div>
  );
};

export default Signup;

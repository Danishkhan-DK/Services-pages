import { IoMdLock } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  // const [userData, setUserData] = useState({
  //   logged_in: "",
  //   password: "",
  // });

  // let name, value;
  // const postUserData = (event) => {
  //   name = event.target.name;
  //   value = event.target.value;

  //   setUserData({ ...userData, [name]: value });
  // };

  // connect with firebase
  // const submitData = async (event) => {
  //   event.preventDefault();
  //   const { logged_in, password } = userData;

  //   if (logged_in && password === 'test123') {
  //     const res = await fetch(
  //       "https://homeapp-hana-default-rtdb.firebaseio.com/userDataRecords.json",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           logged_in,
  //         }),
  //       }
  //     );

  //     if (res.ok) {
  //       setUserData({
  //         logged_in: "",
  //         password: "",
  //       });
  //       alert("Data Stored");
  //       // Only navigate to '/customer' after successful data storage
  //       handleClick();
  //     } else {
  //       alert("Error storing data. Please try again.");
  //     }
  //   } else {
  //     // Password does not match, show link for password recovery
  //     alert("Click below. Forgot Password?");
  //   }
  // };

  const handleClick = () => {
    navigate('/customer');
  };

  const navigate = useNavigate();

  return (
    <div className="border-box">
      <form action="">
        <h1 className="form-title"> Login </h1>

        <div className="email">
          <div className="form-input-group">
            <span>
              <FaUser style={{ color: "#8692f7" }} size="15" />
            </span>
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              name="logged_in"
              id=""
              // value={userData.logged_in}
              // onChange={postUserData}
            />
          </div>
        </div>

        <div className="password">
          <div className="form-input-group">
            <span>
              <IoMdLock style={{ color: "#8692f7" }} size="16" />
            </span>
            <input
              type="password"
              className="form-input"
              autoFocus
              placeholder="Password"
              name="password"
              id=""
              // value={userData.password}
              // onChange={postUserData}
            />
          </div>
        </div>
        <div className="btn-div">
          <button
            // type="submit"
            // onClick={async (event) => {
            //   await submitData(event);
            // }}
            className="form-button" onClick={() => navigate('/dashboard')}
          >
            LOGIN
          </button>
        </div>

        {/* {!userData.password || userData.password !== 'test123' ? ( */}
          <p className="forgot-password-link" onClick={() => navigate('/forgot')}>
            Forgot Password?
          </p>
        {/* ) : null} */}

        <p className="form-text" onClick={() => navigate('/signup')}>
          Not yet registered? Sign Up
        </p>
      </form>
    </div>
  );
};

export default Login;

import React from "react";
import "./ForgotPWD.css";
import { useNavigate } from "react-router-dom";

const ForgotPWD = () => {
  const navigate = useNavigate();
  const resetPWD = () => {
    console.log("RESET");
    navigate("/influx");
  };
  return (
    <div className="body-sign-in">
      <div className="back-arrow">
        <a href="http://localhost:3000/admin/login">
          <i className="arrow left"></i>
        </a>
      </div>
      <div className="container-sign-in" id="container">
        <div className="form-container-2 sign-up-2">
          <form>
            <h1>Reset Password</h1>
            <span>Please enter your email to get a reset link</span>
            <input type="email" placeholder="Email" />
            <a href="/admin/login">Go Back to Log In</a>
            <button onClick={resetPWD}>Submit</button>
          </form>
        </div>
        <div className="border-container">
          <div className="border">
            <div className="border-panel">
              <div className="text">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPWD;

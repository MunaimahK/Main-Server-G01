import React, { useState } from "react";
import "./AdminSignAndRegister.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminSignAndRegister = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false); // Default to 'Sign In' form
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  // Handle Sign In form submission
  const loginUser = async (e) => {
    e.preventDefault();
    const { username, password } = data;
    try {
      const { data } = await axios.post("/login", { username, password });
      if (data.error) {
        console.log("User does not exist");
      } else {
        console.log("Login successful");
        // Redirect to Admin Dashboard after successful login
        navigate("/admin", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Handle Sign Up form submission
  const registerUser = async (e) => {
    e.preventDefault();
    // Add your logic for registering the user here
    console.log("Sign Up logic goes here");
  };

  return (
    <div className="body-sign-in">
      <div className="back-arrow">
        <a href="http://localhost:3000/dashboard">
          <i className="arrow left"></i>
        </a>
      </div>

      <div className={`container-sign-in ${isSignUp ? "active" : ""}`} id="container">
        {/* Sign Up Form */}
        {isSignUp ? (
          <div className="form-container sign-up">
            <form onSubmit={registerUser}>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign Up</button>
            </form>
          </div>
        ) : (
          // Sign In Form
          <div className="form-container sign-in">
            <form onSubmit={loginUser}>
              <h1>Sign In</h1>
              <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <a href="/forget/password">Forgot Your Password?</a>
              <button type="submit">Sign In</button>
            </form>
          </div>
        )}

        {/* Toggle Button */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              {/* Only show this if it's currently the Sign In form */}
              {!isSignUp && (
                <button onClick={() => setIsSignUp(true)} id="register">
                  Sign Up
                </button>
              )}
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hey, Welcome Back!</h1>
              <p>Please login to access the Influx Admin Page</p>
              {/* Only show this if it's currently the Sign Up form */}
              {isSignUp && (
                <button onClick={() => setIsSignUp(false)} className="register" id="login">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignAndRegister;

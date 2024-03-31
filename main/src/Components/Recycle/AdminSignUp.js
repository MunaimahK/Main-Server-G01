import React, { useEffect } from "react";
import { useState } from "react";
import "./AdminSignUp.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminSignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { email, username, password } = data;
    try {
      const { data } = await axios.post(
        "/admin/register",
        {
          email,
          username,
          password,
        },
        true
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Login Succesful. Welcome!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    /*
    <div className="">
      <div className="register">
        <form className="form1" onSubmit={registerUser}>
          <label className="email">Email</label>
          <input
            type="text"
            placeholder="Email Address"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          ></input>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          ></input>
          <label>Password</label>
          <input
            type="text"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          ></input>
          <button type="submit">Register!</button>
        </form>
      </div>
    </div>*/
    <body id="sign-up">
      <div class="wrapper">
        <div class="register_box">
          <div class="register_header">
            <span>Sign-Up</span>
          </div>
          <div class="input_box">
            <input type="email" id="email" class="input_field" required />
            <label for="user" class="label">
              Email
            </label>
            <i class="bx bx-lock-alt icon"></i>
          </div>
          <div class="input_box">
            <input type="text" id="user" class="input_field" required />
            <label for="user" class="label">
              Username
            </label>
            <i class="bx bx-user"></i>
          </div>
          <div class="input_box">
            <input type="password" id="pass" class="input_field" required />
            <label for="user" class="label">
              Password
            </label>
            <i class="bx bx-lock-alt icon"></i>
          </div>
          <div class="remember-forget">
            <div class="remember">
              <input type="checkbox" id="remember" />
              <label for="remember">Remember Me</label>
            </div>
          </div>
          <div class="input_box">
            <input type="submit" class="input_submit" value="Submit" />
          </div>
          <div class="register">
            <span>
              Already have an account?{" "}
              <a href="http://localhost:3000/admin/login">Log In!</a>
            </span>
          </div>
        </div>
      </div>
    </body>
  );
};

export default AdminSignUp;

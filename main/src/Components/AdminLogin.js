import React from "react";
import { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const loginUser = (e) => {
    e.preventDefault();
    axios.get("/");
  };
  return (
    <body id="log-in">
      <div class="wrapper">
        <div class="login_box">
          <div class="login_header">
            <span>Login</span>
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
            <input type="submit" class="input_submit" value="Login" />
          </div>
          <div class="register">
            <span>
              New Admin?{" "}
              <a href="http://localhost:3000/admin/signup">Register Now!</a>
            </span>
          </div>
        </div>
      </div>
    </body>
  ); /*
    <div class="container">
      <form onSubmit={loginUser}>
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
        <button type="submit">Login!</button>
      </form>
    </div>*/
};

export default AdminLogin;

import React from "react";
import { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const loginUser = async (e) => {
    axios.defaults.withCredentials = true;
    e.preventDefault();

    const { username, password } = data;
    try {
      console.log(username, password);
      const { data } = await axios
        .post("/login", {
          username,
          password,
        })
        .then((res) => {
          if (res.data.error) {
            toast.error(data.error);
            console.log("User does not exist");
          } else {
            console.log("No error");
            toast.success("Welcome!");
            navigate("/admin", { replace: true });
          }
        });

      /*if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        console.log("Success!");
        toast.success("Welcome!");
        navigate("/admin", { replace: true });
      }*/
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div class="wrapper">
      <form onSubmit={loginUser} className="form-div">
        <div class="wrapper">
          <div class="login_box">
            <div class="login_header">
              <span>Login</span>
            </div>
            <div class="input_box">
              <input
                type="text"
                id="user"
                class="input_field"
                required
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
              <label for="user" class="label">
                Username
              </label>
              <i class="bx bx-user"></i>
            </div>
            <div class="input_box">
              <input
                type="password"
                id="pass"
                class="input_field"
                required
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
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
            <div class="register">
              <span>
                <a href="http://localhost:3000/">Head Back to Influx</a>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
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

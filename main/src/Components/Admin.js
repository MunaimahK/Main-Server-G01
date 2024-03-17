import React from "react";
import { useState } from "react";
import axios from "axios";
import "./Admin.css";
import { useContext } from "react";
import { UserContext } from "./context/userContext";
import { useNavigate } from "react-router-dom";

const page = async () => {
  const { data } = await axios.get("http://localhost:3001/assign", true);
};
const Admin = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const resetPWD = async (e) => {
    e.preventDefault();
    navigate("/resetPWD");
  };

  const promoteAdmin = async (e) => {
    e.preventDefault();
    navigate("/member/promote/admin");
  };

  const logOut = async (e) => {
    axios.defaults.withCredentials = true;
    e.preventDefault();
    try {
      await axios.get("/logout", {}, { withCredentials: true }).then((res) => {
        console.log(res);
        navigate("/admin/login");
      });
    } catch (err) {
      console.log(err);
    }
    // navigate("/admin/login");
  };
  return (
    <div className="wrapper">
      <div className="admin-pg">
        <div className="welcome">{!!user && <h1>Hi {user.username}!</h1>}</div>
        <div className="features">
          <br></br>
          <ul>
            <button class="button-17" onClick={resetPWD}>
              Reset Password
            </button>
            <br></br>
            <button class="button-17" onClick={promoteAdmin}>
              Promote User to Admin
            </button>
            <br></br>
            <button class="button-17" onClick={logOut}>
              Log Out
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;

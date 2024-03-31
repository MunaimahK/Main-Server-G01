import React from "react";
import AdminNavR from "./AdminNavR";
import Sidebar from "./Sidebar";
import "./AddClubR.css";
import Header from "./Header";
import axios from "axios";
import { useState } from "react";

const PromoteAdmin = () => {
  const [data, setData] = useState({
    UID: "",
    name: "",
    email: "",
  });
  const promote = (e) => {
    console.log("PROMOTE FUNCTION");
    axios.defaults.withCredentials = true;
    e.preventDefault();
    const { UID, name, email } = data;
    console.log(UID, name, email);
  };
  return (
    <main className="grid-container-add">
      <Sidebar />
      <Header />
      <div className="form-container-add-club-container"></div>
      <div className="form-container-add-club">
        <form className="add-club" type="submit" onSubmit={promote}>
          <div>
            <h4>Promote a User to Admin Status</h4>
            <br></br>
            <p>
              Please enter the user information so Influx can quickly extend
              admin status.
            </p>
            <br></br>
          </div>

          <div>
            <input
              type="text"
              placeholder="Club Name"
              value={data.UID || ""}
              onChange={(e) => setData({ ...data, UID: e.target.value })}
            />
            <input
              placeholder="Club URL"
              value={data.name || ""}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <input
              placeholder="Codebase URL"
              value={data.email || ""}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <button onSubmit={promote} className="btn-add">
              Promote!
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default PromoteAdmin;

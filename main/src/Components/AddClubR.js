import React from "react";
import AdminNavR from "./AdminNavR";
import Sidebar from "./InfluxAdmin/Sidebar";
import "./AddClubR.css";
import Header from "./InfluxAdmin/Header";
import axios from "axios";
import { useState } from "react";
const AddClubR = () => {
  console.log("Add Club");
  const [data, setData] = useState({
    name: "",
    frontend: "",
    backend: "",
    logo: "",
    text: "",
  });

  const addClub = async (e, req, res) => {
    axios.defaults.withCredentials = true;
    e.preventDefault();
    const { name, frontend, backend, logo, text } = data;
    try {
      const { data } = await axios
        .post(
          "http://localhost:3001/add-new-club",
          {
            name,
            frontend,
            backend,
            logo,
            text,
          },
          true
        )
        .then((res) => {
          if (res.data.test) {
            // console.log("Already added");
            // setOpen(false);
            console.log(res);
          }
        });
      if (data.error) {
        // toast.error(data.error);
      } else {
        setData({});
        // toast.success("Registration Succesful. Welcome!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="grid-container-add">
      <Sidebar />
      <Header />
      <div className="form-container-add-club-container"></div>
      <div className="form-container-add-club">
        <form className="add-club" type="submit" onSubmit={addClub}>
          <div>
            <h4>Register A New Club</h4>
            <br></br>
            <p>
              Please enter some information so Influx can easily connect the new
              club.
            </p>
            <br></br>
          </div>

          <div>
            <input
              type="text"
              placeholder="Club Name"
              value={data.name || ""}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <input
              placeholder="Club URL"
              value={data.frontend || ""}
              onChange={(e) => setData({ ...data, frontend: e.target.value })}
            />
            <input
              placeholder="Codebase URL"
              value={data.backend || ""}
              onChange={(e) => setData({ ...data, backend: e.target.value })}
            />
            <input
              placeholder="Logo URL"
              value={data.logo || ""}
              onChange={(e) => setData({ ...data, logo: e.target.value })}
            />
            <input
              type="text"
              placeholder="Club Slogan"
              value={data.text || ""}
              onChange={(e) => setData({ ...data, text: e.target.value })}
            />
            <button onSubmit={addClub} className="btn-add">
              Register!
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddClubR;

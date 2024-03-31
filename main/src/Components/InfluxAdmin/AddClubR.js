import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./AddClubR.css";

const AddClubR = () => {
  const [data, setData] = useState({
    name: "",
    frontend: "",
    backend: "",
    logo: "",
    text: "",
  });

  const addClub = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/add-new-club",
        {
          ...data,
        },
        { withCredentials: true }
      );
      if (response.data.test) {
        console.log(response);
      } else {
        setData({
          name: "",
          frontend: "",
          backend: "",
          logo: "",
          text: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <main className="grid-container-add">
      <Sidebar />
      <Header />
      <div className="form-container-add-club-container"></div>
      <div className="form-container-add-club">
        <form className="add-club">
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
              name="name"
              placeholder="Club Name"
              value={data.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="frontend"
              placeholder="Club URL"
              value={data.frontend}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="backend"
              placeholder="Codebase URL"
              value={data.backend}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="logo"
              placeholder="Logo URL"
              value={data.logo}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="text"
              placeholder="Club Slogan"
              value={data.text}
              onChange={handleInputChange}
            />
            <button className="btn-add" onClick={addClub}>
              Register!
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddClubR;

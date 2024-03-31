import React, { useState } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import AdminNav from "./AdminNav";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import "./AddClub.css";

const AddClub = () => {
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
            console.log(res.data.test);
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
  const { user } = useContext(UserContext);
  return (
    <div>
      <AdminNav />
      <div className="wrapper">
        <div className="admin-pg">
          <div className="welcome">
            <div className="container">
              <div className="vertical-center">
                {!!user && <h1>Add a new Club</h1>}
              </div>
            </div>
            <form onSubmit={addClub}>
              <div className="e1">
                <label id="l">Club Name</label>
                <br></br>
                <input
                  id="n"
                  type="text"
                  placeholder="Club name"
                  value={data.name || ""}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                ></input>
              </div>
              <div className="e1">
                <label id="l">Frontend</label>
                <br></br>
                <input
                  id="n"
                  type="text"
                  placeholder="Frontend URL"
                  value={data.frontend || ""}
                  onChange={(e) =>
                    setData({ ...data, frontend: e.target.value })
                  }
                ></input>
              </div>
              <div className="e1">
                <label id="l">Backend</label>
                <br></br>
                <input
                  id="n"
                  type="text"
                  placeholder="Baceknd URL"
                  value={data.backend || ""}
                  onChange={(e) =>
                    setData({ ...data, backend: e.target.value })
                  }
                ></input>
              </div>

              <div className="e1">
                <label id="l">Logo</label>
                <br></br>
                <input
                  id="n"
                  type="text"
                  placeholder="Image URL"
                  value={data.logo || ""}
                  onChange={(e) => setData({ ...data, logo: e.target.value })}
                ></input>
              </div>

              <div className="e1">
                <label id="l">Display Text</label>
                <br></br>
                <input
                  id="n"
                  type="text"
                  placeholder="Club slogan / invite / display text"
                  value={data.text || ""}
                  onChange={(e) => setData({ ...data, text: e.target.value })}
                ></input>
              </div>
              <div className="container">
                <div className="vertical-center">
                  <input className="button-17" type="submit" />
                </div>
              </div>
            </form>
          </div>
          <div className="features">
            <br></br>
            <ul></ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClub;

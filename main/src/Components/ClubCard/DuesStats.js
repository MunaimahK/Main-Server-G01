import React from "react";
import axios from "axios";
import Cards from "./Cards";
import { useState, useEffect } from "react";

const DuesStats = (props) => {
  const [dues, setDues] = useState([{ paidDues: true }]);

  const redirect_b =
    props.redirect_b; /*
  const getControllers = async (req, res) => {
    try {
      const data = await axios.get("/controllers").then((res) => {
        console.log(res.data.msg);
        setClubList(res.data.msg);
        console.log("CLUBS: ", clubs);

      });
    } catch (err) {
      console.log(err);
    }
  };*/

  useEffect(() => {
    axios
      .get("/check-due-payment", {
        redirect_b,
      })
      .then((response) => {
        console.log("RES:", response);
        setDues(response.data);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }, []);

  const clubComponent = dues.map((club) => (
    <Cards
      title={club.name}
      text={club.text}
      img={club.logo}
      redirect={club.fronted}
      redirect_b={club.backend}
    />
  ));

  return <div>{clubComponent}</div>;
};

export default DuesStats;

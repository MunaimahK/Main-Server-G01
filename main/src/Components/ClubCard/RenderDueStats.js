import React from "react";
import axios from "axios";
import Cards from "./Cards";
import { useState, useEffect } from "react";
import ClubStats from "./ClubStats";

const RenderDueStats = (props) => {
  let paid = "no";
  const [payment, setPayment] = useState([{ paidDues: "no" }]);
  const redirect_b = props.redirect_b;
  useEffect(() => {
    axios
      .post("/check-due-payment", {
        redirect_b,
      })
      .then((response) => {
        console.log("RES:", response);
        setPayment(response.data.paidDues);
        paid = response.data.paidDues.toString();
        console.log(typeof response.data.paidDues);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }, []);

  /*const dueStatComponent = payment.map((pay) => (
    <ClubStats clubName={props.title} paidDues={pay.paidDues} />
  ));*/

  //return <div>{dueStatComponent}</div>;
  return <ClubStats clubName={props.title} paidDues={paid} />;
};

export default RenderDueStats;

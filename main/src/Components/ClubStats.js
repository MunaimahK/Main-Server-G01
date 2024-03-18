import React from "react";
import "./ClubStats.css";

const ClubStats = (props) => {
  return (
    <div className="wrapper-stats">
      <div className="box-title">{props.clubName}</div>
      <div className="box-dues"> Paid Dues yet? {props.paidDues}</div>
    </div>
  );
};

export default ClubStats;

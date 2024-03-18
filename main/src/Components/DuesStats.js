import React from "react";
import "./DuesStats.css";
import ClubStats from "./ClubStats.js";

const DuesStats = () => {
  const stats = [
    {
      clubName: "KnightHacks",
      paidDues: "true",
    },
    {
      clubName: "Hack@UCF",
      paidDues: "false",
    },
  ];
  const statsComponent = stats.map((stat) => (
    <ClubStats clubName={stat.clubName} paidDues={stat.paidDues} />
  ));
  return (
    <div className="wrapper-dues-stats">
      <h1 className="title">User Club Stats</h1>
      <div>{statsComponent}</div>
    </div>
  );
};

export default DuesStats;

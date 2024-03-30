import React from "react";
import "./Header.css";
import { BsPersonCircle, BsJustify } from "react-icons/bs";
const Header = () => {
  return (
    <header className="header-admin">
      <div className="menu-icon">
        <BsJustify className="Icon" />
      </div>
      <div className="header-left"></div>
      <div className="header-right">
        <BsPersonCircle className="Icon" />
      </div>
    </header>
  );
};

export default Header;

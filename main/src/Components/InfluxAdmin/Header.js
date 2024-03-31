import React from "react";
import "./Header.css";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsPersonCircle, BsJustify } from "react-icons/bs";
const Header = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <header className="header-admin">
      <div className="menu-icon">
        <RxHamburgerMenu onClick={() => setShowNav(!showNav)} />
      </div>
      <div className="header-left"></div>
      <div className="header-right">
        <BsPersonCircle className="Icon" />
      </div>
    </header>
  );
};

export default Header;

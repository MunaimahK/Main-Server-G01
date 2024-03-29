import React from 'react'
import "./NavbarR.css"
import  logo from "./influx-logo.png"
import axios from 'axios'
// <div className={props.show ? 'sidenav active' : 'sidenav'}>
// m<div className='sidenav active'>
const NavbarR = ({show}) => {
  const logOut = async () => {
    try {
      const data = await axios.get("/logout/influx").then((res) => {
        console.log(res);
        window.location.replace("/influx");
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    
        <div className={show ? 'sidenav active' : 'sidenav'}>
        <img src={logo} href="/dashboard" alt="Logo" className='logo'/>
        <ul className='nav-ul'>
            <li className='nav-li'><a className='nav-a' href="/dashboard">Home</a></li>
            <li className='nav-li'><a className='nav-a' href="/admin/login">Admin</a></li>
            <li className='nav-li'><a className='nav-a'  onClick={logOut}>Log Out</a></li>
        </ul>
    </div>
  )
}

export default NavbarR
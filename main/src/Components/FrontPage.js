import React from 'react'
import "./FrontPage.css"
import 'boxicons'
// import {icon} from '../Components/assets/7341.jpg'


const FrontPage = () => {
  return (
    <div>
        <header class='header'>
            <a href="#" class="logo">Influx</a>
            <nav className='navbar'>
            <a href="#" class='active'> Home</a>
            <a href="#" > About</a>
            <a href="#" > FAQ</a>
            <a href="#" > Contact</a>
            </nav>
        </header>
        <section class='home'>
            <div class='home-content'>
                <h3> Hey, Welcome to</h3>
                <h1> Influx </h1>
                <h3> Welcome to <span>UCF RSO and Clubs</span></h3>
                <p>The one stop UCF community networking platform</p>
                <div class='socials'>
                    <a href="#" > <box-icon name='instagram-alt' type='logo' ></box-icon></a>
                    <a href="#" > <box-icon name='twitter' type='logo' ></box-icon></a>
                    <a href="#" > <box-icon name='linkedin-square' type='logo' ></box-icon></a>
                </div>
            </div>
            <div className='home-img'>
                <img src="wave.png" alt=""></img>
            </div>
        </section>
    </div>
  )
}

export default FrontPage
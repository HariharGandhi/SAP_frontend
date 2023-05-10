import React from "react";
import authService from "../../../services/auth.service";
import "./Navbarforapp.css";
// import { Switch, Route, Link } from "react-router-dom";

export default function Navbarforapp() {
  // const User = localStorage.getItem('role').slice(5)
  const Onlogout = () => {
    authService.logout()
  }
  return (
    <nav className="nav" data-aos="fade-down" data-aos-delay="50" data-aos-offset="00">
    <div className="nav-left">
      <a href="/" className="site-title">
        <h2>Sanjivani<span className="color-change">SAP</span></h2>
      </a>
    </div>
    <div className="nav-right">
      <ul>
       
      <li>
            <a style={{borderRadius: '8px', border: '1px solid white',padding:'8px'}}  href="/" onClick={Onlogout}>
              Logout
            </a>
            
          </li>
      </ul>
    </div>
  </nav>
  );
}

import React from "react";
import authService from "../../../services/auth.service";
// import { Switch, Route, Link } from "react-router-dom";

export default function Navbarforapp() {
  const User = localStorage.getItem('role').slice(5)
  const Onlogout = () => {
    authService.logout()
  }
  return (
    <nav
      className="nav"
      data-aos="fade-down"
      data-aos-delay="100"
      data-aos-offset="00"
    >
      <ul>
        <div className="left-nav">
          <li>
            <a href="/" className="site-title">
              <h1> Sanjivani </h1>
            </a>
          </li>
        </div>
        <div className="center-nav">
          <h4 style={{color:"white"}}>Welcome {User}</h4>
        </div>
        <div className="right-nav">
          <li>
            <a href="/" onClick={Onlogout}>
              Logout
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
}

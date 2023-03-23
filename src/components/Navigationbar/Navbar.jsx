import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import BellIcon from "react-bell-icon";
import Modal from "../pages/dashboard/Modal";
import "./Navbar.css"
const Navbar = () => {

  const [not,setnot] = useState(false);
  function Onlogout() {
    AuthService.logout()
  };
  const handleCancel = () => {
    // hide confirmation modal
    setnot(false)
  };
  return (
    <>
      <nav className="nav" data-aos="fade-down" data-aos-delay="300" data-aos-offset="00">
        <ul>
          <div className="left-nav" style={{ background:'black',float:'left' }}>
            <li>
              <h2 className="heading">
                Sanjivani
                <span className="color-teal">SAP</span>{" "}
              </h2></li>
          </div>
          {localStorage.getItem('role') === "ROLE_STUDENT" &&
            <h2 className="w-heading">Welcome Student</h2>
          }
          {localStorage.getItem('role') === "ROLE_ADMIN" &&
            <h2 className="w-heading">Welcome ADMIN</h2>
          }
          <div className="right-nav" style={{ marginLeft: "1000px" }}>
            {localStorage.getItem('role') === "ROLE_STUDENT" &&
              <li>
                <button className="nav-button" onClick={() => setnot(true)}><BellIcon width='25' height='20' color='white' active={true} /></button>
              </li>}
            <li>
              <button className="nav-button" onClick={() => Onlogout()}>{" "}LogOut{" "}</button>
            </li>
          </div>
        </ul>
      </nav>
      {not && <>
        <Modal>
          <div>
            <h2>Notification</h2>
            <button onClick={handleCancel}>Close</button>
          </div>
        </Modal>
      </>}
    </>
  );
}

export default Navbar;
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarAdminData } from "./SidebarAdminData";
import { SidebarStudentData } from "./SidebarStudentData";
import { SidebarSuperAdminData } from "./SidebarSuperAdminData";
import SubMenu from "./SubMenu";
import Modal from "../pages/dashboard/Modal";
import { IconContext } from "react-icons/lib";
import AuthService from "../../services/auth.service";
import ReactBellIcon from "react-bell-icon";
import "./Navbar.css"
import Notification from "../pages/dashboard/Studentdashboard/notifications";

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 768px) {
    background: #15171c;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media screen and (max-width: 768px) {
    margin-left: 1rem;
  }
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;

  @media screen and (max-width: 768px) {
    width: 80%;
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
    transition: 350ms;
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

  


const NewSidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
    // if(sidebar ? sessionStorage.setItem('sidebar',JSON.stringify(false)):(
    //   sessionStorage.clear(),
    //   sessionStorage.setItem('sidebar',JSON.stringify(true))
    //   ));
    sessionStorage.setItem('sidebar',JSON.stringify(!sidebar))
    }
  const [not, setnot] = useState(false);
  function Onlogout() {
    AuthService.logout();
  }
  const handleCancel = () => {
    // hide confirmation modal
    setnot(false);
  };
  //const Title = localStorage.getItem("role").slice(5);
  
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }} className="NAV">
        <Nav >
          <NavIcon to="#" style={{marginRight:'10px'}}>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <h2 className="heading">
            Sanjivani
            <span className="color-teal">SAP</span>{" "}
          </h2>
          {localStorage.getItem("role") === "ROLE_STUDENT" && (
            <h2 className="main-head"
            >
              Welcome Student
            </h2>
          )}
          {localStorage.getItem("role") === "ROLE_ADMIN" && (
            <h2 className="main-head">
              Welcome ADMIN
            </h2>
          )}
          {localStorage.getItem("role") === "ROLE_SUPERADMIN" && (
            <h2 className="main-head">
              Welcome SUPER ADMIN
            </h2>
          )}

          <div className="nav-btns">
            <ul>
            
              <li>
                <button className="nav-button" onClick={() => setnot(true)}>
                  <ReactBellIcon
                    width="25"
                    height="20"
                    color="white"
                    active={true}
                  />
                </button>
              </li>
            
            <li>
              <button className="nav-button" onClick={() => Onlogout()}>
                {" "}
                LogOut{" "}
              </button>
            </li></ul>
          </div>
        </Nav>
        <SidebarNav sidebar={sidebar} className="SIDE">
          <SidebarWrap>
            <NavIcon to="#" className="NAVICON">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {localStorage.getItem("role") === "ROLE_SUPERADMIN" && (
              <>
                {SidebarSuperAdminData.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
              </>
            )}
            {localStorage.getItem("role") === "ROLE_ADMIN" && (
              <>
                {SidebarAdminData.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
              </>
            )}
            {localStorage.getItem("role") === "ROLE_STUDENT" && (
              <>
                {SidebarStudentData.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
              </>
            )}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
      {not && (
        <>
          <Modal>
            <div>
              <Notification />
              <button onClick={handleCancel}>Close</button>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default NewSidebar;

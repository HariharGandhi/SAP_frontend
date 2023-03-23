import React, { useEffect, useState } from "react";
import "./NewNav.css";
import cross from "./cross.png";
import menu from "./menu.png";
import { Link, Route } from "react-router-dom";
import Create from "../pages/dashboard/table/Create";
import PostPlace from "../pages/dashboard/table/PostPlace";
import Alluser from "../pages/dashboard/table/Alluser";
import Modal from "../pages/dashboard/Modal";
import BellIcon from "react-bell-icon";
import VerifyForm from "../pages/dashboard/adminpages/ApplicationForms/Verifyform";
import AuthService from "../../services/auth.service";
import Viewform from "../pages/dashboard/adminpages/ApplicationForms/Viewform/Viewform";

const NewNav = (props) => {
  const a = localStorage.getItem('role');
  //const b = "true";
  const Onlogout = () => {
    AuthService.logout()
  };
  const [SelectedOption,setSelectedOption] = useState("")
  const [notice,setnotice] = useState(false)
  //const [Title,setTitle] = useState("")
  const handleCancel = () => {
    // hide confirmation modal
    setnotice(false)
  }
 
  const [op, setOp] = useState("left-nav");
  const [right, setRight] = useState("right-nav98");
  const [picimg, setPicimg] = useState(cross);

  const dothis = () => {
    if (op === "left-nav") {
      setOp("new-left-nav");
      setPicimg(menu);
    } else {
      setOp("left-nav");
      setPicimg(cross);
    }
    if (right === "right-nav98") {
      setRight("new-right-nav98");
    } else {
      setRight("right-nav98");
    }
  };
  useEffect(() => {
    // callAboutPage();
  }, []);

  return (
    <div>
      {/* {nag==="Sachin"? */}
      <div>
        <div className="new-nav">
        <img
              className="cross-img"
              onClick={dothis}
              src={picimg}
              width="10px"
              height="10px"
              style={{marginLeft:'25px'}}
              alt=""
            />
          <h2 style={{marginLeft:'50px'}}>
            Sanjivani
            <span className="color-teal">SAP</span>{" "}
          </h2>
          <h2>Welcome sachin</h2>
          <div>
          <button onClick={() => Onlogout()}>LogOut</button>
          <button onClick={()=> setnotice(true)}><BellIcon width='20'  height='20' color='white' active={true} /></button>
        </div>
        </div>
        <div className="compo-down">
          <div className={op}>
           
            {a === "ROLE_ADMIN" ? (
              <p>Admin</p>
            ) : (
              <span>{a === "ROLE_SUPER" ? <p>Super</p> : <p>User</p>}</span>
            )}
            {/*<div className="left-content">Appid</div>*/}
            <div className="left-content">Payment</div>
            <div className="left-content">Course</div>
            <div className="left-content">
              <Link to={"/resume"}>Resume Builder</Link>
            </div>


            {a === "ROLE_ADMIN" ? (
              <div className="left-drop">
                <select
                  className="left-content new-nav-drop"
                  name="cars"
                  id="cars"
                  value={SelectedOption}
                  onChange={ (e) => setSelectedOption(e.target.value)}
                 
                >
                  <option value="App_form">App. Form</option>
                  <option value="ver_form" >Verify Form</option>
                  <option value="ser_form">Search form</option>
                  <option value="del_form">Delete Form</option>
                </select>
                <select
                  className="left-content new-nav-drop"
                  name="cars"
                  id="cars"
                >
                  <option value="notify">Notification</option>
                  <option value="add_notice">Add Notification</option>
                  <option value="del_notice">Delete Notification</option>
                  <option value="upd_notice">Update Notification</option>
                </select>
                <select
                  className="left-content new-nav-drop"
                  name="cars"
                  id="cars"
                >
                  <option value="placed">Placement</option>
                  <option value="add_placed">Add Placement</option>
                </select>
              </div>
            ) : (
              <div>
                {a === "ROLE_SUPER" ? (
                  <>
                    <div >
                      <div className="left-content " style={{display:"flex", justifyContent:"center"}}>
                        <Link className="t-color" to="/newnav/create">
                          Create Admin
                        </Link>
                      </div>
                      <div className="left-content " style={{display:"flex", justifyContent:"center"}}>
                        <Link className="t-color" to="/newnav">
                          Verify User
                        </Link>
                      </div>
                      <div className="left-content " style={{display:"flex", justifyContent:"center"}}>
                        <Link className="t-color" to="/newnav/place">
                          Placement
                        </Link>
                      </div>
                      <div className="left-content " style={{display:"flex", justifyContent:"center"}}>
                        <Link className="t-color" to="/newnav/all">
                          See All Admin
                        </Link>
                      </div>
                    </div>
                    <div className="left-drop">
                      <select
                        className="left-content new-nav-drop"
                        name="cars"
                        id="cars"
                      >
                        <option value="App_form">App. Form</option>
                        <option value="ver_form">Verify Form</option>
                        <option value="ser_form">Search form</option>
                        <option value="del_form">Delete Form</option>
                      </select>
                      <select
                        className="left-content new-nav-drop"
                        name="cars"
                        id="cars"
                      >
                        <option value="notify">Notification</option>
                        <option value="add_notice">Add Notification</option>
                        <option value="del_notice">Delete Notification</option>
                        <option value="upd_notice">Update Notification</option>
                      </select>
                      <select
                        className="left-content new-nav-drop"
                        name="cars"
                        id="cars"
                      >
                        <option value="placed">Placement</option>
                        <option value="add_placed">Add Placement</option>
                      </select>
                      <select
                        className="left-content new-nav-drop"
                        name="cars"
                        id="cars"
                      >
                        <option value="addmin">Admin</option>
                        <option value="cre_addmin">Create Admin</option>
                        <option value="del_addmin">Delete Admin</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <p></p>
                )}
              </div>
            )}
          </div>
          {SelectedOption === "ver_form"? (<>
              <Route exact path="/newnav/verifyform" component={VerifyForm} />
              </>):null}
          <div className={right}>
            {a === "ROLE_STUDENT" ? (
              <>dashboardsdsdd
              </>
            ) : (
              // <Table path="/newnav" />
              
              <Route exact path="/newnav" component={Viewform} />
            )}
            <Route exact path="/newnav/create" component={Create} />
            <Route exact path="/newnav/place" component={PostPlace} />
            <Route exact path="/newnav/all" component={Alluser} />
            
          </div>
        </div>
      </div>
      {notice && <>
      <Modal>
        <div>
          <h2>Notification</h2>
          <button onClick={handleCancel}>Close</button>
        </div>
      </Modal>
      </>}
    </div>
  );
};

export default NewNav;

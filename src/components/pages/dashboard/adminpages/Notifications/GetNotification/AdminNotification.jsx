import React, { useEffect } from "react";
import { useState } from "react";
import NotificationPlacementapi from "../../../../../../services/NotificationPlacementapi";
import NewSidebar from "../../../../../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./AdminNotification.css"
import { ACTIVE } from "../../../../../../services/Globalvalues";

const Adminnotification = () => {
  const [Data, setData] = useState([]);
  const [searchmod, setsearchmod] = useState("");


  const clearsearch = () => {
    setsearchmod("");
  };
  const Sendit = (ele) => {
    localStorage.setItem('NoticeId',ele.id)
    window.location.href ="/sendnotification"
  }
  
  useEffect(() => {
    (async () => {
      try {
        NotificationPlacementapi.getall().then((res) => {
        
          const filtered = res.data.filter(item => item.status === ACTIVE)
          setData(filtered);
        
        });
      } catch (error) {
      //  console.log("Error");
      }
    })();
    return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
  }, []);

  return (
    <>
      <NewSidebar />
      <div
        className={
          sessionStorage.getItem("sidebar") === "true"
            ? "table-nav vform"
            : "table-nav"
        }
      >
        <div className="container" style={{ margin: "20px" }}>
          <label>
          Search by  Module :
          <select
            className="table-drop"
            name="cars"
            id="cars"
            value={searchmod}
            onChange={(e) => setsearchmod(e.target.value)}
            style={{marginLeft:'10px'}}
          >
            <option value="">Select Module</option>
            <option value="abap">ABAP</option>
            <option value="mm">MM</option>
            <option value="pp">PP</option>
            <option value="hr">HR/HCM</option>
            <option value="fico">FICO</option>
          </select>
          
          <button onClick={() => clearsearch()} style={{backgroundColor:"black",
            color:"white",borderRadius:"5px", marginLeft: "50px", width:'50px', height:'30px' }}>
            Clear
          </button>
          <button className="place-button-up"><Link to="/addnotice">Add Notification </Link></button></label>
        </div>
        <table style={{ width: "100%" }} className="THead">
          <thead >
            <tr className="main-table top-col-table">
              {/*<th>Student_id</th>*/}
              <th>Notification ID</th>
              <th>Name </th>
              <th>Title</th>
              <th>Body</th>
              <th>Creation Date</th>
              <th>Status</th>
              <th>Action</th>
              {/*<th>User_id</th>*/}
            </tr>
          </thead>
          <tbody>
            {Data.filter((item) => {
              return searchmod.toLowerCase() === ""
                ? item
                : item.notificationmodule.toLowerCase().includes(searchmod);
            }).map((ele) => {
              return (
                <tr key={ele.id} className="main-table">
                  <td>{ele.id}</td>
                  <td>{ele.name}</td>
                  <td>{ele.title}</td>
                  <td>{ele.body}</td>
                  <td>{ele.createdDateTime}</td>
                  <td>{ele.status}</td>
                  

                  <td style={{ width: "100px", padding: "2px" }}>
                    <button
                      /*onClick={() => Modalview(ele)}*/ title="Delete Notice"
                      style={{backgroundColor:"black",color:"white",borderRadius:"5px", marginRight: "5px", cursor: "pointer" }}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button
                      onClick={() => Sendit(ele)} title="Send Notice"
                      style={{backgroundColor:"black",color:"white",borderRadius:"5px", marginRight: "5px", cursor: "pointer" }}
                    >
                      Send
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Adminnotification;

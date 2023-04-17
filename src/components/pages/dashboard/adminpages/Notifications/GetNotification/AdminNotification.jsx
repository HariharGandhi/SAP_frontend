import React, { useEffect } from "react";
import { useState } from "react";
import NotificationPlacementapi from "../../../../../../services/NotificationPlacementapi";
import NewSidebar from "../../../../../Navbar/Navbar";
import { Link } from "react-router-dom";

const Adminnotification = () => {
  const [Data, setData] = useState([]);
  const [searchmod, setsearchmod] = useState("");


  const clearsearch = () => {
    setsearchmod("");
  };
  
  useEffect(() => {
    (async () => {
      try {
        NotificationPlacementapi.getall().then((res) => {
          console.log(res.data);
          const filtered = res.data.filter(item => item.status === "active")
          setData(filtered);
          console.log(filtered)
        });
      } catch (error) {
        console.log("Error");
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
          
          <button onClick={() => clearsearch()} style={{ marginLeft: "50px", width:'50px', height:'30px' }}>
            Clear
          </button>
          <button className="place-button" style={{marginRight:'10px',marginLeft:'850px'}}><Link to="/addnotice">Add Notification </Link></button></label>
        </div>
        <table style={{ width: "100%" }}>
          <thead>
            <tr className="main-table top-col-table">
              {/*<th>Student_id</th>*/}
              <th>Notification ID</th>
              <th>Name </th>
              <th>Title</th>
              <th>Module</th>
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
                  <td>{ele.notificationmodule}</td>
                  <td>{ele.body}</td>
                  <td>{ele.createdDateTime}</td>
                  <td>{ele.status}</td>
                  

                  <td style={{ width: "100px", padding: "2px" }}>
                    <button
                      /*onClick={() => Modalview(ele)}*/ title="Delete Notice"
                      style={{ marginRight: "5px", cursor: "pointer" }}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
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
import React, { useEffect } from "react";
import { useState } from "react";
import NotificationPlacement from "../../../../../../services/NotificationPlacementapi";
import NewSidebar from "../../../../../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./AdminNotification.css"
import { ACTIVE } from "../../../../../../services/Globalvalues";

const Adminnotification = () => {
  const [Data, setData] = useState([]);
  const [searchmod, setsearchmod] = useState("");
  const [modules,setmodules] = useState([]);
  const [nodata, setnodata] = useState(false);
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
        NotificationPlacement.getall().then((res) => {
        
          const filtered = res.data.filter(item => item.status === ACTIVE)
          setData(filtered);
          if (Data.length === 0) {
            setnodata(true);
          } else {
            setnodata(false);
          }
        });
      } catch (error) {
      //  console.log("Error");
      }
    })();
    (async () => {
      try {
        NotificationPlacement.getmodules(ACTIVE).then((res) => {
          setmodules(res.data);
        });
        
      } catch (error) {
      //  console.log(error);
      }
    })();
    return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
  }, [Data.length]);

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
            {modules.map(ele=>(
                        <option value={ele.moduleName} key={ele.id}>{ele.moduleName}</option>
                    ))}
          </select>
          
          <button onClick={() => clearsearch()} style={{backgroundColor:"black",
            color:"white",borderRadius:"5px", marginLeft: "50px", width:'50px', padding:"5px" }}>
            Clear
          </button>
          <button style={{color:"white",backgroundColor:"green",width:"150px",padding:"5px",margin:"10px",borderRadius:"5px"}}><Link to="/addnotice">Add Notification </Link></button></label>
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
          {nodata && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3 style={{ color: "brown" }}>No data present here</h3>
            </div>
          )}
          {!nodata && (
            <>
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
                      style={{color:"red",borderRadius:"5px",width:"20px", marginRight: "5px", cursor: "pointer" }}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button
                      onClick={() => Sendit(ele)} title="Send Notice"
                      style={{backgroundColor:"green",color:"white",width:"50px", borderRadius:"5px", marginRight: "5px", cursor: "pointer" }}
                    >
                      Send
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody></>)}
        </table>
      </div>
    </>
  );
};

export default Adminnotification;

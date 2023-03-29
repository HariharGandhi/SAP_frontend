import React, { useEffect } from "react";
import { useState } from "react";
import NotificationPlacementapi from "../../../../../../services/NotificationPlacementapi";
import NewSidebar from "../../../../../Navbar/Navbar";

const Adminnotification = () => {
  const [Data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchmod, setsearchmod] = useState("");
  

  const clearsearch = () => {
    setSearch("");
    setsearchmod("");
  };
  
  useEffect(() => {
    (async () => {
      try {
        NotificationPlacementapi.getall().then((res) => {
          console.log(res.data);
          setData(res.data);
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
            Module :
            <input
              className="table-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <select
            className="table-drop"
            name="cars"
            id="cars"
            onChange={(e) => setsearchmod(e.target.value)}
          >
            <option value="">Select Module</option>
            <option value="ABAP">ABAP</option>
            <option value="MM">MM</option>
            <option value="PP">PP</option>
            <option value="HR">HR/HCM</option>
            <option value="FICO">FICO</option>
          </select>
          <button onClick={() => clearsearch()} style={{ marginLeft: "20px" }}>
            Clear
          </button>
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
              <th>Creation Date & Time</th>
              <th>Status</th>
              <th>File </th>
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
                  <td>{ele.file}</td>

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

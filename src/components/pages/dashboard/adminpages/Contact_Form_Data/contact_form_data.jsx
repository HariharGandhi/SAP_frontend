import React, { useState, useEffect } from "react";
import NewSidebar from "../../../../Navbar/Navbar";
import "./ContactUsData.css"
import {BASE_URL} from "../../../../../services/Globalvalues";

function ContactUsTable() {
  const [contactUsData, setContactUsData] = useState([]);
  const [nodata, setnodata] = useState(false);
  useEffect(() => {
    fetch(BASE_URL + "api/auth/getcontactus")
      .then((response) => response.json())
      .then((data) => {
        setContactUsData(data);
        if (contactUsData.length === 0) {
          setnodata(true);
        } else {
          setnodata(false);
        }
      })
      .catch((error) => console.error(error));

      return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
  }, [contactUsData.length]);

  return (
    <>
      <NewSidebar />
      <div
        className={
          sessionStorage.getItem("sidebar") === "true"
            ? "table-nav vform"
            : "table-nav"
        }
        id="contactus"
      >
        <table style={{width:'100%',marginTop:'25px'}}>
          <thead>
            <tr className="main-table top-col-table">
              {/*<th>Student_id</th>*/}
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Module</th>
              <th>Status</th>
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
            {contactUsData.map((ele) => {
                return (
                  <tr key={ele.id} className="main-table">
                    <td >
                      {ele.name}
                    </td>
                    <td >
                      {ele.email}
                    </td>
                    <td >
                      {ele.mobileNumber}
                    </td>
                    <td >
                      {ele.module}
                    </td>
                    <td >
                      {ele.status}
                    </td>
                  </tr>
                );
              })}
          </tbody></>)}
        </table>{" "}
      </div>
    </>
  );
}

export default ContactUsTable;
